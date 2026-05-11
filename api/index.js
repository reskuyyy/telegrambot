import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.BOT_TOKEN);

export default async function handler(req, res) {

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok'
    });
  }

  try {

    const update = req.body;

    if (update.message?.text === '/start') {

      await bot.sendMessage(
        update.message.chat.id,
        '👋 POS Utility Bot',
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

    return res.status(200).send('ok');

  } catch (e) {

    console.error(e);

    return res.status(500).json({
      error: e.message
    });

  }

}
