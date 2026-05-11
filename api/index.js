import TelegramBot from 'node-telegram-bot-api';

const TOKEN = process.env.BOT_TOKEN || 'dummy';

const bot = new TelegramBot(TOKEN);

// daftar kode akses
const ACCESS_CODES = [
  'n497',
  'n612',
  'N152',
'N230',
'N311',
'N314',
'N596',
'N599',
'N638',
'N665',
'N694',
'N747',
'N768',
'N895',
'N897',
'N950',
'N964',
'NA27',
'NA36',
  'admin01'
];

// user yang sudah login
const AUTH_USERS = new Set();

export default async function handler(req, res) {

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok'
    });
  }

  try {

    const update = req.body;

    if (!update.message) {
      return res.status(200).send('ok');
    }

    const chatId = update.message.chat.id;
    const text = update.message.text;

    // START
    if (text === '/start') {

      AUTH_USERS.delete(chatId);

      await bot.sendMessage(
        chatId,
        '🔐 Masukkan kode akses:'
      );

      return res.status(200).send('ok');
    }

    // cek kode
    if (!AUTH_USERS.has(chatId)) {

      if (ACCESS_CODES.includes(text)) {

        AUTH_USERS.add(chatId);

        await bot.sendMessage(
          chatId,
          '✅ Akses diterima',
          {
            reply_markup: {
              inline_keyboard: [

                [
                  {
                    text: '📊 Cek Clerek',
                    web_app: {
                      url: 'https://cek-klerek.vercel.app/'
                    }
                  }
                ],

                [
                  {
                    text: '👀 SO Viewers',
                    web_app: {
                      url: 'https://so-viewers.vercel.app/'
                    }
                  }
                ]

              ]
            }
          }
        );

      } else {

        await bot.sendMessage(
          chatId,
          '⛔ Kode tidak valid'
        );

      }

      return res.status(200).send('ok');
    }

    return res.status(200).send('ok');

  } catch (e) {

    console.error(e);

    return res.status(500).json({
      error: e.message
    });

  }

}
