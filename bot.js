const config = require('./config.json')
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log("User bot has been launched and equipped with his ban hammer.")
  client.user.setActivity('Training with the ban hammer.')
});

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("!" + str)
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role) {
    if(pluck(mem.roles).includes(role)) {
        return true;
    } else {
        return false;
    }
}

const BanEmbed = new Discord.RichEmbed()
.setColor('#0099ff')
.setAuthor('Ban command usage.', 'https://www.flamingtoast.com/wp-content/uploads/2015/04/ban-hammer-newB-1000x1000.jpg', 'https://discord.gg/MyUsernamesThis')
.addField('**Banning with username.**', '!ban @username')
.addField('Banning with UserId', '!ban <@userId>')
.addField('Banning with UserId example:', '!ban <@1902001316500453504>')
.setTimestamp()
.setFooter('User Bot, version 1.0');

const KickEmbed = new Discord.RichEmbed()
.setColor('#0099ff')
.setAuthor('Kick command usage.', 'https://www.flamingtoast.com/wp-content/uploads/2015/04/ban-hammer-newB-1000x1000.jpg', 'https://discord.gg/MyUsernamesThis')
.addField('**Kicking with username.**', '!kick @username')
.addField('Kicking with UserId', '!kick <@userId>')
.addField('Kicking with UserId example:', '!kick <@1902001316500453504>')
.setTimestamp()
.setFooter('User Bot, version 1.0');

client.on('message', msg => {
	var args = msg.content.split(/[ ]+/);
    if(commandIs("kick", msg)) {
	  if(hasRole(msg.member, "Staff")) {
		if(args.length == 1) {
			msg.channel.send({ embed: KickEmbed });
		} else {
			msg.guild.member(msg.mentions.users.first()).kick();
			msg.reply('**User has been executed!**');
		}
	} else {
			msg.reply('You do not have the right permissions to execute this command.');
		}
}
	var args = msg.content.split(/[ ]+/);
    if(commandIs("ban", msg)) {
	  if(hasRole(msg.member, "Police Chiefs" || hasRole(msg.member, "Police Supervisor" || hasRole(msg.member, "not camping cop")))) {
		if(args.length == 1) {
      msg.channel.send({ embed: BanEmbed });
		} else {
      let reason = args.slice(1).join(' ');
			msg.guild.member(msg.mentions.users.first()).ban(reason);
			msg.reply('**Haha, nice swing!**');
		}
	} else {
			msg.reply('You do not have the right permissions to execute this command.');
		}
}
if(commandIs("mute", msg)) {
  if(hasRole(msg.member, "Staff")) {
    if(args.length == 1) {
    } else {
      let member = msg.member
      client.user.addRole('Muted', msg.member);
      }
    }
  }
	var args = msg.content.split(/[ ]+/);
	if(commandIs("warn", msg)) {
		if(hasRole(msg.member, "Staff")) {
			if(args.length == 1) {
			} else {
				let member = msg.member
				client.user.addRole('Warning 1', msg.member);
        }
			}
		}
});



client.login('token');
