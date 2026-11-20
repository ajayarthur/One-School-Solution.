const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const nodemailer = require('nodemailer');

const ROOT = __dirname;

// Simple zero-dependency .env loader if present
const envFile = path.join(ROOT, '.env');
if (fs.existsSync(envFile)) {
  try {
    const lines = fs.readFileSync(envFile, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const k = trimmed.slice(0, idx).trim();
          const v = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
          if (!process.env[k]) process.env[k] = v;
        }
      }
    }
  } catch (e) {
    console.warn('Could not parse .env file:', e.message);
  }
}

const PORT = process.env.PORT || 3000;
const RECEIVING_EMAIL = process.env.RECEIVING_EMAIL || 'onesolution9880@gmail.com';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.mp3': 'audio/mpeg'
};

// ---------------------------------------------------------------------------
// NODEMAILER TRANSPORTER MANAGEMENT
// ---------------------------------------------------------------------------
let cachedTransporter = null;

async function getEmailTransporter() {
  if (cachedTransporter) return cachedTransporter;

  // 1. Check for custom SMTP configuration
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log(`[Email Service] Nodemailer configured with Custom SMTP (${process.env.SMTP_HOST})`);
    return cachedTransporter;
  }

  // 2. Check for Gmail App Password configuration
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASS) {
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
      }
    });
    console.log(`[Email Service] Nodemailer configured with Gmail SMTP (${process.env.GMAIL_USER})`);
    return cachedTransporter;
  }

  // 3. Fallback to automated Ethereal test gateway (zero config needed)
  try {
    const testAccount = await nodemailer.createTestAccount();
    cachedTransporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log(`[Email Service] Nodemailer active with Ethereal SMTP test gateway (${testAccount.user})`);
    return cachedTransporter;
  } catch (err) {
    console.warn(`[Email Service] Ethereal test account setup skipped: ${err.message}`);
    return null;
  }
}

// Initialize transporter on boot
getEmailTransporter().catch(err => console.warn('Transporter init note:', err.message));

// ---------------------------------------------------------------------------
// EMAIL DISPATCH FUNCTION
// ---------------------------------------------------------------------------
async function dispatchBookingNotification(booking) {
  const subject = `🎓 New School Demo Request: ${booking.schoolName || 'Institution'} (${booking.firstName || ''} ${booking.lastName || ''})`.trim();

  const textContent = `
======================================================
ONE SCHOOL SOLUTION - NEW DEMO BOOKING REQUEST
======================================================
School / Institution:  ${booking.schoolName || 'Not specified'}
Contact Person:        ${booking.firstName || ''} ${booking.lastName || ''}
Institutional Role:    ${booking.role || 'Not specified'}
Email Address:         ${booking.email || 'Not specified'}
Phone Number:          ${booking.phone || 'Not specified'}
Product Selected:      ${booking.product || 'Complete School Platform'}
Timestamp:             ${booking.receivedAt || new Date().toISOString()}
Delivered To:          ${RECEIVING_EMAIL}
======================================================
`;

  const htmlContent = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
    <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 28px 32px; color: #ffffff;">
      <span style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px;">★ Direct Demo Request</span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">ONE SCHOOL SOLUTION</h1>
      <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.92;">New School Platform Demo Booking Received</p>
    </div>
    <div style="padding: 28px 32px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b; width: 38%;"><strong>Institution Name</strong></td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 700;">${booking.schoolName || '-'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;"><strong>Contact Person</strong></td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${booking.firstName || ''} ${booking.lastName || ''}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;"><strong>Role / Designation</strong></td>
          <td style="padding: 10px 0; color: #0284c7; font-weight: 700;">${booking.role || '-'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;"><strong>Email Address</strong></td>
          <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${booking.email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${booking.email || '-'}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;"><strong>Phone Number</strong></td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${booking.phone || '-'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b;"><strong>Product Selected</strong></td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${booking.product || 'Complete School Platform'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #64748b;"><strong>Received At</strong></td>
          <td style="padding: 10px 0; color: #64748b; font-size: 13px;">${booking.receivedAt}</td>
        </tr>
      </table>
    </div>
    <div style="background: #f8fafc; padding: 18px 32px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
      Direct notification routed to <strong style="color: #0f172a;">${RECEIVING_EMAIL}</strong> &bull; ONE SCHOOL SOLUTION Backend
    </div>
  </div>
`;

  let nodemailerResult = null;
  let formsubmitResult = null;
  let errors = [];

  // 1. Dispatch via Nodemailer (SMTP)
  try {
    const transporter = await getEmailTransporter();
    if (transporter) {
      const mailOptions = {
        from: '"ONE SCHOOL SOLUTION" <no-reply@oneschoolsolution.com>',
        to: RECEIVING_EMAIL,
        replyTo: booking.email || RECEIVING_EMAIL,
        subject,
        text: textContent,
        html: htmlContent
      };
      const info = await transporter.sendMail(mailOptions);
      const previewUrl = nodemailer.getTestMessageUrl(info);
      nodemailerResult = {
        sent: true,
        messageId: info.messageId,
        previewUrl: previewUrl || null
      };
      console.log(`✓ [Nodemailer] Email sent successfully! MessageId: ${info.messageId}`);
      if (previewUrl) console.log(`  [Preview URL]: ${previewUrl}`);
    }
  } catch (err) {
    console.error(`✗ [Nodemailer Error]: ${err.message}`);
    errors.push(`Nodemailer: ${err.message}`);
  }

  // 2. Dispatch via FormSubmit direct email forwarding to RECEIVING_EMAIL
  try {
    const formSubmitPayload = JSON.stringify({
      _subject: subject,
      "First Name": booking.firstName || '',
      "Last Name": booking.lastName || '',
      "School / Institution Name": booking.schoolName || '',
      "Role": booking.role || '',
      "Email Address": booking.email || '',
      "Phone Number": booking.phone || '',
      "Product Interested In": booking.product || '',
      "Booking Timestamp": booking.receivedAt,
      _replyto: booking.email || ''
    });

    await new Promise((resolve) => {
      const fsReq = https.request(`https://formsubmit.co/ajax/${RECEIVING_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Content-Length': Buffer.byteLength(formSubmitPayload)
        }
      }, (fsRes) => {
        let fsResBody = '';
        fsRes.on('data', chunk => fsResBody += chunk);
        fsRes.on('end', () => {
          formsubmitResult = { status: fsRes.statusCode };
          console.log(`✓ [FormSubmit Forward] Status: ${fsRes.statusCode} | Target: ${RECEIVING_EMAIL}`);
          resolve();
        });
      });
      fsReq.on('error', (e) => {
        console.warn(`[FormSubmit Note]: ${e.message}`);
        resolve();
      });
      fsReq.write(formSubmitPayload);
      fsReq.end();
    });
  } catch (err) {
    console.warn(`[FormSubmit Forward Warning]: ${err.message}`);
  }

  const isSuccess = !!(nodemailerResult && nodemailerResult.sent) || !!(formsubmitResult && formsubmitResult.status === 200);

  return {
    success: isSuccess,
    targetEmail: RECEIVING_EMAIL,
    nodemailer: nodemailerResult,
    formsubmit: formsubmitResult,
    errors: errors.length ? errors : undefined
  };
}

// ---------------------------------------------------------------------------
// HTTP SERVER (LIGHTWEIGHT NODE.JS BACKEND)
// ---------------------------------------------------------------------------
const server = http.createServer((req, res) => {
  let parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // 1. API ENDPOINT: POST /api/book-demo
  if (req.method === 'POST' && pathname === '/api/book-demo') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) req.socket.destroy();
    });

    req.on('end', async () => {
      try {
        let booking = {};
        const contentType = req.headers['content-type'] || '';

        // Handle JSON or Form-URLencoded payloads
        if (contentType.includes('application/json')) {
          booking = JSON.parse(body || '{}');
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
          const params = new URLSearchParams(body);
          for (const [k, v] of params.entries()) {
            booking[k] = v;
          }
        } else {
          // Attempt JSON parse fallback
          try {
            booking = JSON.parse(body || '{}');
          } catch(e) {
            const params = new URLSearchParams(body);
            for (const [k, v] of params.entries()) {
              booking[k] = v;
            }
          }
        }

        // Validate required fields
        if (!booking.schoolName || !booking.email || !booking.phone) {
          res.writeHead(400, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          return res.end(JSON.stringify({
            success: false,
            message: 'Missing required fields: schoolName, email, and phone are mandatory.'
          }));
        }

        booking.receivedAt = new Date().toISOString();
        booking.targetEmail = RECEIVING_EMAIL;

        // Persist booking to data/bookings.json
        const dataDir = path.join(ROOT, 'data');
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

        const bookingsFile = path.join(dataDir, 'bookings.json');
        let bookings = [];
        if (fs.existsSync(bookingsFile)) {
          try { bookings = JSON.parse(fs.readFileSync(bookingsFile, 'utf8')); } catch(e) {}
        }
        bookings.push(booking);
        fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2), 'utf8');

        // Append to human-readable log
        const logLine = `[${booking.receivedAt}] Name: ${booking.firstName || ''} ${booking.lastName || ''} | School: ${booking.schoolName} | Role: ${booking.role || ''} | Email: ${booking.email} | Phone: ${booking.phone} | Product: ${booking.product || ''}\n`;
        fs.appendFileSync(path.join(dataDir, 'bookings.log'), logLine, 'utf8');
        console.log('✓ New Booking Recorded:', logLine.trim());

        // Dispatch Email through Email Service (Nodemailer / SMTP)
        const emailResult = await dispatchBookingNotification(booking);

        if (emailResult.success) {
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          return res.end(JSON.stringify({
            success: true,
            message: `Booking received and confirmation email dispatched to ${RECEIVING_EMAIL}`,
            delivery: {
              targetEmail: RECEIVING_EMAIL,
              status: 'sent',
              service: emailResult.nodemailer?.sent ? 'Nodemailer (SMTP)' : 'Email Relay',
              messageId: emailResult.nodemailer?.messageId || null,
              previewUrl: emailResult.nodemailer?.previewUrl || null
            },
            booking
          }));
        } else {
          // Email dispatch failed, but booking was safely saved to database
          res.writeHead(502, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          return res.end(JSON.stringify({
            success: false,
            message: `Booking was recorded locally, but email service dispatch encountered an error.`,
            errors: emailResult.errors,
            booking
          }));
        }
      } catch (err) {
        console.error('API Error in /api/book-demo:', err);
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        return res.end(JSON.stringify({
          success: false,
          message: 'Internal server error while processing demo request',
          error: err.message
        }));
      }
    });
    return;
  }

  // Handle CORS preflight for API
  if (req.method === 'OPTIONS' && pathname === '/api/book-demo') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    });
    return res.end();
  }

  // 2. STATIC FILE SERVER
  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }

  let filePath = path.join(ROOT, pathname);

  // Security check to prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end('<h1>404 Not Found</h1><p><a href="/">Return to Home</a></p>');
      }
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end(`500 Server Error: ${err.message}`);
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end(`500 Read Error: ${readErr.message}`);
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`========================================================`);
  console.log(`ONE SCHOOL SOLUTION Lightweight Backend running on :${PORT}`);
  console.log(`Endpoint: POST /api/book-demo`);
  console.log(`Email Service: Nodemailer (SMTP) -> ${RECEIVING_EMAIL}`);
  console.log(`========================================================`);
});
