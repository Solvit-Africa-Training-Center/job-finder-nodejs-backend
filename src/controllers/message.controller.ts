import { Request, Response, NextFunction } from 'express';
import messageService from '../services/message.service';
import { successResponse, AppError } from '../utils';

export class MessageController {
  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { conversationId, senderId, content } = req.body;

      if (!conversationId || !senderId || !content) {
        throw new AppError(
          'conversationId, senderId, and content are required',
          400,
        );
      }

      // In production, senderId should come from authenticated user
      const message = await messageService.sendMessage(
        conversationId,
        senderId,
        content,
      );

      return successResponse(res, {
        data: message,
        statusCode: 201,
        message: 'Message sent successfully',
      });
    } catch (error: any) {
      if (
        error &&
        typeof error.message === 'string' &&
        error.message.includes('not found')
      ) {
        return next(new AppError(error.message, 404));
      }
      return next(error);
    }
  }

  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { conversationId } = req.params;
      const userId = req.query.userId as string;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;

      if (!userId) {
        throw new AppError('userId is required', 400);
      }

      const messages = await messageService.getConversationMessages(
        conversationId,
        userId,
        limit,
        offset,
      );

      return successResponse(res, {
        data: {
          messages,
          pagination: {
            limit,
            offset,
            count: messages.length,
          },
        },
        statusCode: 200,
        message: 'Messages retrieved successfully',
      });
    } catch (error: any) {
      if (
        error &&
        typeof error.message === 'string' &&
        error.message.includes('not found')
      ) {
        return next(new AppError(error.message, 404));
      }
      return next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.body.userId || (req.query.userId as string);

      if (!userId) {
        throw new AppError('userId is required', 400);
      }

      const message = await messageService.markMessageAsRead(id, userId);

      return successResponse(res, {
        data: message,
        statusCode: 200,
        message: 'Message marked as read successfully',
      });
    } catch (error: any) {
      if (
        error &&
        typeof error.message === 'string' &&
        error.message.includes('not found')
      ) {
        return next(new AppError(error.message, 404));
      }
      return next(error);
    }
  }

  async getUnreadCount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId as string;

      if (!userId) {
        throw new AppError('userId is required', 400);
      }

      const count = await messageService.getUnreadCount(userId);

      return successResponse(res, {
        data: { unreadCount: count },
        statusCode: 200,
        message: 'Unread count retrieved successfully',
      });
    } catch (error: any) {
      return next(error);
    }
  }
}

export default new MessageController();
