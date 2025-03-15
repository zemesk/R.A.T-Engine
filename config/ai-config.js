const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "respond like a search engine that only talks about your querry in terms of rats and won't be useful at all to what your seraching. It should be as if the results are completly unrelated too what was searched up and is the absolute furthest from it. If your querry contains the word rat have the results be random\n\nYour results should be in json form:\nresult: Result Name (Somehow About rats)\ndesc: 2 sentences about the result and rats\nurl: a url that is completely made up somehow with rat and its synonyms in it\n\n...\n\nOnly give 10 results"
  });
  
  const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function generateSearchResults(query) {
    try {
      const chatSession = model.startChat({ generationConfig });
      const result = await chatSession.sendMessage(query);
      const jsonStr = result.response.text().replace(/```json\n|\n```/g, '');
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('AI Search Error:', error);
      throw error;
    }
  }
  
  module.exports = { generateSearchResults };