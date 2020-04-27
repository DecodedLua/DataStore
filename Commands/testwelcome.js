const Discord = require('discord.js');
const RobloxFunctions = require('noblox.js');


const ClientSettings = require("../Client/ClientSettings.json");

module.exports = class test {
    constructor(){
            this.name = '☑️  welcome - //'
            this.alias = ['welcome']
            
}


async run(Client, message, args) {
    const ServerIcon = message.guild.iconURL
    const ServerName = message.guild.name
    const ServerDescription = `
    
    🎖️ Welcome to Bristo Bakery :doughnut:,

    **"Baking the difference." 🍩**

    We continue to innovate and create new features or products every day!
    Here at Bristo, everyone gets the opportunity to make the best experience that they will make, by giving them the chance to get a career.
    Our bakery has varieties of much great baked pastries waiting for our future staff to bake!
    
    We still are re-making a lot of things including the development. 🍦
    
    :envelope: Be sure to read our rules & guidelines. Enjoy
    `
    const JoinedUserDM = new Discord.RichEmbed()
    .setAuthor(ServerName, ServerIcon)
    .setColor(ClientSettings.DefaultColor)
    .setDescription(ServerDescription)
    .setThumbnail(ServerIcon)
    .setImage("https://imgur.com/t7DTxQL.png")
    .setFooter(ClientSettings.Footer)
    .setTimestamp();
    message.channel.send(JoinedUserDM)
}}


