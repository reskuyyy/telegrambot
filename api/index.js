import TelegramBot from 'node-telegram-bot-api';

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN);

export default async function handler(req, res) {

  if (req.method === 'GET') {
    return res.status(200).send('Bot Running ✅');
  }

  try {

    const update = req.body;

    if (update.message) {

      const chatId = update.message.chat.id;
      const text = update.message.text;

      // START
      if (text === '/start') {

        await bot.sendMessage(
          chatId,
          `👋 Selamat datang di POS Utility Bot\n\nPilih tools yang ingin digunakan:`,
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

      }

      // HELP
      if (text === '/help') {

        await bot.sendMessage(
          chatId,
          '/start - buka menu utama\n/help - bantuan'
        );

      }

    }

    return res.status(200).send('ok');

  } catch (err) {

    console.error(err);
    return res.status(500).send('error');

  }

}
