const Discord = require('discord.js');
var client = new Discord.Client();
const { token, prefix } = require('./config.json')
const superagent = require("superagent")


module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nincs megfelelő jogod!")

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!banMember) return message.channel.send("Kérlek adj meg egy felhasználót!")

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "Nem adtál meg indokot!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nincs megfelelő jogod!")

    message.delete()

    banMember.send(`Szia! ki lettél tiltva ${message.guild.name} által. indok: ${reason}`).then(() =>
    message.guild.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err))

    message.channel.send(`**${banMember.user.tag}** ki lett tiltva!`)

    let embed = new discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(`${message.guild.name} logs`, message.guild.iconURL)
    .addField("Moderation:", `ban`)
    .addField("Mutee:", banMember.user.username)
    .addField("Moderátor", message.author.username)
    .addField("Indok:", reason)
    .addField("Dátum:", message.createdAt.toLocaleString())

    sChannel.send(embed)






}

module.exports.config = {
    name: "ban",
    description: "Kitiltó parancs",
    usage: "Mega!ban",
    accessableby: "Administrators",
    aliases: ["b", "banish", "remove"]
}
