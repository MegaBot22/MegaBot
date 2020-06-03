const Discord = require('discord.js');
var client = new Discord.Client();
const { token, prefix } = require('./config.json')
const superagent = require("superagent")

if(message.content.startsWith(prefix + "cat")) {
    let msg = await message.channel.send("Kérlek várj....")
    
    let {body} = await superagent
    .get('http://aws.random.cat/meow')
    //console.log(body.file) 

    if(!body) return message.channel.send(`Kérlek probáld újra!`)

    let catEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("Macskák")
    .setImage(body.file)
    .setTimestamp()
    .setFooter(`${client.user.username} | Cats`, client.user.displayAvatarURL)

    message.channel.send(catEmbed)

    msg.delete();
}




if(message.content.startsWith(`${prefix}crime`)) {
    let replies = ["Sikeresen kiraboldtad a boltot!","Sikertelen rablás!"];
  
    let result = Math.floor(Math.random() * (6 - 1) + 1);
     if(result == 1) {
        let heads = new Discord.MessageEmbed() 
        .setDescription(`**Sikeresen kiraboltad a boltot!**`)
        .setColor('RANDOM')
        .setFooter(`${client.user.username} | rablás`, client.user.displayAvatarURL)
        .setTimestamp()
       return message.channel.send(heads)
     }else{
        let heads1 = new Discord.MessageEmbed()
        .setDescription(`**Sikertelen rablás!**`)
        .setColor('RANDOM')
        .setFooter(`${client.user.username} | rablás`, client.user.displayAvatarURL)
        .setTimestamp()
      return message.channel.send(heads1)
   
  }
  
     }
