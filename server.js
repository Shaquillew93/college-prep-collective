// College Prep Collective — Backend API
// Stack: Node.js + Express
// Deploy on: Render.com (free tier works great)

const express = require(‘express’);
const cors = require(‘cors’);
const nodemailer = require(‘nodemailer’);
const path = require(‘path’);
require(‘dotenv’).config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || ‘*’
}));

// Serve the static frontend
app.use(express.static(path.join(__dirname, ‘public’)));

// ── ORDER / CHECKOUT SUBMISSION ──
app.post(’/api/order’, async (req, res) => {
    const { parentFirst, parentLast, email, phone, studentFirst, grade, hearAbout, goals, notes, package: pkg, price, paymentPlan } = req.body;

    if (!email || !pkg) {
        return res.status(400).json({ error: ‘Email and package are required.’ });
    }

    console.log(‘🛒 New order received:’, { parentFirst, parentLast, email, pkg, price, paymentPlan });

    try {
        const transporter = nodemailer.createTransport({
            service: ‘gmail’,
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        ```
// Notify Dr. Krystal
await transporter.sendMail({
  from: `"College Prep Collective" < ${ process.env.EMAIL_USER }> `,
  to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
  subject: `💳 New Order — ${ parentFirst } ${ parentLast } · ${ pkg } `,
  html: `
            < div style = "font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #faf8f3; border-top: 4px solid #c9a84c;" >
      <h2 style="color: #0d1b2e; margin-bottom: 5px;">New Order Received</h2>
      <p style="color: #8a9ab0; font-size: 14px; margin-bottom: 25px;">Payment submitted via thecollegeprepcollective.com</p>
      <table style="width:100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 12px; width: 140px; text-transform: uppercase; letter-spacing: 1px;">Package</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #0d1b2e; font-weight: bold;">${pkg}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Amount</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #c9a84c; font-weight: bold; font-size: 18px;">${price}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Payment Plan</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #0d1b2e;">${paymentPlan === 'split' ? '2-payment plan' : 'Paid in full'}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Parent</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #0d1b2e;">${parentFirst} ${parentLast}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #0d1b2e;">${email}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #0d1b2e;">${phone || '—'}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Student</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #0d1b2e;">${studentFirst || '—'} · ${grade || '—'}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Goals</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #0d1b2e;">${(goals || []).join(', ') || '—'}</td></tr>
        <tr><td style="padding: 10px 0; color: #8a9ab0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Notes</td><td style="padding: 10px 0; color: #0d1b2e;">${notes || '—'}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 15px; background: #c9a84c; border-radius: 2px; text-align: center;">
        <a href="mailto:${email}" style="color: #0d1b2e; font-weight: bold; text-decoration: none; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Reach out to ${parentFirst} to schedule →</a>
      </div>
      <p style="color: #8a9ab0; font-size: 12px; margin-top: 20px; text-align: center;">⚠️ Note: This is a form submission. Integrate Stripe for real payment processing.</p>
    </div >
            `
});

// Confirmation to customer
await transporter.sendMail({
  from: `"Dr. Krystal | The College Prep Collective" < ${ process.env.EMAIL_USER }> `,
  to: email,
  subject: `You're enrolled — ${pkg} | The College Prep Collective`,
        html: `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #0d1b2e; border-top: 4px solid #c9a84c;">
      <h2 style="color: #ffffff; margin-bottom: 5px;">Welcome, ${parentFirst}.</h2>
      <p style="color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 15px;">Your enrollment in <strong style="color:#c9a84c">${pkg}</strong> has been received. I'll be in touch within 48 hours to coordinate scheduling and get you set up for your first session.</p>
      <p style="color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 25px;">In the meantime, feel free to reply to this email with any questions or information you'd like me to have before we begin.</p>
      <div style="background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.25); border-radius: 3px; padding: 20px; margin-bottom: 25px;">
        <p style="color: #c9a84c; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">Your Enrollment</p>
        <p style="color: #ffffff; font-size: 20px; font-family: 'Georgia', serif; margin-bottom: 4px;">${pkg}</p>
        <p style="color: rgba(255,255,255,0.4); font-size: 13px;">${price} · ${paymentPlan === 'split' ? '2-payment plan' : 'Paid in full'}</p>
      </div>
      <p style="color: rgba(255,255,255,0.45); font-size: 14px; font-style: italic;">"Every student has a story worth telling."</p>
      <p style="color: #c9a84c; margin-top: 8px; font-size: 14px;">— Dr. Krystal</p>
      <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 25px 0;" />
      <p style="color: rgba(255,255,255,0.25); font-size: 11px; text-align: center;">The College Prep Collective · hello@thecollegeprepcollective.com</p>
    </div>
  `
    });

res.json({ success: true });
```

} catch (emailError) {
console.error(‘Order email error:’, emailError.message);
res.json({ success: true }); // still confirm to user
}
});

// ── CONTACT / BOOKING FORM ──
app.post(’/api/contact’, async (req, res) => {
const { firstName, lastName, email, phone, grade, challenge, interest } = req.body;

if (!firstName || !email) {
return res.status(400).json({ error: ‘Name and email are required.’ });
}

// Log to console (always available)
console.log(‘📬 New consultation request:’, { firstName, lastName, email, grade, interest });

// Send email notification to Dr. Krystal
try {
const transporter = nodemailer.createTransport({
service: ‘gmail’,
auth: {
user: process.env.EMAIL_USER,    // your Gmail address
pass: process.env.EMAIL_PASS,    // Gmail app password (not regular password)
},
});

```
// Email to Dr. Krystal
await transporter.sendMail({
    from: `"College Prep Collective" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
    subject: `📋 New Consultation Request — ${firstName} ${lastName}`,
    html: `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #faf8f3; border-top: 4px solid #c9a84c;">
      <h2 style="color: #0d1b2e; margin-bottom: 5px;">New Consultation Request</h2>
      <p style="color: #8a9ab0; font-size: 14px; margin-bottom: 30px;">Submitted via thecollegeprepcollective.com</p>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 13px; width: 140px;">NAME</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #1a2a3d;">${firstName} ${lastName}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 13px;">EMAIL</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #1a2a3d;">${email}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 13px;">PHONE</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #1a2a3d;">${phone || 'Not provided'}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 13px;">GRADE</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #1a2a3d;">${grade || 'Not specified'}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #8a9ab0; font-size: 13px;">INTERESTED IN</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edf4; color: #1a2a3d;">${interest || 'Not specified'}</td></tr>
        <tr><td style="padding: 10px 0; color: #8a9ab0; font-size: 13px; vertical-align: top;">CHALLENGE</td><td style="padding: 10px 0; color: #1a2a3d;">${challenge || 'Not provided'}</td></tr>
      </table>
      <div style="margin-top: 30px; padding: 15px; background: #c9a84c; border-radius: 2px; text-align: center;">
        <a href="mailto:${email}" style="color: #0d1b2e; font-weight: bold; text-decoration: none; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Reply to ${firstName} →</a>
      </div>
    </div>
  `
});

// Auto-reply to the family
await transporter.sendMail({
    from: `"Dr. Krystal | The College Prep Collective" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Your consultation request has been received — The College Prep Collective`,
    html: `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #0d1b2e; border-top: 4px solid #c9a84c;">
      <h2 style="color: #ffffff; margin-bottom: 5px;">Hi ${firstName},</h2>
      <p style="color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 20px;">
        Thank you for reaching out to The College Prep Collective. I've received your request and will be in touch within 24 hours to confirm your free 20-minute consultation.
      </p>
      <p style="color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 30px;">
        In the meantime, feel free to browse the <a href="${process.env.FRONTEND_URL || 'https://yoursite.com'}#services" style="color: #c9a84c;">services page</a> to get a sense of how we might work together.
      </p>
      <p style="color: rgba(255,255,255,0.45); font-size: 14px; font-style: italic;">"Every student has a story worth telling."</p>
      <p style="color: #c9a84c; margin-top: 10px; font-size: 14px;">— Dr. Krystal</p>
      <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;" />
      <p style="color: rgba(255,255,255,0.3); font-size: 12px; text-align: center;">The College Prep Collective · College Admissions & Financial Aid Strategy</p>
    </div>
  `
});

res.json({ success: true, message: 'Consultation request received.' });
```

} catch (emailError) {
console.error(‘Email error:’, emailError.message);
// Still return success to user — log the lead manually
res.json({ success: true, message: ‘Request received.’ });
}
});

// Health check
app.get(’/api/health’, (req, res) => {
res.json({ status: ‘ok’, service: ‘College Prep Collective API’ });
});

// Serve frontend for all other routes (SPA fallback)
app.get(’*’, (req, res) => {
res.sendFile(path.join(__dirname, ‘public’, ‘index.html’));
});

app.listen(PORT, () => {
console.log(`🎓 College Prep Collective server running on port ${ PORT } `);
});