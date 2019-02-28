const Telegraf = require("telegraf");
const fs = require("fs");
const _ = require("lodash");
let msgSenders = require("./msgSenders.json");
const bot = new Telegraf(process.env.BOT_TOKEN, { telegram: { webhookReply: true } });

bot.command("start", ctx => {
    if (!_.includes(msgSenders.id, ctx.from.id)) {
        msgSenders.id.push(ctx.from.id);
        fs.writeFileSync("./msgSenders.json", JSON.stringify(msgSenders));
        bot.telegram.sendMessage(ctx.from.id, "THX!\nNow, receive spam :3");
    }
});

let recursiveSpam = () => {
    setInterval(function () {
        _.each(msgSenders.id, function(value) {
            bot.telegram.sendMessage(value, "SPAM BITCH!");
        });
    }, 2000);
}

bot.startPolling();
bot.launch();
recursiveSpam();
