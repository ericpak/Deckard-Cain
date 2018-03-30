const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // Permission Check
  let allowedRole = message.guild.roles.find("name", "D3Mod");
  if(!allowedRole || !message.member.roles.has(allowedRole.id))
    return message.channel.send("You don't have premissions to change the settings! Must have a D3Mod role!!");

  var settings = bot.settings.get(message.guild.id);
  var start;
  var end;
  var to = false;
  var range = 15;

  // Argument Check
  if(args.length <= 0)
    return message.channel.send("Don't forget to type in the default settings you'd like to use. i.e. "+settings.prefix+"settings dm monk hc eu");

  // Argument Switch statement loop
  while(args.length > 0){
    let argument = args.splice(0,1);
    if(!isNaN(Number(argument))){
      if(start === undefined){
        start = Number(argument)-1;
      } else if(end === undefined && to){
        end = Number(argument);
      }
    } else {
      to = false;
      if(argument == "to" && start != undefined){
        to = true;
      }
      switch(String(argument)){
        case "dm":
          settings.dm = true;
          bot.settings.set(message.guild.id, settings);
          break;
        case "public":
          settings.dm = false;
          bot.settings.set(message.guild.id, settings);
          break;
        case "hc":
        case "hard":
        case "hardcore":
          settings.hardcore = "hardcore-";
          bot.settings.set(message.guild.id, settings);
          break;
        case "sc":
        case "soft":
        case "softcore":
          settings.hardcore = "";
          bot.settings.set(message.guild.id, settings);
          break;
        case "barb":
        case "barbarian":
          settings.heroClass = "barbarian";
          settings.classIcon = "barbarian";
          bot.settings.set(message.guild.id, settings);
          break;
        case "cru":
        case "sader":
        case "crusader":
          settings.heroClass = "crusader";
          settings.classIcon = "x1_crusader";
          bot.settings.set(message.guild.id, settings);
          break;
        case "dh":
        case "demon":
        case "demonhunter":
          settings.heroClass = "dh";
          settings.classIcon = "demonhunter";
          bot.settings.set(message.guild.id, settings);
          break;
        case "monk":
          settings.heroClass = "monk";
          settings.classIcon = "monk";
          bot.settings.set(message.guild.id, settings);
          break;
        case "wd":
        case "witch":
        case "witchdoctor":
          settings.heroClass = "wd";
          settings.classIcon = "witchdoctor";
          bot.settings.set(message.guild.id, settings);
          break;
        case "wiz":
        case "wizard":
          settings.heroClass = "wizard";
          settings.classIcon = "wizard";
          bot.settings.set(message.guild.id, settings);
          break;
        case "nec":
        case "necro":
        case "necromancer":
          settings.heroClass = "necromancer";
          settings.classIcon = "p6_necro";
          bot.settings.set(message.guild.id, settings);
          break;
        case "t2":
        case "team2":
          settings.heroClass = "team-2";
          bot.settings.set(message.guild.id, settings);
          break;
        case "t3":
        case "team3":
          settings.heroClass = "team-3";
          bot.settings.set(message.guild.id, settings);
          break;
        case "t4":
        case "team4":
          settings.heroClass = "team-4";
          bot.settings.set(message.guild.id, settings);
          break;
        case "ns":
        case "era":
        case "nonseasonal":
          settings.seasonal = false;
          bot.settings.set(message.guild.id, settings);
          break;
        case "season":
        case "seasonal":
          settings.seasonal = true;
          bot.settings.set(message.guild.id, settings);
          break;
        case "us":
          settings.region = "us";
          bot.settings.set(message.guild.id, settings);
          break;
        case "eu":
          settings.region = "eu";
          bot.settings.set(message.guild.id, settings);
          break;
        case "kr":
          settings.region = "kr";
          bot.settings.set(message.guild.id, settings);
          break;
        case "tw":
          settings.region = "tw";
          bot.settings.set(message.guild.id, settings);
          break;
      }
    }
  }

  if(start < 0 || start > 999){
    message.channel.send("Rank must be between 1 and 1000! Rank set to 1");
    start = 0;
  }
  if(end < start || end > 1000)
    end = start+1;
  else if(end > start + range){
    end = start+range;
    message.channel.send("Range must be "+range+" or less. New range set to "+(start+1)+" to "+end);
  }
  settings.start = start;
  settings.end = end;
  bot.settings.set(message.guild.id, settings);

  message.channel.send("Settings have been set!");
}

module.exports.help = {
  name: "settings",
  arguments: "[rank[to <rank>]] [dm|public] [region] [ladder] [hc|hardcore] [season|seasonal|ns|era|nonseasonal]"
}
