import { Request, Response, NextFunction } from 'express';
import conversationService from '../services/conversation.service';
import { successResponse, AppError } from '../utils';
import { getIO } from '../utils/socket';

export class ConversationController {
  async createConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const { participant1Id, participant2Id } = req.body;

      if (!participant1Id || !participant2Id) {
        throw new AppError(
          'Both participant1Id and participant2Id are required',
          400,
        );
      }

      const conversation = await conversationService.createConversation(
        participant1Id,
        participant2Id,
      );

      // Notify the recipient that they have a new conversation thread
      const io = getIO();
      io.to(participant2Id).emit('new_message', {
        conversationId: conversation.id,
        message: { content: 'Started a new conversation with you.' },
      });

      return successResponse(res, {
        data: conversation,
        statusCode: 201,
        message: 'Conversation created successfully',
      });
    } catch (error) {
      return next(error);
    }
  }

  async getUserConversations(req: Request, res: Response, next: NextFunction) {
    try {
      // In production, userId should come from authenticated user (req.user.id)
      const userId = req.query.userId as string;

      if (!userId) {
        throw new AppError('userId is required', 400);
      }

      const conversations =
        await conversationService.getUserConversations(userId);

      return successResponse(res, {
        data: conversations,
        statusCode: 200,
        message: 'Conversations retrieved successfully',
      });
    } catch (error) {
      return next(error);
    }
  }

  async getConversationById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      // In production, userId should come from authenticated user
      const userId = req.query.userId as string;

      if (!userId) {
        throw new AppError('userId is required', 400);
      }

      const conversation = await conversationService.getConversationById(
        id,
        userId,
      );

      return successResponse(res, {
        data: conversation,
        statusCode: 200,
        message: 'Conversation retrieved successfully',
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        return next(new AppError(error.message, 404));
      }

      return next(error);
    }
  }
}

export default new ConversationController();
