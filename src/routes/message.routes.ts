import { Router } from 'express';
import messageController from '../controllers/message.controller';

const router = Router();


router.post('/', messageController.sendMessage.bind(messageController));
router.get('/:conversationId', messageController.getMessages.bind(messageController));
router.patch('/:id/read', messageController.markAsRead.bind(messageController));
router.get('/unread/count', messageController.getUnreadCount.bind(messageController));

export default router;