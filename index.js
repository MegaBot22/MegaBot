const Discord = require('discord.js');
const { token, prefix } = require('./config.json')
const superagent = require("superagent")
var client = new Discord.Client({
    disableEveryone: true,
    unknowCommandRespone: false,// a command handler hol van? tyűű nemtom xd
});

client.on('ready', () => {
    console.log(`Online vagyok ${client.user.tag} ként!`);
    client.user.setActivity(`Prefix: ${prefix}`, { type: 'WATCHING' })

    let statuses = [ 
        "| MegaTeam Discord |",
        "| Segítség: Mega!help |",
        "| Karbantartás alatt! |",
        ` | ${client.guilds.size} szerveren |`,
        "| Verzió: v1.5.0 |",
        "| Készítette: iTzQuitfeter988 |",
        "| Mega!ping |",
        "| Mega!say |",
        "| Mega!serverinfo |",
        "| Mega!invite |",
        "| Mega!coinflip |",
        "| Mega!prefix |",
        "| Fejlesztés alatt! |"
        
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, {type: "WATCHING"})
    }, 3000)
});
client.on('message', async message => {
    if (message.author.bot) return;
    let args = message.content.split(" ").slice(1); 
    if(message.content.startsWith(`${prefix}coinflip`)) {
        let replies = ["Fej","Írás"];

        let result = Math.floor(Math.random() * (6 - 1) + 1);
        if(result == 1) {
            let heads = new Discord.MessageEmbed() 
            .setDescription(`**Eredmény**: Fej`)
            .setColor('BLUE')
            .setFooter(`${client.user.username} | coinflip`, client.user.displayAvatarURL)
            .setTimestamp()
           .setTitle('Fej vagy írás?');
           return message.channel.send(heads)
         }else{
            let heads1 = new Discord.MessageEmbed()
           .setDescription(`**Eredmény**: Írás`)
            .setColor('BLUE')
           .setFooter(`${client.user.username} | coinflip`, client.user.displayAvatarURL)
           .setTimestamp()
          .setTitle('Fej vagy írás?');
          return message.channel.send(heads1)
       
      }
       
    }
    if(message.content.startsWith(`${prefix}kosár`)) {
        let replies = ["Sajnos ezt kihagytad","Kosááár"];
    
        let result = Math.floor(Math.random() * (6 - 1) + 1);
        if(result == 1) {
            let heads = new Discord.MessageEmbed() 
            .setDescription(`**Eredmény**: Kosááár`)
            .setColor('BLUE')
            .setFooter(`${client.user.username} | coinflip`, client.user.displayAvatarURL)
            .setTimestamp()
           .setTitle('Kosár játék!');
           return message.channel.send(heads)
         }else{
            let heads1 = new Discord.MessageEmbed()
           .setDescription(`**Eredmény**:Sajnos ezt kihagytad `)
            .setColor('BLUE')
           .setFooter(`${client.user.username} | coinflip`, client.user.displayAvatarURL)
           .setTimestamp()
          .setTitle('Kosár játék');
          return message.channel.send(heads1)
       
      }
       
    }
    if(message.content.startsWith(prefix + "infó")){
        let user = message.mentions.users.first() || message.member;
        if(user.presence.status === "dnd") user.presence.status = "Elfoglalt";
        if(user.presence.status === `idle`) user.presence.status = "Tétlen";
        if(user.presence.status === `offline`) user.presence.status = "Láthatatlan";
        if(user.presence.status === `online`) user.presence.status = "Elérhető";
        if(user.presence.status === null) user.presence.game = "Nem játszik";
        const member = user;
        const roles = user.roles
        const embed =  new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(user.avatarURL)
        .setTitle(`${user.username} Információi`, user.displayAvatarURL)
        .addField("Felhasználóneve:", user.username)
        .addField("ID", user.id)
        .addField("Rangjai:",member.roles.map(roles => `${roles}`).join(' '), true)
        .addField("Játékban:", user.presence.game)
        .addField("Állapota:", user.presence.status)
        .addField("Létrehozva:", user.createdTimestamp)
        .addField("Csatlakozott a szerverhez:", member.joinedTimestamp)
        .setFooter(`${client.user.username} | infó`, client.user.displayAvatarURL)
        .setTimestamp();
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "serverinfo")) {
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("Szerver Információk")
        .setFooter(`${client.user.username} | serverinfo`, client.user.displayAvatarURL)
        .addField("Discord szerver neve:", `${message.guild.name}`)
        .addField("Discord szerver tulajdonosa:", `${message.guild.owner}`)
        .addField("Felhasználók:", `${message.guild.memberCount}`)
        .addField("Rangok:", `${message.guild.roles.size}`)
        .addField("Készítve:", `${message.guild.createdAt}`)
        .addField("AFK-Csatorna:", `${message.guild.afkChannel}`)
        .addField("A Szerver ID-je", `${message.guild.id}`)
        .addField("Szerver régió:", `${message.guild.region}`)
        .addField("Icon URL", `${message.guild.iconURL}`)
        .addField("Szerver tulajdonos id-je:", `${message.guild.ownerID}`)
        .addField("Moderáció szint:", `${message.guild.verificationLevel}`)
        .addField("Ellenörzés:", `${message.guild.verified}`)
        .setTimestamp();
        return message.channel.send(embed)
    }
    if (message.content.startsWith(`${prefix}say`)) {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Nincs jogod hogy használd ezt a parancsot!")
      let author = message.member;
      var text = message.content.split(' ').slice(1).join(' ')
      if(!text) return message.reply( "Használat: Mega!say (üzenet)")
      message.delete()
      message.channel.send(text)
    }

  if(message.content.startsWith(prefix + "delete")) {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Nincs jogod hogy használd ezt a parancsot!")

      let author = message.member;
      if(!args[0]) {
          message.delete();
          message.channel.send("**Használd:** Mega!delete szám")
          return;
      }
      if (args[0] > 100) {
          message.channel.send("A Maximum törölhető szám 100.Probáld újra!")
          return;
      }
      message.channel.bulkDelete(args[0]);
      message.channel.send(`**Sikeresen töröltél ${args[0]} üzenetet!**`)
      return;
  }
  let discord = require('discord.js')
  if(message.content.startsWith(prefix + "broadcast")) {
       if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Nincs jogod ehez!");
       let BcEmbed = new Discord.RichEmbed()
       .setColor('RANDOM')
       .setDescription(message.content.split(' ').slice(1).join(' '))
       message.channel.send(BcEmbed)
   }
  if(message.content.startsWith(prefix + "report")) {
      let felhasználó =  message.mentions.members.first() || message.guild.members.get(args[0])
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Nincs jogod ehez!");
      if(!felhasználó) return message.channel.send("Nem találok ilyen nevű felhasználót!");
      let Indok = args.join(" ").slice(1);
      if(!Indok) return message.channel.send("Kérlek írj indokot!")

      let reportEmbed = new Discord.RichEmbed()
      .setTitle("Report")
      .setColor('RANDOM')
      .setDescription(`Jelentett felhasználó: ${felhasználó} Azonosító: ${felhasználó.id}\n Általa jelezve: ${message.author} Azonosító: ${message.author.id}`)
      .setFooter(`${client.user.username} | report`, client.user.displayAvatarURL)
      .setTimestamp();
      message.channel.send(reportEmbed)
  }
  if(message.content.startsWith(prefix + "help")) {
        let embed = new Discord.RichEmbed()
        .setTitle("Parancsaim:", "Ideiglenes")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor("RANDOM")
        .addField("serverinfo", `Megmutatja a szerver informácioit`)
        .addField("botinfo", `Megmutatja a bot informácioit!`)
        .addField("infó", `Megmutatja a felhasználó adatait!`)
        .addField("delete", `Ki tudsz vele törölni üzeneteket`)
        .addField("say", `Tudsz a bottal írni`)
        .addField("fejlesztők", `Megmutatja a bot fejlesztőit.`)
        .addField("invite", `Ezzel be tudod hívni a botot a szerveredre`)
        .addField("broadcast", `Tudsz egy kész embedet írni`)
        .addField("ping", `Megmutatja a bot pingjét!`)
        .addField("guilds", `Megmutatja a szerverek számát`)
        .addField("parancsok", `Itt találhatod a frísitett  parancsokat!`)
        .addField("megateam", `Behív a MegaTeam szerverre!`)
        .addField("árfolyamok", `Lekéri az aktuális árfolyamokat!`)
        .addField("avatar", `Lekéri a SAJÁT! profilképedet!(Frissitve lesz hogy mások avatarját is le lehessen kérni)`)
        .setFooter(`${client.user.username} | help`, client.user.displayAvatarURL)
        .setTimestamp();
  
        message.channel.send(embed);
        }
        if(message.content.startsWith(prefix + "botinfo")) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("Bot Információk")
            .setFooter(`${client.user.username} | bot-infó`, client.user.displayAvatarURL)
            .addField("Fejlesztőm:", `iTzQuitfeter988`)
            .addField("Programnyelvem:", `JavaScript`)
            .addField("Verzióm:", `v1.5.0 `)
            .addField("Szerverek:", `${client.guilds.size}`)
            .addField("prefix:", `${prefix}`)
            .setTimestamp();
            return message.channel.send(embed)
        }
        if(message.content.startsWith(prefix + "fejlesztők")) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("Fejlesztők")
            .setTitle("A Botot fejlesztette: iTzQuitfeter988")
            .setThumbnail(client.user.avatarURL)
            .setFooter(`${client.user.username} | fejlesztők`, client.user.displayAvatarURL)
            .setTimestamp();
            message.channel.send(embed)
        }
        if(message.content.startsWith(prefix + "ping")) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("Megabot pingje")
            .setDescription("Pong!")
            .addField("Ping:",`**${client.ping}ms**`)
            .setThumbnail(client.user.avatarURL)
            .setFooter(`${client.user.username} | ping`, client.user.displayAvatarURL)
            .setTimestamp();
            message.channel.send(embed)
        }
        //if (message.content.startsWith(`${prefix}parancsok`)) {
            //return message.channel.send("Szia!\n**A Folyamatosan frisített parancsaimat megtalálod a weboldalon**\nhttp://www.megabot.nhely.hu/ címen! ")
        //}
        if(message.content.startsWith(prefix + "guilds")) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("Szerverek száma")
            .setFooter(`${client.user.username} | guilds`, client.user.displayAvatarURL)
            .setDescription(`${client.guilds.size}`)
            .setTimestamp();
            return message.channel.send(embed)
        }
        if(message.content.startsWith(prefix + "karbantartás")) {
            if(!message.member.hasPermission("")) return message.channel.send("Nincs jogod ehez!");
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("KARBANTARTÁS!")
            .setThumbnail(client.user.avatarURL)
            .setFooter(`${client.user.username} | Karbantartás!`, client.user.displayAvatarURL)
            .setDescription("A Fejlesztőim karbantartást rendeltek el!")
            .setTimestamp();
            return message.channel.send(embed)
        }
        if(message.content.startsWith(prefix + "invite")) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("Invite")
            .setDescription("Itt be tudod hívni a botot:https://discord.com/api/oauth2/authorize?client_id=709332574820106340&permissions=8&scope=bot ")
            .setThumbnail(client.user.avatarURL)
            .setFooter(`${client.user.username} | fejlesztők`, client.user.displayAvatarURL)
            .setTimestamp();
            message.channel.send(embed)
        }
        if(message.content.startsWith(prefix + "megabotsupport")) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("Discord Link")
            .setDescription("itt betudsz lépni a support szerverre: https://discord.gg/jZAKy2y")
            .setThumbnail(client.user.avatarURL)
            .setFooter(`${client.user.username} | Megabot-Support`, client.user.displayAvatarURL)
            .setTimestamp();
            message.channel.send(embed)
        }
        if(message.content.startsWith(prefix + "megateam")) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("Discord Link")
            .setDescription("itt betudsz lépni a megateam szerverre: https://discord.gg/ZyMAP4Z")
            .setThumbnail(client.user.avatarURL)
            .setFooter(`${client.user.username} | MegaTeam`, client.user.displayAvatarURL)
            .setTimestamp();
            message.channel.send(embed)
        }
    
        if(message.content.startsWith(prefix + "árfolyamok")) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("Árfolyamok")
            .addField("CHF", `Forint: 325,83`)
            .addField("EUR", `Forint: 355`)
            .addField("GBP", ` Forint: 395`)
            .addField("DKK", `Forint: 47`)
            .addField("PLN", `Forint: 81`)
            .addField("TRY", `Forint: 50`)
            .addField("RON", `Forint: 75`)
            .addField("NOK", `Forint: 33 `)
            .addField("CAD", `Forint: 234 `)
            .addField("SEK", `Forint: 34 `)
            .addField(" CHF", `Forint: 330 `)
            .addField("AUD", `Forint: 229 `)
            .setThumbnail(client.user.avatarURL)
            .setFooter(`${client.user.username} | árfolyamok`, client.user.displayAvatarURL)
            .setTimestamp();
            message.channel.send(embed)
        }
        if(message.content.startsWith(prefix + "snippet_help")) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("Snippetek")
            .setDescription("!!üdv\n!!zár\n!!partner-feltételek\n!!tgf-sikeres\n!!tgf-sikertelen\ntgf-feltételek\n!!partner-szöveg")
            .setThumbnail(client.user.avatarURL)
            .setFooter(`${client.user.username} | Snippet`, client.user.displayAvatarURL)
            .setTimestamp();
            message.channel.send(embed)
        }
        if(message.content.startsWith(prefix + "avatar")) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle("Avatar URL")
            .setFooter(`${client.user.username} | AvatarURL`, client.user.displayAvatarURL)
            .setThumbnail(message.author.avatarURL)
            message.channel.send(embed)
        }
        //if(message.content.startsWith(prefix + "crime")) {
            //let embed = new Discord.RichEmbed()
            //.setColor('RANDOM')
            //.setTitle("Rablás!")
            //.setDescription(`Sikeresen kiraboltad a boltot!`)
            //.setFooter(`${client.user.username} | bolt-rablás`, client.user.displayAvatarURL)
            //.setTimestamp();
            //message.channel.send(embed)
        //}
        if(message.content.startsWith(`${prefix}crime`)) {
            let replies = ["Sikeresen kiraboldtad a boltot!","Sikertelen rablás!"];
          
            let result = Math.floor(Math.random() * (6 - 1) + 1);
             if(result == 1) {
                let heads = new Discord.RichEmbed() 
                .setDescription(`**Sikeresen kiraboltad a boltot!`)
                .setColor('RANDOM')
                .setFooter(`${client.user.username} | rablás`, client.user.displayAvatarURL)
                .setTimestamp()
               return message.channel.send(heads)
             }else{
                let heads1 = new Discord.RichEmbed()
                .setDescription(`**Sikertelen rablás!`)
                .setColor('RANDOM')
                .setFooter(`${client.user.username} | rablás`, client.user.displayAvatarURL)
                .setTimestamp()
              return message.channel.send(heads1)
    
          }
          
             }
             if(message.content.startsWith(prefix + "id")) {
                let embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle("ID")
                .setDescription(`${message.author.id}`)
                .setFooter(`${client.user.username} | ID`, client.user.displayAvatarURL)
                .setThumbnail(message.author.avatarURL)
                message.channel.send(embed)
            }
            if(message.content.startsWith(prefix + "tgf")) {
                let embed = new discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle("Tagfelvétel információk!")
                .setDescription("Jelenleg nincsen a szerveren TGF!")
                .setThumbnail(message.author.avatarURL)
                .setFooter(`${client.user.username} | Tagfelvétel!` , client.user.displayAvatarURL)
                message.channel.send(embed)
                

            }
            if(message.content.startsWith(`${prefix}gamble`)) {
                let sum = Math.floor(Math.random() * 6) + 1;

                embed.setColor('RANDOM');
                embed.addField("Szerencsejáték", `A Mostani számod: ${sum}`);
                embed.addBlankField();

                if(sum == 1) embed.addField("Szerencséd:", "Nagyon balszerencsés voltál.");
                else if(sum < 3) embed.addField("Szerencséd:", "Balszerencsés voltál.");
                else if(sum < 5) embed.addField("Szerencséd:", "Átlagos.");
                else if(sum == 5) embed.addField("Szerencséd:", "Szerencsés voltál.");
                else embed.addField("Szerencséd:", "Nagyon szerencsés voltál.");

                message.channel.send(embed);
            }
            if (message.content.startsWith(`${prefix}ban`)) { // ban parancs 
                if (!message.member.hasPermission("BAN_MEMBERS"))
                  return message.reply("Nincs jogod hogy használd ez a parancsot!");
                const args = message.content.slice(prefix.length).split(" ");
                const user = message.mentions.users.first();
                if (user) {
                  const member = message.guild.member(user);
                  if (member) {
                    let reason = args.slice(2).join(" ");
                    if (!reason) reason = "**Kérlek adj meg egy indokot!**";
                    member
                      .ban({
                      })
                      .then(() => {
                        message.reply(`**A Felhasználó ${user.tag} sikeresen ki lett tiltva a szerverről**`);
                      })
                      .catch(err => {
                        message.reply("**Nem sikerült kitiltani a felhasználót.**Kérlek probáld újra. Ha nem sikerült akkor keresd fel a fejlesztőt: iTzQuitfeter988#8386");
                        console.error(err);
                      });
                  } else {
                    let embed = new discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle("Ban")
                    .setDescription("**Nem találok ilyen nevű felhasználót!**")
                    .setTimestamp()
                    .setFooter(`${client.user.username} | ban` , client.user.displayAvatarURL)
                    message.channel.send(embed)
                    }
                  
                } else {
                  let embed = new discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle("Ban")
                .setDescription("**Nem jelöltél meg senkit. Kérlek probáld újra!**")
                .setTimestamp()
                .setFooter(`${client.user.username} | ban` , client.user.displayAvatarURL)
                message.channel.send(embed)
                }
              }
              if(message.content.startsWith(prefix + "ahelp")) {
                let embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle("Administrator parancsok")
                .addField("ban", `Kitiltja a felhasználót!`)
                .addField("report", `Figyelmezteti a felhasználót!`)
                .setThumbnail(message.author.avatarURL)
                .setFooter(`${client.user.username} | admin-help`, client.user.displayAvatarURL)
                .setTimestamp();
                message.channel.send(embed)
              }
        
});
client.login(token) // bizots van command handler ed? - 
