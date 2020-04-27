const Discord = require('discord.js');
const RobloxFunctions = require('noblox.js');
const Axios = require('axios');


const ClientSettings = require("../../Client/ClientSettings.json");
var GroupID = ClientSettings.Database.GroupID
var HighestRank = ClientSettings.Database.HighestRankID

module.exports = class test {
    constructor(){
            this.name = '☑️  Setrank - RobloxFunctions/setrank.js'
            this.alias = ['setrank']
            
}


async run(Client, message, args) {

    const ID = args[2]
    const User = message.mentions.users.first();
    const ServerID = message.guild.id
    const MessageAuthor = message.author
    const Prefix = ClientSettings.Prefix
    const Command = "demote"
    const Action = `User has demoted ${User}`

    const PermissionError = new Discord.RichEmbed()
    .setAuthor(`Permission Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`You don't have the valid permissions to shout. Is this incorrect? Then contact <@482240843126669342>.`);

    const ArgsError = new Discord.RichEmbed()
    .setAuthor(`Args Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`Please tag the user.`);
    
    const ProcessingRequest = new Discord.RichEmbed()
    .setAuthor(`Processing request`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ProcessingColor)
    .setDescription(`I'm processing your request. Please wait`);

    const ProcessingError = new Discord.RichEmbed()
    .setAuthor(`Processing Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`Request canceld due to error.`);

    const UsernameError = new Discord.RichEmbed()
    .setAuthor(`Username Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`The user ${UserName} or ${MessageAuthor} does not exist.`);

    const ProcessingSucces = new Discord.RichEmbed()
    .setAuthor(`Request accepted`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.SucessColor)
    .setDescription(`I've cleared your message!`);

    const ProcessinglogError = new Discord.RichEmbed()
    .setAuthor(`Error action logged`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`User: ${message.author}\nCommand:\`${ClientSettings.Prefix}${Command}\`\nAction: User tried to use ${Command} but turned error.\nChannel: ${message.channel}\nTime: ${message.createdAt}`);

    const ProcessingLog = new Discord.RichEmbed()
    .setAuthor(`Action logged`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.DefaultColor)
    .setDescription(`User: ${message.author}\nCommand:\`${ClientSettings.Prefix}${Command}\`\nAction: ${Action} \nChannel: ${message.channel}\nTime: ${message.createdAt}`);


    if(!message.member.roles.some(Roles => [ClientSettings.Permissions.SHR,ClientSettings.Permissions.HR].includes(Roles.id)))
    return message.channel.send(PermissionError);

    if(!UserName){
        return message.channel.send(ArgsError)
    }

    var RobloxID;
    var DiscordID
    if (User) {
        const member = message.guild.member(User);
        DiscordID = member.id
    } 
           
Axios.get(`https://verify.eryn.io/api/user/${DiscordID}`).then(function (response){
       if(response.data.status == "error"){
            message.channel.send(ProcessinglogError)
}
                        RobloxID = response.data.robloxId
                        message.channel.send(ProcessingRequest)

                        const RankError = new Discord.RichEmbed()
    .setAuthor(`Rank Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`The user has a higher role then me. I can't ${Command} the user!`);


RobloxFunctions.getRankInGroup(GroupID, RobloxID).then(function(Rank){
    if(HighestRank <= Rank){
        return message.channel.send(RankError);
    }else{
        RobloxFunctions.setrank(GroupID, RobloxID, ID).then(function(NewRank){
             message.channel.send(ProcessingSucces)
             Client.channels.get(ClientSettings.Channels.GeneralLogs).send(ProcessingLog)
        })
    }
})
                    
})






}}


