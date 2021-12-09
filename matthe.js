// Sorununz olursa Matthe#0001 ulaşınız. https://discord.gg/vAKkqEqgfE

const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const moment = require("moment")//Matthe#0001
const fs = require("fs")
const db = require("quick.db")
const chalk = require("chalk")
require('./util/Loader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`)//Youtube Matthe
  files.forEach(f => {                    
    let props = require(`./commands/${f}`)
    console.log(`${props.config.name} komutu yüklendi.`)
    client.commands.set(props.config.name, props)
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name)
    });
  });
})

client.on('message', async message => {
  
  if(message.content === '.tag') {
    message.channel.send(`\`${ayarlar.tag}\``)//Youtube Matthe
  }
  })

client.on("ready", () => {
    console.log(chalk.redBright(`tm`))
})

client.on("guildMemberAdd", async (member) => {
  let mattheSayılar = {
    "0": `${ayarlar.sifirEmoji}`,
    "1": `${ayarlar.birEmoji}`,
    "2": `${ayarlar.ikiEmoji}`,
    "3": `${ayarlar.ucEmoji}`,
    "4": `${ayarlar.dortEmoji}`,
    "5": `${ayarlar.besEmoji}`,
    "6": `${ayarlar.altiEmoji}`,
    "7": `${ayarlar.yediEmoji}`,
    "8": `${ayarlar.sekizEmoji}`,
    "9": `${ayarlar.dokuzEmoji}`//Youtube Matthe
}

const mattheKanal = client.channels.cache.get(ayarlar.hosgeldinKanal)
let mattheMember = member.user
let mattheZaman = new Date().getTime() - mattheMember.createdAt.getTime()
const matthe = `Ve senin hesabın sunucumuza kayıt olmak için tüm şartları karşılıyor! ${client.emojis.cache.get(ayarlar.yes)}`//Youtube Matthe
if(mattheZaman < 1296000000) {
  matthe = `Ve senin hesabın sunucumuza kayıt olmak için daha çok genç! ${client.emojis.cache.get(ayarlar.no)}`//Youtube Matthe
}
  
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)//Youtube Matthe

member.setNickname(`${ayarlar.tag} İsim ${ayarlar.sembol} Yaş`)
mattheKanal.send(`
Sunucumuza hoş geldin, ${member}! Sayende sunucumuz ${member.guild.memberCount.toString().split("").map(a => client.emojis.cache.get(mattheSayılar[a])).join("")} kişi.

Sunucumuza kayıt olmak için soldaki ses kanallarından birine girmelisin!

Ayrıca hesabın 15 günden fazla bir süredir Discord'da bulunmalı.

${matthe}

Ceza işlemlerin <#${ayarlar.rulesKanal}> kanalını okuduğun varsayılarak uygulanır. ( <@&${ayarlar.hosgeldinMesajYetkili}> )
`)
  
})

client.login(process.env.TOKEN)

client.on("ready", () => {
  client.channels.cache.get(ayarlar.botSesKanal).join();
  });
//Youtube Matthe
//----------------------------------------------------- TAG ROL ------------------------------------------------\\

// tag rol kodu bana ait değildir, geliştirip sizlere sundum.
client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = "849241181489594418"// sunucu ıd
    const roleID = "849241181531275283"// taglı rolünüzün ıd
    const tag = "Wârn"// tagınız
    const chat = '849241182122016787'// chat kanalı ıd
    const taglog = '849241182839898134' // log kanalı ıd
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0010').setTimestamp().setFooter('Zeus ❤️ Wârn');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı çıkardığı için taglı rolü alındı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`**Mükemmel! ${newUser} Tagımızı alarak ailemize katıldı!**`)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı aldığı için taglı rolü verildi!`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "1907" && newUser.discriminator !== "1907") {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı çıkardığı için taglı rolü alındı!`))
        } else if (oldUser.discriminator !== "1907" && newUser.discriminator == "1907") {
            member.roles.add(roleID)-
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı aldığı için taglı rolü verildi!`))
            client.channels.cache.get(chat).send(`**Mükemmel! ${newUser} Etiket tagımızı alarak ailemize katıldı!**`)
        }
    }
  
  })

//----------------------------------------------------- TAG ROL ------------------------------------------------\\