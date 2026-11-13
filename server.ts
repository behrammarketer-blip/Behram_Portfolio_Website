import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';
import dotenv from 'dotenv';
import type {Request, Response} from 'express';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const DATA_DIR = path.resolve(process.cwd(), '.data');
const STORE_PATH = path.join(DATA_DIR, 'portfolio-store.json');

interface StoreShape {
  portfolio: Record<string, unknown> | null;
  inquiries: Array<{
    id: string;
    fullName: string;
    email: string;
    companyName: string;
    serviceRequired: string;
    projectBudget: string;
    projectDetails: string;
    submittedAt: string;
  }>;
}

let memoryStore: StoreShape = {
  portfolio: null,
  inquiries: [],
};

async function readStore(): Promise<StoreShape> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<StoreShape>;
    memoryStore = {
      portfolio: parsed.portfolio ?? null,
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [],
    };
    return memoryStore;
  } catch {
    return memoryStore;
  }
}

async function writeStore(next: StoreShape): Promise<void> {
  memoryStore = next;
  try {
    await fs.mkdir(DATA_DIR, {recursive: true});
    await fs.writeFile(STORE_PATH, JSON.stringify(next, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Unable to persist store to disk, using in-memory fallback:', err);
  }
}

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function resolveBaseUrl(req: Request): string {
  const configured = process.env.APP_URL?.trim();
  if (configured && configured !== 'MY_APP_URL') {
    return configured.replace(/\/+$/, '');
  }
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.headers['x-forwarded-host'] || req.get('host') || 'localhost:3000';
  return `${proto}://${host}`;
}

async function startServer() {
  const app = express();
  app.use(express.json({limit: '1mb'}));

  // SEO: Dynamic XML Sitemap
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const baseUrl = resolveBaseUrl(req);
    const lastMod = new Date().toISOString().split('T')[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    res.type('application/xml').send(xml);
  });

  // SEO: Robots.txt
  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = resolveBaseUrl(req);
    const content = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
    res.type('text/plain').send(content);
  });

  // Health endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({status: 'ok'});
  });

  // Get customized portfolio configuration (null means client uses built-in default)
  app.get('/api/portfolio', async (_req: Request, res: Response) => {
    const store = await readStore();
    res.json({portfolio: store.portfolio});
  });

  // Save customized portfolio configuration from Quick-Edit Studio
  app.put('/api/portfolio', async (req: Request, res: Response) => {
    const body = req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      res.status(400).json({error: 'Invalid portfolio payload.'});
      return;
    }

    const store = await readStore();
    const updated: StoreShape = {
      ...store,
      portfolio: body as Record<string, unknown>,
    };
    await writeStore(updated);
    res.json({portfolio: updated.portfolio});
  });

  // Reset customized portfolio configuration back to defaults
  app.post('/api/portfolio/reset', async (_req: Request, res: Response) => {
    const store = await readStore();
    const updated: StoreShape = {
      ...store,
      portfolio: null,
    };
    await writeStore(updated);
    res.json({portfolio: null});
  });

  // List stored client inquiries
  app.get('/api/inquiries', async (_req: Request, res: Response) => {
    const store = await readStore();
    res.json({inquiries: store.inquiries});
  });

  // Create & persist a validated client inquiry
  app.post('/api/inquiries', async (req: Request, res: Response) => {
    const fullName = cleanText(req.body?.fullName, 120);
    const email = cleanText(req.body?.email, 160);
    const companyName = cleanText(req.body?.companyName, 140);
    const serviceRequired = cleanText(req.body?.serviceRequired, 120);
    const projectBudget = cleanText(req.body?.projectBudget, 80);
    const projectDetails = cleanText(req.body?.projectDetails, 3000);

    const fieldErrors: Record<string, string> = {};
    if (fullName.length < 2) {
      fieldErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    if (!isValidEmail(email)) {
      fieldErrors.email = 'Please provide a valid professional email address.';
    }
    if (!serviceRequired) {
      fieldErrors.serviceRequired = 'Please select the marketing service you need.';
    }
    if (projectDetails.length < 15) {
      fieldErrors.projectDetails = 'Please share at least 15 characters about your project goals.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      res.status(400).json({
        error: 'Please review the highlighted fields before submitting.',
        fieldErrors,
      });
      return;
    }

    const record = {
      id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      fullName,
      email,
      companyName: companyName || 'Not specified',
      serviceRequired,
      projectBudget: projectBudget || 'Not specified',
      projectDetails,
      submittedAt: new Date().toISOString(),
    };

    const store = await readStore();
    const updated: StoreShape = {
      ...store,
      inquiries: [record, ...store.inquiries].slice(0, 100),
    };
    await writeStore(updated);

    res.status(201).json({
      message: 'Your inquiry has been recorded. Thank you for reaching out.',
      inquiry: record,
    });
  });

  // Delete an inquiry from Quick-Edit Studio
  app.delete('/api/inquiries/:id', async (req: Request, res: Response) => {
    const id = cleanText(req.params.id, 80);
    const store = await readStore();
    const filtered = store.inquiries.filter((item) => item.id !== id);
    await writeStore({...store, inquiries: filtered});
    res.json({inquiries: filtered});
  });

  if (!IS_PRODUCTION) {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Behram Shah portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
