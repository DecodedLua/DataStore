const Discord = require('discord.js');
const RobloxFunctions = require('noblox.js');


const ClientSettings = require("../../Client/ClientSettings.json");
module.exports = class test {
    constructor(){
            this.name = '☑️  Login - //'
            this.alias = ['login']
            
}


async run(Client, message, args) {

    const filter = m => m.content.includes('NHLE-L6MI-4GE4-ETEV');
    const collector = message.channel.createMessageCollector(filter, { time: 15000 });

    const Success = new Discord.RichEmbed()
    .setAuthor(`Your login`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.SucessColor)
    .setDescription(`Login to the application [Login](https://discordapp.com/oauth2/authorize?client_id=701118239853510759&redirect_uri=https%3A%2F%2Fbristobakeryrblx.herokuapp.com%2Foauth%2F_r7msck7nfz%2Fcallback&response_type=code&scope=identify+email&state=https%3A%2F%2Fbristobakeryrblx.herokuapp.com%7CAsAqiGv1N1D92ljDHnh0arTjretkCd4j7F1qGw1CTYN6UXQB)`);

    const Default = new Discord.RichEmbed()
    .setAuthor(`BBakery Auth`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.DefaultColor)
    .setDescription(`Please enter your given login-key!`);

    const PermissionError = new Discord.RichEmbed()
    .setAuthor(`Permission error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`You don't have the set of roles for this command!`);

    const Processing = new Discord.RichEmbed()
    .setAuthor(`Processing Request`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ProcessingColor)
    .setDescription(`You have been dmed your login key.`);


    if (!message.member.roles.some(r => [ClientSettings.Permissions.SHR,ClientSettings.Permissions.HR].includes(r.id)))
    return message.channel.send(PermissionError);
message.channel.send(Default).then(
    collector.on('collect', m => {
        m.delete()
        message.channel.send(Processing)
        message.author.send(Success)
    })
    
)

}}


