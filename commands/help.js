const fs = require('fs');
const path = require('path');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: '/help',
  description: 'Show available commands',
  usage: '/help [command name]',
  author: 'Robert Aaron',
  execute(senderId, args, pageAccessToken) {
    const commandsDir = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const commandFile = commandFiles.find(file => {
        const command = require(path.join(commandsDir, file));
        return command.name.toLowerCase() === commandName;
      });

      if (commandFile) {
        const command = require(path.join(commandsDir, commandFile));
        const commandDetails = `
━━━━━━━━━━━━━━
𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗡𝗮𝗺𝗲:\n${command.name}\n
𝗗𝗶𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻:\n${command.description}\n
𝗔𝘂𝘁𝗵𝗼𝗿:\n${command.author}\n
𝗨𝘀𝗮𝗴𝗲:\n${command.usage}
━━━━━━━━━━━━━━`;
        
        sendMessage(senderId, { text: commandDetails }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: `Command "${commandName}" not found.` }, pageAccessToken);
      }
      return;
    }

    const helpMessage = `
━━━━━━━━━━━━━━
𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀:\n
╭─╼◆ 𝗔𝗜 𝗖𝗛𝗔𝗧𝗕𝗢𝗧𝗦
│◇ai
│◇gemini
│◇gpt4
│◇llma
│◇unity
╰─━━━━━━━━━╾─╯
╭─╼◆ 𝗘𝗡𝗧𝗘𝗥𝗧𝗔𝗜𝗡𝗠𝗘𝗡𝗧
│◇eabab
│◇shoti
│◇riddle
╰─━━━━━━━━━╾─╯
╭─╼◆ 𝗜𝗠𝗔𝗚𝗘
│◇draw
│◇gimage
│◇pinterest
╰─━━━━━━━━━╾─╯
╭─╼◆ 𝗠𝗨𝗦𝗜𝗖
│◇lyrics
│◇spotify
╰─━━━━━━━━━╾─╯
╭─╼◆ 𝗨𝗧𝗜𝗟𝗜𝗧𝗬
│◇tempmail
│◇wiki
╰─━━━━━━━━━╾─╯\n
Type "/help [command name]"
to see command details.
━━━━━━━━━━━━━━\n
Made By: Robert Aaron Mantac`;

    sendMessage(senderId, { text: helpMessage }, pageAccessToken);
  }
};
