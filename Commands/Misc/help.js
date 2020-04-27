const Discord = require('discord.js');
const RobloxFunctions = require('noblox.js');


const ClientSettings = require("../../Client/ClientSettings.json");
module.exports = class test {
    constructor(){
            this.name = '☑️  Help - Misc/help.js'
            this.alias = ['help']
            
}


async run(Client, message, args) {

    const filter = m => m.content.includes('NHLE-L6MI-4GE4-ETEV');
    const collector = message.channel.createMessageCollector(filter, { time: 15000 });

    const Success = new Discord.RichEmbed()
    .setAuthor(`Need help?`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.SucessColor)
    .setDescription(`I cannot provide you with a list yet! Come see back later`);

  message.channel.send(Success)
}}


