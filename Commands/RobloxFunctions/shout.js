const Discord = require('discord.js');
const RobloxFunctions = require('noblox.js');


const ClientSettings = require("../../Client/ClientSettings.json");
var GroupID = ClientSettings.Database.GroupID
var HighestRank = ClientSettings.Database.HighestRankID

module.exports = class test {
    constructor(){
            this.name = '☑️  Shout - RobloxFunctions/shout.js'
            this.alias = ['shout']
            
}


async run(Client, message, args) {
    const ShoutMessage = args.slice(1).join(" ");
    //const GeneralLogsChannel = message.guild.channels.find(ch => ch.id === ClientSettings.Channels.GeneralLogs);
    const ServerID = message.guild.id
    const MessageAuthor = message.author
    const Prefix = ClientSettings.Prefix
    const Command = "shout"
    const Action = "User has updated shout"

    const PermissionError = new Discord.RichEmbed()
    .setAuthor(`Permission Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`You don't have the valid permissions to shout. Is this incorrect? Then contact <@482240843126669342>.`);

    const ArgsError = new Discord.RichEmbed()
    .setAuthor(`Args Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`You didn't provide me with a message to shout. Please use \`${ClientSettings.Prefix}shout <message> \`.`);

    const ProcessingRequest = new Discord.RichEmbed()
    .setAuthor(`Processing request`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ProcessingColor)
    .setDescription(`I'm processing your request. Please wait`);

    const ProcessingError = new Discord.RichEmbed()
    .setAuthor(`Processing Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`Request canceld due to error.`);

    const ProcessingSucces = new Discord.RichEmbed()
    .setAuthor(`Sucess`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.SucessColor)
    .setDescription(`Sucess`);

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

    if(!ShoutMessage){
        return message.channel.send(ArgsError)
    }
    await message.channel.send(ProcessingRequest) 
    await RobloxFunctions.shout(GroupID, ShoutMessage).catch(console.error)
    
    if(console.error){
        message.channel.send(ProcessingError)
        Client.channels.get(ClientSettings.Channels.GeneralLogs).send(ProcessinglogError)
    }else{
        message.channel.send(ProcessingSucces)
        Client.channels.get(ClientSettings.Channels.GeneralLogs).send(ProcessingLog)
    } 
    
   
    



}}


