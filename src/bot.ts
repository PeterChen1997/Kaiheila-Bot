const cron = require( 'node-cron');
import { KBotify, AppCommand, AppFunc, BaseSession } from './sdk';
import { Logger } from '@nestjs/common';

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

cron.schedule('0 20 * * *', () => {
  bot.API.message.create(1, '7399123414064767', '(met)all(met) 滴滴滴 又到一天读书时 有时间别忘记读书哦')
});

cron.schedule('* * * * *', () => {
  Logger.log('info')
});


export default function runBot() {
  bot.event.on('system', (...args) => {
    Logger.warn(JSON.stringify(args))
  })

  bot.message.on('text', (msg) => {
    Logger.warn(JSON.stringify(msg))
    
    if (msg.channelId === '9646458729065308' || msg.channelId === '9765906942670925') {
      bot.API.message.addReaction(msg.msgId, '👍')
    }
  })

  // bot.message.on('file', (msg) => {
  //   Logger.warn(JSON.stringify(msg))
    
  //   if (msg.channelId === '9646458729065308' || msg.channelId === '9765906942670925') {
  //     bot.API.message.addReaction(msg.msgId, '👍')
  //   }
  // })

  bot.message.on('image', (msg) => {
    Logger.error(JSON.stringify(msg))
    
    if (msg.channelId === '9646458729065308' || msg.channelId === '9765906942670925') {
      bot.API.message.addReaction(msg.msgId, '👍')
    }
  })

  bot.connect(); // 启动 Bot
}