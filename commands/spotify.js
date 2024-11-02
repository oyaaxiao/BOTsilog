const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: '/spotify',
  description: 'search and play spotify song.',
  usage: '/spotify [song name]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
if (!args || args.length === 0) {
      // Send message requesting a prompt if missing
      await sendMessage(senderId, {
        text: '❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝘆𝗼𝘂𝗿 𝗽𝗿𝗼𝗺𝗽𝘁\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲: Spotify Nang Dumating Ka.'
      }, pageAccessToken);
      return;  // Exit the function if no prompt is provided
    }

    
    try {
      const { data } = await axios.get(`https://hiroshi-api.onrender.com/tiktok/spotify?search=${encodeURIComponent(args.join(' '))}`);
      const link = data[0]?.download;

      sendMessage(senderId, link ? {
        attachment: { type: 'audio', payload: { url: link, is_reusable: true } }
      } : { text: 'Sorry, no Spotify link found for that query.' }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};
