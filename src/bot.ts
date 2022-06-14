const cron = require('node-cron');
import { KBotify, AppCommand, AppFunc, BaseSession } from 'kbotify';

class EchoKmd extends AppCommand {
  code = 'kmd'; // 只是用作标记
  trigger = 'kmd'; // 用于触发的文字
  help = '`.echo kmd 内容`'; // 帮助文字
  intro = '复读你所说的文字, 并用kmarkdown格式返回。';
  func = async (session) => {
    if (!session.args.length) {
      return session.reply(this.help + '123');
    }
    return session.quote(`${session.args}`);
  };
}

const bot = new KBotify({
  mode: 'websocket',
  token: '1/MTEyODE=/zR77VFMbR1wsdrYX2kocdg==',
  ignoreDecryptError: false, // 是否忽略消息解密错误 如果需要可以改为true
});


bot.addCommands(new EchoKmd());

// 0 12
cron.schedule('0 12 * * *', () => {
  bot.API.message.create(1, '7399123414064767', '(met)2875889652(met)滴滴滴 又到一天读书时 有时间别忘记读书哦')
});

export default function runBot() {
  bot.connect(); // 启动 Bot
}