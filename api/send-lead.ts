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
      name
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
