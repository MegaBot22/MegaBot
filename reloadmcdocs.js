const discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {

    if(message.author.id != "485041609289891853") return message.channel.send("Te vagy a bot készitője!")

    if(!args[0]) return message.channel.send("Please provide a command to reload!")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        bot.command.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    }catch(e) {
        return message.channel.send(`Clound not reload: \'${args[0].toUpperCase()}\``)
    }

    message.channel.send(`A command\'${args[0].toUpperCase()}\ újra lett índitva!`)
    }


    module.exports.config  = {
        name: "reload",
        description: "újra inditó parancs",
        usage: "Mega!reload",
        accesableby: "Bot Owner",
        aliases: ["creload"]
    }
