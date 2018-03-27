const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
  if(!args[0]){
    let cmds = "";
    let array = bot.commands.array();
    array.forEach(function(item, index, array) {
      cmds += config.prefix + item.help.name + " " + item.help.arguments +"\n";
    });
    message.channel.send("```Available commands are:\n\n"+cmds+"\nType !help <command> for more details```");
  } else {
    switch(args[0]){
      case "avatar": message.channel.send("Type !avatar with no argument to display your own avatar or tag someone else to display their avatar."); break;
      case "grift": message.channel.send("```Default arguments are:\n!grift Us Seasonal Softcore Barbarian 1 to 10\n\nType an argument to override any of the defaults. i.e. !grift monk is short for\n!grift Us Seasonal Softcore Monk 1 to 10.\n\nType a # to view a single result or # to # for a range. i.e. !grift 300 will display only rank 300 but !grift 300 to 305 will display the range of 300 to 305\n\n Available arguments are:\n<#[to #]> <eu/kr/tw> <hc/hardcore> <barb/barbarian/cru/sader/crusader/dh/demon/demonhunter/monk/wd/witch/witchdoctor/wiz/wizard/nec/necro/necromancer/t2/team2/t3/team3/t4/team4> <ns/era/nonseasonal>```"); break;
      case "speak": message.channel.send("Stay awhile and listen!"); break;
    }
  }
}

module.exports.help = {
  name: "help",
  arguments: ""
}
