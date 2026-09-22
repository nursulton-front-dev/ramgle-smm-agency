import type { VercelRequest, VercelResponse } from '@vercel/node';

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
    const { name, phone, services, plan } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing');
      return res.status(500).json({
        error: 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in Vercel Environment Variables',
      });
    }

    const servicesText =
      Array.isArray(services) && services.length > 0
        ? services.map((s: string) => `• <b>${escapeHtml(s)}</b>`).join('\n')
        : '<i>Не выбраны</i>';

    const planText = plan ? `<b>${escapeHtml(plan)}</b>` : '<i>Не выбран</i>';

    const message = `🔥 <b>НОВАЯ ЗАЯВКА С САЙТА RAMBLE SMM</b>\n\n👤 <b>Имя:</b> ${escapeHtml(
      name
    )}\n📞 <b>Телефон:</b> <code>${escapeHtml(
      phone
    )}</code>\n💎 <b>Тариф:</b> ${planText}\n\n📋 <b>Услуги:</b>\n${servicesText}`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ error: 'Telegram API Error', details: data });
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
