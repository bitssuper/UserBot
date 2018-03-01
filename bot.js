const { prefix, linkprefix, token } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client({autoReconnect:true});

const YTDL = require('ytdl-core');

client.on('ready', () => {
  console.log('Welcome to User Bot, version 1.0.');
  client.user.setActivity('discord.gg/MyUsernamesThis');
});

client.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "join-logs").sendMessage("Welcome to MyUsernamesThis Discord server " + member.toString() + ", please read #rules-and-info for information about how to get access to the rest of the Discord server.");
});

client.on('message', message => {
  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase()) {
      case "ping":
        message.channel.sendMessage("Pong!");
        break;
      case "confirm":
        message.delete();
        if(!message.member.guild.roles.find("name", "Verified")) {
        message.channel.sendMessage(message.author.tag + " has succesfully been verified, by confirming to follow the rules!");
        message.member.addRole(message.member.guild.roles.find("name", "Verified"));
      } else if(message.member.guild.roles.find("name", "Verified")) {
        message.reply('You are already verified!');
      }
        break;
        case "warn":
          var reason = args.slice(2).join(' ');
          var WarnType = "Warning 0"
          var WarnMember = message.guild.member(message.mentions.users.first());
          var logChannel = message.member.guild.channels.find("name", "mod-logs");
          var Warning = message.member.guild.roles.find("name", "Warning 1");
          var Warning2 = message.member.guild.roles.find("name", "Warning 2");
          var staffRole = message.member.guild.roles.find("name", "Staff");

          if(reason.length === 0) {
            reason = "undefined"
          }

          const WarnEmbed = new Discord.RichEmbed()
          .setColor('#f22525')
          .setAuthor('Moderation logs', message.author.avatarURL)
          .addField('Name', message.guild.member(message.mentions.users.first()))
          .addField('Punishment', 'Warning.')
          .addField('Warning type', "Warning 1")
          .addField('Reason', reason)
          .setTimestamp()
          .setFooter('User Bot, version 1.0')

          const WarnEmbed2 = new Discord.RichEmbed()
          .setColor('#f22525')
          .setAuthor('Moderation logs', message.author.avatarURL)
          .addField('Name', message.guild.member(message.mentions.users.first()))
          .addField('Punishment', 'Warning.')
          .addField('Warning type', "Warning 2")
          .addField('Reason', reason)
          .setTimestamp()
          .setFooter('User Bot, version 1.0')

          if(!message.member.roles.find("name", "Staff")) {
            message.reply('You do not have the right permissions to execute this command!');
          }
          if(message.member.roles.find("name", "Staff") && !WarnMember.roles.find("name", "Staff") && !WarnMember.roles.find("name", "Warning 1")) {
          WarnMember.addRole(Warning);
          message.delete();
          WarnType.replace("Warning 0", "Warning 1");
          logChannel.send({ embed: WarnEmbed });
        } else {
          if(message.member.roles.find("name", "Staff") && !WarnMember.roles.find("name", "Warning 2" && !WarnMember.roles.find("name", "Staff"))) {
          if(WarnMember.roles.find("name", "Warning 1")) {
            message.delete();
          WarnMember.addRole(Warning2);
          WarnType.replace("Warning 0", "Warning 2");
            logChannel.send({ embed: WarnEmbed2 });
            if(WarnMember.roles.find("name", "Warning 2")) {
                if(message.member.roles.find("name", "Staff") && !WarnMember.roles.find("name", "Staff")) {
                  message.delete();
                  WarnMember.ban(reason);
              }
            }
          }
        }
      }
        break;
        case "kick":

        var reason = args.slice(2).join(' ');
        var WarnMember = message.guild.member(message.mentions.users.first());
        var logChannel = message.member.guild.channels.find("name", "mod-logs");

        if(reason.length === 0) {
          reason = "undefined"
        }

        const KickEmbed = new Discord.RichEmbed()
        .setColor('#f22525')
        .setAuthor('Moderation logs', message.author.avatarURL)
        .addField('Name', message.guild.member(message.mentions.users.first()))
        .addField('Punishment', 'Kick')
        .addField('Reason', reason)
        .setTimestamp()
        .setFooter('User Bot, version 1.0')

        if(!message.member.roles.find("name", "Staff")) {
          message.reply('You do not have the right permissions to execute this command!');
        }
        if(message.member.roles.find("name", "Staff") && !WarnMember.roles.find("name", "Staff")) {
          message.delete();
          WarnMember.kick(reason);
          logChannel.send({ embed: KickEmbed });
        }
        break;

        case "ban":

        var reason = args.slice(2).join(' ');
        var WarnMember = message.guild.member(message.mentions.users.first());
        var logChannel = message.member.guild.channels.find("name", "mod-logs");
        var AuthorAvatar = message.Author.avatarURL

        if(reason.length === 0) {
          reason = "undefined"
          AuthorAvatar = "\xa0"
        }

        const BanEmbed = new Discord.RichEmbed()
        .setColor('#f22525')
        .setAuthor('Moderation logs', AuthorAvatar)
        .addField('Name', message.guild.member(message.mentions.users.first()))
        .addField('Punishment', 'Ban')
        .addField('Reason', reason)
        .setTimestamp()
        .setFooter('User Bot, version 1.0')

        if(!message.member.roles.find("name", "Staff")) {
          message.reply('You do not have the right permissions to execute this command!');
        }
        if(message.member.roles.find("name", "Staff") && !WarnMember.roles.find("name", "Staff") && !reason.length === 0) {
          message.delete();
          WarnMember.ban(reason);
          logChannel.send({ embed: BanEmbed });
          break;
       }
       case "clear":

       var amount = args.slice(1).join(' ');

       if(message.member.roles.find("name", "Staff")) {
         message.channel.bulkDelete(amount);
         message.channel.sendMessage(amount.toString() + '\xa0' + "messages has been deleted with the clear command.");
       } else if(!message.member.roles.find("name", "Staff")) {
         message.reply('You do not have the right permissions to execute this command.');
       }
       break;
       case "tester":

       var role = message.member.guild.roles.find("name", "Testers");


       if(!message.guild.member(message.mentions.users.first()).roles.find("name", "Tester") && message.member.roles.find("name", "Staff")) {
         message.guild.member(message.mentions.users.first()).addRole(role) || message.guild.member(message.mentions.users()).addRole(role)
       }
       break;
       case "say":

       var smessage = args.slice(1).join(' ');
       var sargs = args.slice(2).join(' ');
       var schannel = message.member.guild.channels.find("name", "dev-testing");

       if (smessage.length === 0) {
         message.reply('Please define a message to be said.')
         message.delete();
       } else {
         if(message.member.roles.find("name", "Staff")) {
           message.delete();
           schannel.startTyping(1);
           schannel.send(smessage);
           schannel.stopTyping(true);
       }
     }
       break;
       case "status":

       var sstatus = args.slice(1).join(' ');

       if(sstatus.length === 0) {
         message.reply('Please define a status to be changed to.');
       } else {
         client.user.setActivity(sstatus);
       }
   }
});

client.login(token)
