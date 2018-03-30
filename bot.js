const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const config = require('./config.json');

const bot = new Discord.Client();
bot.commands = new Enmap();
bot.settings = new Enmap({provider: new EnmapLevel({name: "settings", persisten: true }) });

var settings;

// Load the commands
readdir("./cmds/", (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0){
    console.log("No commands to load!");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

// When bot joins a new server
bot.on("guildCreate", guild => {
  const defaultSettings = {
    prefix: ":",
    region: "us",
    type: "data",
    currentSeason: 13,
    currentEra: 10,
    heroClass: "barbarian",
    classIcon: "barbarian",
    hardcore: "",
    seasonal: true,
    dm: false,
    start: 0,
    end: 10
  }
  bot.settings.set(guild.id, defaultSettings);
  console.log(bot.settings);
});

// Bot is ready
bot.on("ready", () => {
  bot.user.setPresence({ status: 'online', game: { name: 'Stay awhile and listen'} });
  console.log(`${bot.user.username} Bot is ready!`);
});

// Getting a message
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.toLowerCase().split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let settings = bot.settings.get(message.guild.id);

  // Incase someone forgets their prefix
  if(message.content === "Deckard Cain Prefix")
    message.channel.send("Your prefix is: \""+settings.prefix+"\"");

  if(!command.startsWith(settings.prefix)) return;

  let cmd = bot.commands.get(command.slice(settings.prefix.length));
  if(cmd) cmd.run(bot, message, args);
});

bot.login(config.discordToken);
