import openRouterAPI from "../Api/openRouter.js";
import chatMemory from '../Utility/memoryStore.js';
import Chat from '../Schemas/chat.model.js';

export const getAIResponse = async (req, res) => {
  const { userPrompt, chatId, extractedText } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'Unauthorized: User not logged in' });
  }
  const userId = req.user.id;

  if (!userPrompt && !extractedText) {
    return res.status(400).json({ error: 'User prompt or extracted text required' });
  }

  try {
    let chat;

    if (chatId) {
      chat = await Chat.findById(chatId);
      if (!chat || chat.user.toString() !== userId) {
        return res.status(404).json({ error: 'Chat not found' });
      }
    } else {
      chat = new Chat({
        user: userId,
        title: userPrompt?.slice(0, 30) || 'Uploaded File',
        messages: [],
      });
    }

    const memoryKey = chatId || chat._id.toString();
    if (userPrompt?.toLowerCase().includes("start over")) {
      chatMemory[memoryKey] = [];
    }

    const memoryMessages = chatMemory[memoryKey] || [];

    const mergedPrompt = `${extractedText || ''}\n\n${userPrompt || ''}`.trim();

    memoryMessages.push({ role: 'user', content: mergedPrompt });

    const fullMessages = [
      {
  role: 'system',
  content: `
You are StudyBuddy, an AI build to help in studies and exams. You are also a good friend of user and care for them

⚠️ Important Response Rules (Never ignore):
- Use **markdown structure** only.

- For lists or topics, break down like this:

---
**📌 Topic Name**

- Definition
- Example
- Related important topics
- Example exam questions which are important and could be asked based on input.(remember give in format like 
1. quetion
2. quetion
3. quetion
etc
)
---

After each like after defination give spacing below then start example the again spacing then related imp topics. always bold it means <strong>Definition:<strong/> then the actuall definition.

You can talk casually too like hello and friendly with user based on input

  `.trim()
},

      ...memoryMessages,
    ];

    const aiReply = await openRouterAPI(fullMessages);

    memoryMessages.push({ role: 'assistant', content: aiReply });
    chatMemory[memoryKey] = memoryMessages.slice(-10);

    chat.messages.push({ role: 'user', content: mergedPrompt });
    chat.messages.push({ role: 'assistant', content: aiReply });
    await chat.save();

    return res.status(200).json({
      response: aiReply,
      chatId: chat._id,
    });

  } catch (error) {
    console.error('Error in getAIResponse:', error);
    return res.status(500).json({ error: 'AI response failed' });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id }).select('title _id createdAt');
    return res.status(200).json({ chats });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch chat list' });
  }
};

export const getSingleChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, user: req.user.id });
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    return res.status(200).json({ chat });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch chat' });
  }
};
