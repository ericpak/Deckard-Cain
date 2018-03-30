const snekfetch = require("snekfetch");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("Getting data...");

  // Defaults
  var start;
  var end;
  var color = "RED";
  var to = false;
  var range = 15;

  // grift Default variables
  var settings = bot.settings.get(message.guild.id);
  var dm = settings.dm;
  var region = settings.region;
  var type = settings.type;
  var season = settings.currentSeason;
  var hardcore = settings.hardcore;
  var heroClass = settings.heroClass;
  var classIcon = settings.classIcon;
  var title = settings.heroClass.charAt(0).toUpperCase()+settings.heroClass.slice(1);
  var seasonal = settings.seasonal;

  if(args[0] === "view" && args[1] === "defaults")
    return message.channel.send(settings.prefix+"grift "+(dm ? "dm" : "public")+" "+region+" "+hardcore+heroClass+" "+(settings.start+1)+" to "+settings.end);

  // Argument Switch statement loop
  while(args.length > 0){
    let argument = args.splice(0,1);

    if(!isNaN(Number(argument))){
      if(start === undefined){
        start = Number(argument)-1;
        if(start < 0 || start > 999)
          return message.channel.send("Rank must be between 1 and 1000!");
      } else if(end === undefined && to){
        end = Number(argument);
        if(end < start || end > 1000)
          end = start+1;
        else if(end > start + range){
          end = start+range;
          message.channel.send("Range must be "+range+" or less. New range set to "+(start+1)+" to "+end);
        }
      }
    } else {
      to = false;
      if(argument == "to" && start != undefined)
        to = true;
      switch(String(argument)){
        case "dm":
          dm = true;
          break;
        case "public":
          dm = false;
          break;
        case "hc":
        case "hard":
        case "hardcore":
          hardcore = "hardcore-";
          break;
        case "sc":
        case "soft":
        case "softcore":
          hardcore = "";
          break;
        case "barb":
        case "barbarian":
          heroClass = "barbarian";
          classIcon = "barbarian";
          title = "Barbarian";
          color = "RED";
          break;
        case "cru":
        case "sader":
        case "crusader":
          heroClass = "crusader";
          classIcon = "x1_crusader";
          title = "Crusader";
          color = "RED";
          break;
        case "dh":
        case "demon":
        case "demonhunter":
          heroClass = "dh";
          classIcon = "demonhunter";
          title = "Demon Hunter";
          color = "GREEN";
          break;
        case "monk":
          heroClass = "monk";
          classIcon = "monk";
          title = "Monk";
          color = "GREEN";
          break;
        case "wd":
        case "witch":
        case "witchdoctor":
          heroClass = "wd";
          classIcon = "witchdoctor";
          title = "Witch Doctor";
          color = "GOLD";
          break;
        case "wiz":
        case "wizard":
          heroClass = "wizard";
          classIcon = "wizard";
          title = "Wizard";
          color = "GOLD";
          break;
        case "nec":
        case "necro":
        case "necromancer":
          heroClass = "necromancer";
          classIcon = "p6_necro";
          title = "Necromancer";
          color = "GOLD";
          break;
        case "t2":
        case "team2":
          heroClass = "team-2";
          title = "Team 2";
          color = "BLUE";
          break;
        case "t3":
        case "team3":
          heroClass = "team-3";
          title = "Team 3";
          color = "BLUE";
          break;
        case "t4":
        case "team4":
          heroClass = "team-4";
          title = "Team 4";
          color = "BLUE";
          break;
        case "ns":
        case "era":
        case "nonseasonal":
          seasonal = false;
          break;
        case "season":
        case "seasonal":
          seasonal = true;
          break;
        case "us": region = "us"; break;
        case "eu": region = "eu"; break;
        case "kr": region = "kr"; break;
        case "tw": region = "tw"; break;
      }
    }
  }

  if(start === undefined){
    start = settings.start;
    end = settings.end;
  } else if(end === undefined)
    end = start+1
  if(seasonal)
    seasonal = "season";
  else{
    seasonal = "era"
    if(season > settings.currentEra)
      season = settings.currentEra;
  }
  if(hardcore != "")
    title = "Hardcore ".concat(title);

  // Create api URL
  let api = "https://"+region+".api.battle.net/"+type+"/d3/"+seasonal+"/"+season+"/leaderboard/rift-"+hardcore+heroClass+"?access_token="+config.blizzToken;


  // Get api data and create a RichEmbed
  await snekfetch.get(api).then(r => {
    var body = r.body.row;

    let icon = "http://media.blizzard.com/d3/icons/portraits/64/"+classIcon+"_male.png";
    let ladderURL = "https://"+region+".diablo3.com/en/rankings/"+seasonal+"/"+season+"/rift-"+hardcore+heroClass;
    let footer = "Season "+season+(season === (seasonal === "era" ? settings.currentEra : settings.currentSeason) ? " | Current " + seasonal : "");
    let embed = new Discord.RichEmbed()
      .setAuthor(title+" Greater Rift "+(seasonal==="season" ? "Seasonal" : "Era"), icon, ladderURL)
      .setFooter(footer)
      .setColor(color);

    // Add a RichEmbed field for each rank
    for(var i = start; i < end; i++){
      let heroId = body[i].player[0].data[8];
      heroId = !heroId ? body[i].player[0].data[6].number : heroId.number;
      let tier = body[i].data[0].id === "RiftLevel" ? body[i].data[0].number : body[i].data[1].number;
      let time = body[i].data[1].id === "RiftTime" ? body[i].data[1].timestamp : body[i].data[2].timestamp;
      let minutes = Math.floor(time/60000);
      let seconds = (time%60000)/1000;
      let profileURL = "https://us.diablo3.com/en/profile/"+body[i].player[0].data[0].string.replace("#","-")+"/hero/"+heroId;
      let profile = "["+body[i].player[0].data[0].string+"]("+profileURL+")"+" "+body[i].player[0].data[2].string;
      let rank = "Rank: "+(body[i].data[0].id === "Rank" ? body[i].data[0].number : body[i].order);

      switch(heroClass){
        case "team-4":
          if(body[i].player[3])
            profile += " ["+body[i].player[3].data[0].string+"](https://us.diablo3.com/en/profile/"+body[i].player[3].data[0].string.replace("#","-")+"/)"+" "+body[i].player[3].data[2].string+"\n";
        case "team-3":
          if(body[i].player[2])
            profile += " ["+body[i].player[2].data[0].string+"](https://us.diablo3.com/en/profile/"+body[i].player[2].data[0].string.replace("#","-")+"/)"+" "+body[i].player[2].data[2].string;
        case "team-2":
          if(body[i].player[1])
            profile += " ["+body[i].player[1].data[0].string+"](https://us.diablo3.com/en/profile/"+body[i].player[1].data[0].string.replace("#","-")+"/)"+" "+body[i].player[1].data[2].string;
      }
      profile += "\nTier: "+tier+"\tTime: "+minutes+"m "+seconds+"s";

      embed.addField(rank, profile);
    }

    if(dm)
      message.author.send({embed: embed});
    else
      message.channel.send({embed: embed});
  }).catch(error => {console.log('caught', error.message); });
  msg.delete();
}

module.exports.help = {
  name: "grift",
  arguments: "[rank[to <rank>]] [dm|public] [region] [ladder] [hc|hardcore] [season|seasonal|ns|era|nonseasonal]"
}
