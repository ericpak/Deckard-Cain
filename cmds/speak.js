const cainVoice = __dirname + "/../media/audio/cain.mp3";
const hello = "/home/eric/git/Deckard-Cain/cmds/hello.mp3";
var audio = cainVoice;

module.exports.run = async (bot, message, args) => {
  if(!message.member.voiceChannel){
    message.channel.send("Whhaattttt? I can't hear you! Maybe if you were in a voice channel i could hear you!");
    return;
  }
  if(args[1] == "hellodarkness")
    audio = hello;

  var voiceChannel = message.member.voiceChannel;
  voiceChannel.join().then(connection => {
    const dispatcher = connection.playFile(audio);
    dispatcher.on("end", end => {
      voiceChannel.leave();
    });
  }).catch(err => console.log(err));

}

module.exports.help = {
  name: "speak",
  arguments: ""
}
