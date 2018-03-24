const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();

bot.on("ready", function(){
  console.log("ready");
});
bot.on("message", function(message){
  if(message.author.equals(bot.user)) return;

  if(message.content == "hello"){
    message.channel.sendMessage("Herroooooo");
  }
  if (message.content.substring(0, 1) == '!') {
          var args = message.content.substring(1).split(' ');
          var cmd = args[0];

          args = args.splice(1);
          switch(cmd) {
              // !ping
              case 'ping':
                  message.channel.sendMessage("Pong!");
              break;
              // Just add any case commands if you want to..
           }
  }

});

bot.login(config.token);
