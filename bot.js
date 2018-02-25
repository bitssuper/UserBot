const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Welcome to User Bot, version 1.0.');
  client.user.setActivity('discord.gg/MyUsernamesThis');
});

client.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "join-logs").sendMessage(member.toString() + " has joined the server!");
});

client.on('message', message => {
  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase()) {
      case "ping":
        message.channel.sendMessage("Pong!");
        break;
      case "verify":
        message.channel.sendMessage(message.author.tag + " has succesfully been verified!");
        message.member.addRole(message.member.guild.roles.find("name", "Verified"));
        break;
        case "warn":
          var reason = args.slice(2).join(' ');
          var logChannel = message.member.guild.channels.find("name", "mod-logs");
          var Warning = message.member.guild.roles.find("name", "Warning 1");
          var Warning2 = message.member.guild.roles.find("name", "Warning 2");
          var staffRole = message.member.guild.roles.find("name", "Staff");

          const WarnEmbed = new Discord.RichEmbed()
          .setColor('#f22525')
          .setAuthor('Moderation logs')
          .addField('Name', message.guild.member(message.mentions.users.first()))
          .addField('Punishment', 'Warning.')
          .addField('Warning type', WarnType)
          .addField('Reason', reason)
          .setTimestamp()
          .setFooter('User Bot, version 1.0')

          if(message.member.roles.find("name", "Staff") && !message.guild.member(message.mentions.users.first()).roles.find("name", "Warning 1")) {
          message.guild.member(message.mentions.users.first()).addRole(Warning);
          message.delete();
          var WarnType = "Warning 1."
          logChannel.send({ embed: WarnEmbed });
        } else {
          if(message.member.roles.find("name", "Staff")) {
          if(message.guild.member(message.mentions.users.first()).roles.find("name", "Warning 1")) {
            message.delete();
            message.guild.member(message.mentions.users.first()).addRole(Warning2);
           var WarnType = "Warning 2."
            logChannel.send({ embed: WarnEmbed });
            }
          }
        }
        break;
  }
});

client.login(token)
