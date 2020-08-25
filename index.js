const Discord = require("discord.js");
const config = require("./config.json");
const got = require("got");
const fs = require("fs");
const bot = new Discord.Client({
    disabledEvents: [
        "GUILD_UPDATE",
        "GUILD_MEMBER_ADD",
        "GUILD_MEMBER_REMOVE",
        "GUILD_MEMBER_UPDATE",
        "GUILD_MEMBERS_CHUNK",
        "GUILD_ROLE_CREATE",
        "GUILD_ROLE_DELETE",
        "GUILD_ROLE_UPDATE",
        "GUILD_BAN_ADD",
        "GUILD_BAN_REMOVE",
        "CHANNEL_UPDATE",
        "CHANNEL_PINS_UPDATE",
        "MESSAGE_DELETE",
        "MESSAGE_UPDATE",
        "MESSAGE_DELETE_BULK",
        "MESSAGE_REACTION_ADD",
        "MESSAGE_REACTION_REMOVE",
        "MESSAGE_REACTION_REMOVE_ALL",
        "USER_UPDATE",
        "USER_NOTE_UPDATE",
        "USER_SETTINGS_UPDATE",
        "PRESENCE_UPDATE",
        "VOICE_STATE_UPDATE",
        "TYPING_START",
        "VOICE_SERVER_UPDATE",
        "RELATIONSHIP_ADD",
        "RELATIONSHIP_REMOVE",
    ]
});
bot.commands = new Discord.Collection();
bot.prefix = config.prefix;

fs.readdir("./commands", (err, files) => {
    if(err) console.log(err);
    let filejs = files.filter(f => f.split(".").pop() === "js");
    if(filejs.length <= 0){
        console.log("No commands found!");
        return;
    }


    filejs.forEach((f) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", () => {
    console.log("Im logged! Ready to control your 2Bored2Wait Proxy Server!")
    const RotatePresence = setInterval(async () => {
        const update = await got(`${config.URL}/update`, {
            headers: {
                "xpassword" : config.password
            }
        })
        //console.log(update)
        if (update.statusCode === 403) {
            console.log("Wrong password for webserver! Please update your password in config.json!")
            await bot.user.setActivity("Wrong password for Webserver! Please check console!!!")
            return;
        }
        if (JSON.parse(update.body).ETA === "NOW") {
            await bot.user.setStatus("online")
            bot.user.setActivity("2B2T Proxified", { type: "PLAYING" })
            return;
        }
        const prioqueue = await got("https://2b2t.io/api/prioqueue").json()
        const normalqueue = await got("https://2b2t.io/api/queue").json()
        const status = await got("https://api.2b2t.dev/status").json()
        if (JSON.parse(update.body).inQueue === true) {
            await bot.user.setStatus("dnd")
            bot.user.setActivity(`Q ${JSON.parse(update.body).place} || ETA ${JSON.parse(update.body).ETA}`, { type: "LISTENING" })
            return;
        }
        await bot.user.setStatus("idle")
        bot.user.setActivity(`Q ${normalqueue[0][1]} || PQ ${prioqueue[0][1]} || TPS ${status[0][0]}`, { type: "WATCHING" })
    }, 16000)
})

bot.on("message", async (message) => {
    if(message.author.bot) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!cmd.startsWith(config.prefix)) return;

    let filecmd = bot.commands.get(cmd.replace(config.prefix, ''));
    if(filecmd) filecmd.run(bot, message, args);
});

bot.login(config.token).catch(e => {
    console.log(e.message)
})
