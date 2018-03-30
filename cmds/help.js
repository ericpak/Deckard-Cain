const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
  if(!args[0]){
    let cmds = "";
    let array = bot.commands.array();
    array.forEach(function(item, index, array) {
      cmds += config.prefix + item.help.name + " " + item.help.arguments +"\n";
    });
    message.author.send("```Available commands are:\n[] = optional\n\n"+cmds+"\nType !help <command> for more details```");
  } else {
    var settings = bot.settings.get(message.guild.id);
    switch(args[0]){
      case "avatar": message.author.send("```Type !avatar with no argument to display your own avatar or tag someone else to display their avatar.```"); break;
      case "grift": message.author.send("```To view the default arguments type \""+settings.prefix+"grift view defaults\".\n\nAdding \"dm\" will send a Direct Message and \"public\" will send the message into the channel typed.\n\nAdd a # to view a single result or \"# to #\" for a range. i.e. \""+settings.prefix+"grift 300\" will display only rank 300 but \""+settings.prefix+"grift 300 to 305\" will display the range of 300 to 305\n\n Available arguments are:\n<dm|public> <#[to #]> <us|eu|kr|tw> <sc|soft|softcore|hc|hard|hardcore> <barb|barbarian|cru|sader|crusader|dh|demon|demonhunter|monk|wd|witch|witchdoctor|wiz|wizard|nec|necro|necromancer|t2|team2|t3|team3|t4|team4> <season|seasonal|ns|era|nonseasonal>```"); break;
      case "speak": message.author.send("```Stay awhile and listen!```"); break;
      case "settings": message.author.send("```Default settings can be changed if you have the D3Mod role. To change the default settings type in the desired arguments.\n\nAvailable arguments are:\n<dm|public> <us|eu|kr|tw> <sc|soft|softcore|hc|hard|hardcore> <barb|barbarian|cru|sader|crusader|dh|demon|demonhunter|monk|wd|witch|witchdoctor|wiz|wizard|nec|necro|necromancer|t2|team2|t3|team3|t4|team4> <season|seasonal|ns|era|nonseasonal>```"); break;
    }
  }
}

module.exports.help = {
  name: "help",
  arguments: ""
}
