const Discord = require('discord.js');
const RobloxFunctions = require('noblox.js');


const ClientSettings = require("../Client/ClientSettings.json");

module.exports = class test {
    constructor(){
            this.name = '☑️  test - //'
            this.alias = ['test']
            
}


async run(Client, message, args) {
    const Success = new Discord.RichEmbed()
    .setAuthor(`Sucess`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.SucessColor)
    .setDescription(`Sucess`);

    const Default = new Discord.RichEmbed()
    .setAuthor(`Default`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.DefaultColor)
    .setDescription(`Default`);

    const Error = new Discord.RichEmbed()
    .setAuthor(`Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`Error`);

    const Processing = new Discord.RichEmbed()
    .setAuthor(`Processing`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ProcessingColor)
    .setDescription(`Processing`);




    message.channel.send(Success)
    message.channel.send(Default)
    message.channel.send(Error)
    message.channel.send(Processing)
}}


