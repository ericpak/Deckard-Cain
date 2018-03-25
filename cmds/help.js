const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
  let cmds = "";
  let array = bot.commands.array();
  array.forEach(function(item, index, array) {
    cmds += config.prefix + item.help.name + "\n";
  });
  message.channel.send("Available commands are:");
  message.channel.send(cmds);
}

module.exports.help = {
  name: "help"
}
