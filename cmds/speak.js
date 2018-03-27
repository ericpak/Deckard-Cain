const cainVoice = __dirname + "/../media/audio/cain.mp3";
const hello = __dirname + "/../media/audio/hello.mp3";

module.exports.run = async (bot, message, args) => {
  var audio = cainVoice;
  if(!message.member.voiceChannel){
    message.channel.send("Whhaattttt? I can't hear you! Maybe if you were in a voice channel i could hear you!");
    return;
  }
  if(args[0] == "hello" && args[1] == "darkness")
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
