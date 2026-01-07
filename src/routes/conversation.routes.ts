import { Router } from 'express';
import conversationController from '../controllers/conversation.controller';

const router = Router();


router.post('/', conversationController.createConversation.bind(conversationController));
router.get('/', conversationController.getUserConversations.bind(conversationController));
router.get('/:id', conversationController.getConversationById.bind(conversationController));

export default router;