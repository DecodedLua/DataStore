const Discord = require('discord.js');
const RobloxFunctions = require('noblox.js');
const Axios = require('axios');

const talkedRecently = new Set();

const ClientSettings = require("../../Client/ClientSettings.json");
var GroupID = ClientSettings.Database.GroupID
var HighestRank = ClientSettings.Database.HighestRankID

module.exports = class test {
    constructor(){
            this.name = '☑️  Host - ServerHosting/host.js'
            this.alias = ['host']
            
}


async run(Client, message, args) {
    const ServerID = message.guild.id
    const MessageAuthor = message.author
    const Prefix = ClientSettings.Prefix
    const Command = "host"
    const Action = "User has chosen a session"

    var RobloxID
    var RobloxUsername
    var Session
      await  Axios.get(`https://verify.eryn.io/api/user/${message.author.id}`).then(function (response){
           if(response.data.status == "error"){
                message.channel.send(ProcessError)
    }
        RobloxID = response.data.robloxId
        RobloxUsername = response.data.robloxUsername
    })
    
    const PermissionError = new Discord.RichEmbed()
    .setAuthor(`Permission Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`You don't have the correct set of roles to start a session!`);

    const ProcessError = new Discord.RichEmbed()
    .setAuthor(`Process Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`Your process has ended, please try again. (possible time outage or you didn't respond with confirm)`);

    const Choose = new Discord.RichEmbed()
    .setAuthor(`Choose your event`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ProcessingColor)
    .setDescription(`Select any event. \`shift\` \`grp\``)

    const RequestingProcess = new Discord.RichEmbed()
    .setAuthor(`Requesting process`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ProcessingColor)
    .setDescription(`Please wait while I fetch your data.`)

    const ActiveCooldown = new Discord.RichEmbed()
    .setAuthor(`Active Cooldown`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ProcessingColor)
    .setDescription(`You are on a 10 min cooldown!`)



    if (!message.member.roles.some(r => [ClientSettings.Permissions.SHR].includes(r.id)))
    return message.channel.send(PermissionError);

const ShiftFilter = m => m.content.includes('shift');
const GRPFilter = m => m.content.includes('grp');

const ShiftCollector = message.channel.createMessageCollector(ShiftFilter, { time: 15000 });
const GRPCollector = message.channel.createMessageCollector(GRPFilter, { time: 15000 });

if (talkedRecently.has(message.author.id)) {
    message.channel.send(ActiveCooldown);
    return;
  }



message.channel.send(Choose).then(
  ShiftCollector.on('collect', m => {
    console.log("Shift Selected")
    const ProcessingLog = new Discord.RichEmbed()
    .setAuthor(`Action logged`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.DefaultColor)
    .setDescription(`User: ${message.author}\nCommand:\`${ClientSettings.Prefix}${Command}\`\nAction: ${Action} \nChannel: ${message.channel}\nTime: ${message.createdAt}`);

    const ShiftSession = new Discord.RichEmbed()
    .setAuthor(`BBakery Shift`, `https://cdn.discordapp.com/emojis/701723914791026728.gif`)
    .setColor(ClientSettings.DefaultColor)
    .setImage("https://imgur.com/nz91ZXy.png")
    .setDescription(`
    
    **#ROADTO600 | Bristo Bakery**
    
    Greetings mebers of BB, Our staff are hosting a shift at our bakery! Get baking (:, 
    Start joining the bakery and have fun.
    
    [Bristo Bakery](https://www.roblox.com/games/4797244072/Work-at-a-Bakery-BETA?refPageId=e3f3f5f5-996d-4a7b-8f0a-47dfc4fdb9ee)
    [Host Profile](https://www.roblox.com/users/${RobloxID}/profile)
    
    
    
    `)
    .setTimestamp()
    .setFooter(`Hosted by ${RobloxUsername}`);

    const ProcessSuccess = new Discord.RichEmbed()
    .setAuthor(`Shift Started`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.SucessColor)
    .setDescription(`Your session has started.`);

    message.channel.send(RequestingProcess).then(Client.channels.get(ClientSettings.Channels.SessionLogs).send("@Session Pings")).then(Client.channels.get(ClientSettings.Channels.SessionLogs).send(ShiftSession)).then(Client.channels.get(ClientSettings.Channels.GeneralLogs).send(ProcessingLog))
    message.channel.send(ProcessSuccess)

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 600000);
  }),


  GRPCollector.on('collect', m => {
    console.log("Shift Selected")
    const ProcessingLog = new Discord.RichEmbed()
    .setAuthor(`Action logged`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.DefaultColor)
    .setDescription(`User: ${message.author}\nCommand:\`${ClientSettings.Prefix}${Command}\`\nAction: ${Action} \nChannel: ${message.channel}\nTime: ${message.createdAt}`);

    const ShiftSession = new Discord.RichEmbed()
    .setAuthor(`BBakery GRP Session`, `https://cdn.discordapp.com/emojis/701723914791026728.gif`)
    .setColor(ClientSettings.DefaultColor)
    .setImage("https://imgur.com/ssD340K.png")
    .setDescription(`
    
    **#ROADTO600 | Bristo Bakery**
    
    Greetings mebers of BB, Our staff are attending a GRP Session!
    Help us recruit!
    
    [GRP](https://www.roblox.com/games/6194809/Group-Recruiting-Plaza-4-5?refPageId=1f74a264-ea57-4687-bb9c-e539f45062c2)
    [Host Profile](https://www.roblox.com/users/${RobloxID}/profile)
    
    
    
    `)
    .setTimestamp()
    .setFooter(`Hosted by ${RobloxUsername}`);

    const ProcessSuccess = new Discord.RichEmbed()
    .setAuthor(`GRP Started`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.SucessColor)
    .setDescription(`Your session has started.`);

    message.channel.send(RequestingProcess).then(Client.channels.get(ClientSettings.Channels.SessionLogs).send("@Session Pings")).then(Client.channels.get(ClientSettings.Channels.SessionLogs).send(ShiftSession)).then(Client.channels.get(ClientSettings.Channels.GeneralLogs).send(ProcessingLog))
    message.channel.send(ProcessSuccess)

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 600000);
  })

)



}}