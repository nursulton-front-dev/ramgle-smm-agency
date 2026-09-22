import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory rate limiter for serverless instance (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 3 * 60 * 1000; // 3 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body || {};
    const { name, phone, services, plan, website_hp } = body;

    // 1. HONEYPOT ANTI-SPAM TRAP
    // If hidden honeypot field is filled by a bot, pretend success without sending message
    if (website_hp && String(website_hp).trim().length > 0) {
      console.warn('Bot detected via honeypot trap:', { ip: req.headers['x-forwarded-for'], body });
      return res.status(200).json({ success: true });
    }

    // 2. IP RATE LIMITING
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      'unknown';

    if (isRateLimited(clientIp)) {
      console.warn(`Rate limit exceeded for IP ${clientIp}`);
      return res.status(429).json({
        error: 'Слишком много запросов. Пожалуйста, подождите пару минут перед повторной отправкой.',
      });
    }

    // 3. INPUT VALIDATION
    if (!name || typeof name !== 'string' || !phone || typeof phone !== 'string') {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }

    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 70) {
      return res.status(400).json({ error: 'Пожалуйста, введите корректное имя (от 2 до 70 символов).' });
    }

    // Reject URLs in name field (common spam pattern)
    if (/https?:\/\/|www\.|\.com|\.ru|\.uz|\.net/i.test(trimmedName)) {
      console.warn('Spam link detected in name:', trimmedName);
      return res.status(200).json({ success: true }); // Silent drop for spam bots
    }

    // Check phone digits count (must be 9 local digits for Uzbekistan)
    const phoneDigits = phone.replace(/\D/g, '').replace(/^998/, '');
    if (phoneDigits.length !== 9) {
      return res.status(400).json({ error: 'Некорректный номер телефона.' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const rawChatIds = process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_IDS;

    if (!botToken || !rawChatIds) {
      console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing');
      return res.status(500).json({
        error: 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in Vercel Environment Variables',
      });
    }

    const chatIds = rawChatIds
      .split(/[,;\s]+/)
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    if (chatIds.length === 0) {
      return res.status(500).json({ error: 'No valid Chat IDs provided' });
    }

    const servicesText =
      Array.isArray(services) && services.length > 0
        ? services.map((s: string) => `• <b>${escapeHtml(s)}</b>`).join('\n')
        : '<i>Не выбраны</i>';

    const planText = plan ? `<b>${escapeHtml(plan)}</b>` : '<i>Не выбран</i>';

    const message = `🔥 <b>НОВАЯ ЗАЯВКА С САЙТА RAMBLE SMM</b>\n\n👤 <b>Имя:</b> ${escapeHtml(
      trimmedName
    )}\n📞 <b>Телефон:</b> <code>${escapeHtml(
      phone
    )}</code>\n💎 <b>Тариф:</b> ${planText}\n\n📋 <b>Услуги:</b>\n${servicesText}`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const results = await Promise.all(
      chatIds.map(async (chatId) => {
        try {
          const resp = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'HTML',
            }),
          });
          const data = await resp.json();
          return { chatId, ok: resp.ok && data.ok, data };
        } catch (err: any) {
          return { chatId, ok: false, error: err.message };
        }
      })
    );

    const hasSuccess = results.some((r) => r.ok);
    if (!hasSuccess) {
      console.error('Failed to send to Telegram Chat IDs:', results);
      return res.status(500).json({ error: 'Telegram API Error', details: results });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
