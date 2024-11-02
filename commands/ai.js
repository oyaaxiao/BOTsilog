const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: '/ai',
  description: 'Interact with ChronoAI',
  usage: '/ai [your question]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: ai [your question]" }, pageAccessToken);

    try {
      const { data: { response } } = await axios.get(`https://hiroshi-api.onrender.com/ai/cohere?ask=${encodeURIComponent(prompt)}`);
      sendMessage(senderId, { text: response }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
