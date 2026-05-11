import TelegramBot from 'node-telegram-bot-api';

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN);

export default async function handler(req, res) {

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      message: 'Telegram Bot Running ✅'
    });
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
          '👋 Selamat datang di POS Utility Bot',
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

    }

    return res.status(200).send('ok');

  } catch (err) {

    console.error(err);
    return res.status(500).send('error');

  }

}
