const Discord = require('discord.js');
const RobloxFunctions = require('noblox.js');
const Axios = require('axios');


const ClientSettings = require("../../Client/ClientSettings.json");
const ScriptToken = "AKfycbzYnwMgVAnKUqh0FTqhBEBoDx37pUJ1HMn5janF06Y9ULqc6zxs" + "/exec"

module.exports = class test {
    constructor(){
            this.name = '☑️  Gameban - Moderation/gameban.js'
            this.alias = ['gameban']
            
}


async run(Client, message, args) {

    const ProcessinglogError = new Discord.RichEmbed()
    .setAuthor(`Process Error`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.ErrorColor)
    .setDescription(`Your process has ended due to an error!`);


    var RobloxID
    var RobloxName

Axios.get(`http://api.roblox.com/users/get-by-username?username=${args[1]}`).then(function (response){
    if(response.data.status == "error"){
         message.channel.send(ProcessinglogError)
    }

    RobloxID = response.data.Id
    RobloxName = response.data.Username

    const UserProfile = `https://www.roblox.com/users/${RobloxID}/profile`
    const Success = new Discord.RichEmbed()
    .setAuthor(`User banned.`, `https://imgur.com/g6q6bOS.png`)
    .setColor(ClientSettings.DefaultColor)
    .setDescription(`[${RobloxName}](${UserProfile}) has been gamebanned!`);

    Axios.post("https://script.google.com/macros/s/" + ScriptToken + "?sheet=Global&key=" + RobloxID + "&value=" + true, {});
    message.channel.send(Success)
})

}}