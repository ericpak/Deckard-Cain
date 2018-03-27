// Icons
//    http://media.blizzard.com/d3/icons/<type>/<size>/<class_gender>.png
//      <type>: portraits, items, skills
//      <size>: 21, 42, 64
//      <class_gender>: barbarian_male, barbarian_female, ...

// Game data
//    https://<region>.api.battle.net/data/<game>/document/path?access_token=<token>
// Specific user
//    https://<region>.api.battle.net/profile/<user_id>/<game>/document/path?access_token=<token>
//      <region>: us, kr, eu, tw, cn
//      <game>: d3, wow, sc2
//      <token>: access token
//      <user_id>: user-1234 (from: user#1234)

const snekfetch = require("snekfetch");
const Discord = require("discord.js");
const config = require("../config.json");
const apiConfig = require("../apiConfig.json");
const icon = "../media/icons/portraits/monk_male.png";

var currentEra = 10;

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("Getting data...");
  // Defaults
  var start;
  var end;
  var details = true;
  var color = "RED";
  var range = false;
  // api Defaults
  var region = apiConfig.region;
  var type = apiConfig.type;
  var season = apiConfig.season;
  var hardcore = apiConfig.hardcore;
  var heroClass = apiConfig.heroClass;
  var classIcon = apiConfig.classIcon;
  var title = apiConfig.heroClass.charAt(0).toUpperCase()+apiConfig.heroClass.slice(1);
  var seasonal = apiConfig.seasonal;

  while(args.length > 0){
    let argument = args.splice(0,1);

    if(!isNaN(Number(argument))){
      if(start === undefined){
        start = Number(argument)-1;
        if(start < 0 || start > 999)
          return message.channel.send("Rank must be between 1 and 1000!");
      } else if(end === undefined && range){
        end = Number(argument);
        if(end < start || end > 1000)
          end = start+1;
        details = false;
      }
    } else {
      range = false;
      if(argument == "to" && start != undefined){
        range = true;
      }
      switch(String(argument)){
        case "hc":
        case "hard":
        case "hardcore":
          hardcore = "hardcore-"; break;
        case "sc":
        case "soft":
        case "softcore":
          hardcore = ""; break;
        case "barb":
        case "barbarian":
          heroClass = "barbarian"; classIcon = "barbarian"; color = "RED"; break;
        case "cru":
        case "sader":
        case "crusader":
          heroClass = "crusader"; classIcon = "x1_crusader"; color = "RED"; break;
        case "dh":
        case "demon":
        case "demonhunter":
          heroClass = "dh"; classIcon = "demonhunter"; color = "GREEN"; break;
        case "monk":
          heroClass = "monk"; classIcon = "monk"; color = "GREEN"; break;
        case "wd":
        case "witch":
        case "witchdoctor":
          heroClass = "wd"; classIcon = "witchdoctor"; color = "GOLD"; break;
        case "wiz":
        case "wizard":
          heroClass = "wizard"; classIcon = "wizard"; color = "GOLD"; break;
        case "nec":
        case "necro":
        case "necromancer":
          heroClass = "necromancer"; classIcon = "p6_necro"; color = "GOLD"; break;
        case "t2":
        case "team2":
          heroClass = "team-2"; color = "BLUE"; break;
        case "t3":
        case "team3":
          heroClass = "team-3"; color = "BLUE"; break;
        case "t4":
        case "team4":
          heroClass = "team-4"; color = "BLUE"; break;
        case "ns":
        case "era":
        case "nonseasonal":
          seasonal = false; break;
        case "season":
        case "seasonal":
          seasonal = true; break;
        case "us": region = "us"; break;
        case "eu": region = "eu"; break;
        case "kr": region = "kr"; break;
        case "tw": region = "tw"; break;
      }
    }
  }

  if(start === undefined){
    start = 0;
    end = start + 10;
  } else if(end === undefined)
    end = start+1
  if(seasonal)
    seasonal = "season";
  else{
    seasonal = "era"
    if(season > currentEra)
      season = currentEra;
  }

  let api = "https://"+region+".api.battle.net/"+type+"/d3/"+seasonal+"/"+season+"/leaderboard/rift-"+hardcore+heroClass+"?namespace=2-6-US&access_token="+config.blizzToken;
  switch(heroClass){
    case "barbarian": title = "Barbarian"; break;
    case "monk": title = "Monk"; break;
    case "wizard": title = "Wizard"; break;
    case "crusader": title = "Crusader"; break;
    case "dh": title = "Demon Hunter"; break;
    case "wd": title = "Witch Doctor"; break;
    case "necromancer": title = "Necromancer"; break;
  }
  if(hardcore != "")
    title = "Hardcore ".concat(title);

  await snekfetch.get(api).then(r => {
    var body = r.body.row;

    let icon = "http://media.blizzard.com/d3/icons/portraits/64/"+classIcon+"_male.png";
    let ladderURL = "https://"+region+".diablo3.com/en/rankings/"+seasonal+"/"+season+"/rift-"+hardcore+heroClass;
    let embed = new Discord.RichEmbed()
      .setAuthor(title+" Greater Rift "+(seasonal==="season" ? "Seasonal" : "Era"), icon, ladderURL)
      .setFooter("Season "+season)
      .setColor(color);

    for(var i = start; i < end; i++){
      let heroId = body[i].player[0].data[8];
      if(!heroId)
        heroId = body[i].player[0].data[6].number
      else
        heroId = heroId.number
      let time = body[i].data[2].timestamp;
      let minutes = Math.floor(time/60000);
      let seconds = (time%60000)/1000;
      let tier = body[i].data[1].number;
      let profileURL = "https://us.diablo3.com/en/profile/"+body[i].player[0].data[0].string.replace("#","-")+"/";
      let profile = "["+body[i].player[0].data[0].string+"]("+profileURL+")";
      let rank = body[i].data[0].number;
      let heroURL = profileURL+"hero/"+heroId;
      embed.addField("Rank: "+rank, profile+" \tHeroID: ["+heroId+"]("+heroURL+")"+"\tTier: "+tier+"\tTime: "+minutes+"m "+seconds+"s");
    }

    message.channel.send({embed: embed});
  });

  msg.delete();
}

module.exports.help = {
  name: "grift",
  arguments: "[<rank[to <rank>]> <region> <ladder> <hardcore|hc> <nonseasonal|era|ns>]"
}
