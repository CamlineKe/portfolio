import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
  message: string;
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };

    return entities[character];
  });

const getClientIp = (req: NextApiRequest) => {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0];
  }

  return forwardedFor?.split(',')[0].trim() ?? req.socket.remoteAddress ?? 'unknown';
};

const isRateLimited = (clientIp: string) => {
  const now = Date.now();
  const recentRequests = (requestLog.get(clientIp) ?? [])
    .filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(clientIp, recentRequests);
    return true;
  }

  requestLog.set(clientIp, [...recentRequests, now]);
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }

  const { name, email, message, honeypot } = req.body ?? {};

  if (typeof honeypot === 'string' && honeypot.trim()) {
    return res.status(200).json({ message: 'Message sent successfully!' });
  }

  if (
    typeof name !== 'string'
    || typeof email !== 'string'
    || typeof message !== 'string'
  ) {
    return res.status(400).json({ message: 'Invalid form submission.' });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanMessage = message.trim();

  if (
    cleanName.length < 2
    || cleanName.length > 80
    || /[\r\n]/.test(cleanName)
    || !emailPattern.test(cleanEmail)
    || cleanEmail.length > 254
    || cleanMessage.length < 10
    || cleanMessage.length > 3000
  ) {
    return res.status(400).json({ message: 'Please check your contact details and message.' });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ message: 'Too many messages. Please try again later.' });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, TARGET_EMAIL } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !TARGET_EMAIL) {
    console.error('Contact form email environment variables are not configured.');
    return res.status(500).json({ message: 'Contact form is temporarily unavailable.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Moses Maina Portfolio" <${GMAIL_USER}>`,
      replyTo: {
        name: cleanName,
        address: cleanEmail,
      },
      to: TARGET_EMAIL,
      subject: `Portfolio Contact: New Message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(cleanMessage).replace(/\n/g, '<br />')}</p>
      `,
    });

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send message.' });
  }
}
