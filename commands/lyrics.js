const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: '/lyrics',
  description: 'Fetch song lyrics',
  usage: '/lyrics [song name]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
if (!args || args.length === 0) {
      // Send message requesting a prompt if missing
      await sendMessage(senderId, {
        text: '❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝘆𝗼𝘂𝗿 𝗽𝗿𝗼𝗺𝗽𝘁\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲: lyrics nang dumatin ka.'
      }, pageAccessToken);
      return;  // Exit the function if no prompt is provided
    }

    
    try {
      const { data: { result } } = await axios.get(`https://joshweb.click/search/lyrics?q=${encodeURIComponent(args.join(' '))}`);
      if (result?.lyrics) {
        const messages = splitMessage(result.title, result.artist, result.lyrics, 2000);
        messages.forEach(message => sendMessage(senderId, { text: message }, pageAccessToken));
        if (result.image) sendMessage(senderId, { attachment: { type: 'image', payload: { url: result.image, is_reusable: true } } }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: 'Sorry, no lyrics were found for your query.' }, pageAccessToken);
      }
    } catch {
      sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};

const splitMessage = (title, artist, lyrics, chunkSize) => {
  const message = `Title: ${title}\nArtist: ${artist}\n\n${lyrics}`;
  return Array.from({ length: Math.ceil(message.length / chunkSize) }, (_, i) => message.slice(i * chunkSize, (i + 1) * chunkSize));
};
