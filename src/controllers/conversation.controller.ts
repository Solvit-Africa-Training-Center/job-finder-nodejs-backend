import { Request, Response } from 'express';
import conversationService from '../services/conversation.service';

export class ConversationController {

  async createConversation(req: Request, res: Response) {
    try {
      const { participant1Id, participant2Id } = req.body;

      // In production, participant1Id should come from authenticated user
      // For now using mock data
      if (!participant1Id || !participant2Id) {
        return res.status(400).json({
          success: false,
          message: 'Both participant1Id and participant2Id are required'
        });
      }

      if (participant1Id === participant2Id) {
        return res.status(400).json({
          success: false,
          message: 'Cannot create conversation with yourself'
        });
      }

      const conversation = await conversationService.createConversation(
        participant1Id,
        participant2Id
      );

      return res.status(201).json({
        success: true,
        data: conversation
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Error creating conversation'
      });
    }
  }

 
  async getUserConversations(req: Request, res: Response) {
    try {
      // In production, userId should come from authenticated user (req.user.id)
      const userId = req.query.userId as string;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required'
        });
      }

      const conversations = await conversationService.getUserConversations(userId);

      return res.status(200).json({
        success: true,
        data: conversations
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Error fetching conversations'
      });
    }
  }

  
  async getConversationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // In production, userId should come from authenticated user
      const userId = req.query.userId as string;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required'
        });
      }

      const conversation = await conversationService.getConversationById(id, userId);

      return res.status(200).json({
        success: true,
        data: conversation
      });
    } catch (error: any) {
      const statusCode = error.message.includes('not found') ? 404 : 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Error fetching conversation'
      });
    }
  }
}

export default new ConversationController();