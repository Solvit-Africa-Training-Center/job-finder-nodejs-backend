import Conversation from '../database/models/Conversation';
import Message from '../database/models/Message';
import { Op } from 'sequelize';

export class ConversationService {
  // Create a new conversation
  async createConversation(participant1Id: string, participant2Id: string) {
    // Check if conversation already exists between these participants
    const existingConversation = await Conversation.findOne({
      where: {
        [Op.or]: [
          { participant1Id, participant2Id },
          { participant1Id: participant2Id, participant2Id: participant1Id }
        ]
      }
    });

    if (existingConversation) {
      return existingConversation;
    }

    const conversation = await Conversation.create({
      participant1Id,
      participant2Id,
      lastMessageAt: new Date()
    });

    return conversation;
  }

  // Get all conversations for a user
  async getUserConversations(userId: string) {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [
          { participant1Id: userId },
          { participant2Id: userId }
        ]
      },
      include: [
        {
          model: Message,
          as: 'messages',
          limit: 1,
          order: [['createdAt', 'DESC']],
          required: false
        }
      ],
      order: [['lastMessageAt', 'DESC']]
    });

    return conversations;
  }

  // Get single conversation by ID
  async getConversationById(conversationId: string, userId: string) {
    const conversation = await Conversation.findOne({
      where: {
        id: conversationId,
        [Op.or]: [
          { participant1Id: userId },
          { participant2Id: userId }
        ]
      }
    });

    if (!conversation) {
      throw new Error('Conversation not found or unauthorized');
    }

    return conversation;
  }

  // Update last message timestamp
  async updateLastMessageAt(conversationId: string) {
    await Conversation.update(
      { lastMessageAt: new Date() },
      { where: { id: conversationId } }
    );
  }
}

export default new ConversationService();