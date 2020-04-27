const Discord = require('discord.js');
const RobloxFunctions = require('noblox.js');
const Axios = require('axios');

const ClientSettings = require("../../Client/ClientSettings.json");
var GroupID = ClientSettings.Database.GroupID
var HighestRank = ClientSettings.Database.HighestRankID


module.exports = class test {
    constructor(){
            this.name = '☑️  Getroles - Verification/getroles.js'
            this.alias = ['getroles']
            
}


async run(Client, message, args) {

var UserID
Axios.get(`https://verify.eryn.io/api/user/${message.author.id}`).then(function (response){
        if(response.data.status == "error"){
             message.channel.send("Error")
 }
                         UserID = response.data.robloxId
})
RobloxFunctions.getRankInGroup(GroupID, UserID).then(FoundRank => {
RobloxFunctions.getRankNameInGroup(GroupID, UserID).then(RankName => {

let DiscordRole = message.guild.roles.find(r => r.name === RankName).then(message.member.roles.add(DiscordRole))

const UserProfile = new Discord.RichEmbed()
.setAuthor(`BBakery Verification`, `https://imgur.com/g6q6bOS.png`)
.setColor(ClientSettings.SucessColor)
.setDescription(`${DataBase.username} has been updated with the following information.`)
.addField("Username", DataBase.username, true)
.addField("ID", UserID, true)
.addField("Added roles", RankName)

message.channel.send(UserProfile)
})
})
}}
