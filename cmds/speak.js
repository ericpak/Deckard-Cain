const cainVoice = __dirname + "/../media/audio/cain.mp3";
const hello = "/home/eric/git/Deckard-Cain/cmds/hello.mp3";
module.exports.run = async (bot, message, args) => {
  console.log("HERRROOOO ");
  if(!message.member.voiceChannel){
    message.channel.send("Whhaattttt? I can't hear you! Maybe if you were in a voice channel i could hear you!");
    return;
  }
//   var broadcast = message.client.createVoiceBroadcast();
//   broadcast.playFile(cainVoice);
//   console.log(message.client.voiceConnections.values());
//   for (const connection of message.client.voiceConnections.values()) {
//     message.channel.send("Herro");
//     connection.playBroadcast(broadcast);
//   }
  var voiceChannel = message.member.voiceChannel;
  voiceChannel.join().then(connection => {
    const dispatcher = connection.playFile(cainVoice);
    dispatcher.on("end", end => {
      voiceChannel.leave();
    });
  }).catch(err => console.log(err));

}

module.exports.help = {
  name: "speak",
  arguments: ""
}
