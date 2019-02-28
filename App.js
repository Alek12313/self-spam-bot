const Telegraf = require("telegraf");
const fs = require("fs");
const _ = require("lodash");
const bot = new Telegraf(process.env.BOT_TOKEN, { telegram: { webhookReply: true } });
const array = ["text"];

bot.command("start", ctx => {
    console.log(ctx.update.message.chat.id);
    let i = 0;
    setInterval(function () {
        bot.telegram.sendMessage(ctx.update.message.chat.id, array[i]);
        i++;
        if (i === array.length) { i = 0; }
    }, 3000);
});

bot.startPolling();
bot.launch();
