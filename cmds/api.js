const snekfetch = require("snekfetch");
const Discord = require("discord.js");
const config = require("../config.json");

var apiSettings = {
  region: "us",
  type: "data",
};
// Game data
// https://<region>.api.battle.net/data/<game>/document/path?access_token=<token>
// Specific user
// https://<region>.api.battle.net/profile/<user_id>/<game>/document/path?access_token=<token>
var api = "https://"+apiSettings.region+".api.battle.net/"+apiSettings.type+"/d3/season/13/leaderboard/rift-crusader?namespace=2-6-US&access_token="+config.blizzToken;

module.exports.run = async (bot, message, args) => {
  snekfetch.get(api).then(r => {
    let body = r.body;
    let id = Number(args[0]);
    if(!id) return message.channel.send("Supply an ID!");
    if(isNaN(id)) return message.channel.send("Supply a valid number!");

    let entry = body.find(post => post.id === id);
    if(!entry) return message.channel.send("This entry does not exist!");

    let embed = new Discord.RichEmbed()
      .setAuthor(entry.title)
      .setDescription(entry.body)
      .addField("Author ID", entry.userId)
      .setFooter("Post ID: " + entry.id);

    message.channel.send({embed: embed});
    });
}

module.exports.help = {
  name: "api"
}
