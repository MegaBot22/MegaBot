const Discord = require('discord.js');
var client = new Discord.Client();
const { token, prefix } = require('./config.json')
    module.exports = {
    name: "mute",
    aliases: ["im", "imute"],
    run: async (client, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.roles.find(r => r.name === "ADMINISTRATOR")) return message.channel.send("Nincs jogod ehhez a parancshoz!").then(m => m.delete(10000));



 
if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Nincs jogom rangot hozzáadni!").then(m => m.delete(10000));
     
//define the reason and mutee
let time = args[1];
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) {
        return message.channel.send("Nem találok ilyen nevű felhasználót")
        .then(m => m.delete(10000));
      }
      if (mutee.id === message.author.id) {
            return message.reply("Nem némíthatod le magad")
                .then(m => m.delete(10000));
        }
      
  
 
let reason = args.slice(2).join(" ");
if(!reason) reason = "Nincs indok megadva"
 
//define mute role and if the mute role doesnt exist then create one
let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Muted",
            color: "#ffffff",
            permissions: []
        });
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            });
        });
    } catch(e) {
        console.log(e.stack);
    }
}
 
//add role to the mentioned user and also send the user a dm explaing where and why they were muted
mutee.addRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Szia! Némítva lettél itt: \`${message.guild.name}\`\nIndok: \`${reason}\`\nIdő: \`${ms(ms(time))}\``).catch(err => console.log(err))
    const embed = new Discord.RichEmbed()
    .setColor("RED")
    .setAuthor(`Némítás`, message.guild.iconURL)
    .addField("Némított:", mutee.user.tag)
    .addField("Némító:", `<@${message.author.id}>`)
    .addField("Indok:", reason)
    .addField("Dátum:", message.createdAt.toLocaleString())

});
setTimeout(function(){
  mutee.removeRole(muterole.id)
  mutee.send(`Fel lett oldva a némításod \`${message.guild.name}\`\nIndok: \`Auto\``)

  const endEmbed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setAuthor(`Némítás feloldás`, message.guild.iconURL)
  .addField("Feloldott:", mutee.user.tag)
  .addField("Feloldó:", `<@${message.author.id}>`)
  .addField("Indok:", `Automata feloldás`)
  .addField("Dátum:", message.createdAt.toLocaleString())

  let sChannel = message.guild.channels.find(c => c.name === "『📝』log");
  sChannel.send(endEmbed);
 

 }, ms(time));

message.channel.send(`** ${mutee.user.tag} **némítva lett ennyi időre: \`${ms(ms(time))}\``)    

}

}
client.login(token)
