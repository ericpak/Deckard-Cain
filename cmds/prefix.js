const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
  // Permission Chck
  let allowedRole = message.guild.roles.find("name", "Admin");
  if(!allowedRole || !message.member.roles.has(allowedRole.id))
    return message.channel.send("You Shall Not Pass!! Only the Admin role can change the prefix!!");

  var settings = bot.settings.get(message.guild.id);
  
  if(args[0] === settings.prefix && args[1] === "to" && args[2]){
    settings.prefix = args[2];
    bot.settings.set(message.guild.id, settings);
    message.channel.send("Prefix changed to \""+settings.prefix+"\"");
  } else {
    message.channel.send("To change the prefix please use the following format: \""+settings.prefix+"prefix <old prefix> to <new prefix>\"");
  }
}

module.exports.help = {
  name: "prefix",
  arguments: ""
}
