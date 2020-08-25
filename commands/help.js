const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.channel.send("Help page for 2Bored2Wait Bot!", { embed:
                {
                    "description": `\`\`${bot.prefix}help\`\`` + " to show this page!",
                    "color": 5351424,
                    "fields": [
                        {
                            "name": `${bot.prefix}status`,
                            "value": "Show Status for 2B2W server"
                        },
                        {
                            "name": `${bot.prefix}start`,
                            "value": "Start queuing"
                        },
                        {
                            "name": `${bot.prefix}stop`,
                            "value": "Stop queuing"
                        },
                        {
                            "name": `${bot.prefix}restart`,
                            "value": "Reconnect queue"
                        },
                        {
                            "name": `${bot.prefix}togglerestart`,
                            "value": "Toggle restart queue if no client connected to queue server"
                        },
                        {
                            "name": `${bot.prefix}queue`,
                            "value": "Show 2B2T normal and priority queue"
                        },
                        {
                            "name": `${bot.prefix}stats`,
                            "value": "Show status for 2B2T server"
                        },
                        {
                            "name": `${bot.prefix}lookup`,
                            "value": "Show stats of given player in 2B2T"
                        },
                        {
                            "name": `${bot.prefix}lastdeath`,
                            "value": "Show info about last death of given player in 2B2T"
                        },
                        {
                            "name": `${bot.prefix}lastkill`,
                            "value": "Show info about last kill of give player in 2B2T"
                        }
                    ],
                    "author": {
                        "name": "2Bored2Wait Discord Bot",
                        "url": "https://github.com/hanahaneull/Discord-2Bored2Wait"
                    }
                }
         } )
}

module.exports.help = {
    name : "help"
}