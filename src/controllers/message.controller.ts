import { Request, Response } from 'express';
import messageService from '../services/message.service';

export class MessageController {
  
  async sendMessage(req: Request, res: Response) {
    try {
      const { conversationId, senderId, content } = req.body;


      if (!conversationId || !senderId || !content) {
        return res.status(400).json({
          success: false,
          message: 'conversationId, senderId, and content are required'
        });
      }

      // In production, senderId should come from authenticated user
      const message = await messageService.sendMessage(
        conversationId,
        senderId,
        content
      );

      return res.status(201).json({
        success: true,
        data: message
      });
    } catch (error: any) {
      const statusCode = error.message.includes('not found') ? 404 : 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Error sending message'
      });
    }
  }

  
  async getMessages(req: Request, res: Response) {
    try {
      const { conversationId } = req.params;
      const userId = req.query.userId as string;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required'
        });
      }

      const messages = await messageService.getConversationMessages(
        conversationId,
        userId,
        limit,
        offset
      );

      return res.status(200).json({
        success: true,
        data: messages,
        pagination: {
          limit,
          offset,
          count: messages.length
        }
      });
    } catch (error: any) {
      const statusCode = error.message.includes('not found') ? 404 : 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Error fetching messages'
      });
    }
  }


  async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.body.userId || req.query.userId as string;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required'
        });
      }

      const message = await messageService.markMessageAsRead(id, userId);

      return res.status(200).json({
        success: true,
        data: message
      });
    } catch (error: any) {
      const statusCode = error.message.includes('not found') ? 404 : 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Error marking message as read'
      });
    }
  }


  async getUnreadCount(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required'
        });
      }

      const count = await messageService.getUnreadCount(userId);

      return res.status(200).json({
        success: true,
        data: { unreadCount: count }
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Error fetching unread count'
      });
    }
  }
}

export default new MessageController();