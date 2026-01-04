import Message from '../database/models/Message';
import Conversation from '../database/models/Conversation';
import conversationService from './conversation.service';
import { Op } from 'sequelize';

export class MessageService {
  // Send a new message
  async sendMessage(conversationId: string, senderId: string, content: string) {
    // Verify sender is part of the conversation
    await conversationService.getConversationById(conversationId, senderId);

    const message = await Message.create({
      conversationId,
      senderId,
      content,
      isRead: false
    });

    // Update conversation's lastMessageAt
    await conversationService.updateLastMessageAt(conversationId);

    return message;
  }

  // Get all messages in a conversation
  async getConversationMessages(conversationId: string, userId: string, limit = 50, offset = 0) {
    // Verify user is part of the conversation
    await conversationService.getConversationById(conversationId, userId);

    const messages = await Message.findAll({
      where: { conversationId },
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    return messages;
  }

  // Mark message as read
  async markMessageAsRead(messageId: string, userId: string) {
    const message = await Message.findByPk(messageId);

    if (!message) {
      throw new Error('Message not found');
    }

    // Verify user is part of the conversation
    await conversationService.getConversationById(message.conversationId, userId);

    // Only mark as read if the user is not the sender
    if (message.senderId !== userId) {
      await message.update({ isRead: true });
    }

    return message;
  }

  // Mark all messages in a conversation as read
  async markAllMessagesAsRead(conversationId: string, userId: string) {
    // Verify user is part of the conversation
    await conversationService.getConversationById(conversationId, userId);

    await Message.update(
      { isRead: true },
      {
        where: {
          conversationId,
          senderId: { [Op.ne]: userId },
          isRead: false
        }
      }
    );
  }

  // Get unread message count
  async getUnreadCount(userId: string) {
    const count = await Message.count({
      where: {
        isRead: false
      },
      include: [
        {
          model: Conversation,
          as: 'conversation',
          where: {
            [Op.or]: [
              { participant1Id: userId },
              { participant2Id: userId }
            ]
          },
          required: true
        }
      ]
    });

    return count;
  }
}

export default new MessageService();