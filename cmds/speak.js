const cainVoice = "../media/audio/cain.wav";

module.exports.run = async (bot, message, args) => {
  console.log("HERRROOOO");
  if(!message.member.voiceChannel){
    message.channel.send("Whhaattttt? I can't hear you! Maybe if you were in a voice channel i could hear you!");
    return;
  }
  var broadcast = message.client.createVoiceBroadcast();
  broadcast.playFile(cainVoice);
  for (const connection of client.voiceConnections.values()) {
    connection.playBroadcast(broadcast);
  }
}

module.exports.help = {
  name: "speak",
  arguments: ""
}
