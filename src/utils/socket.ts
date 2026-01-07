import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

interface MessageData {
  id?: string;
  conversationId?: string;
  senderId?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  isRead?: boolean;
  [key: string]: string | number | boolean | undefined;
}

interface ServerToClientEvents {
  new_message: (data: { conversationId: string; message: MessageData }) => void;
  user_typing: (data: { conversationId: string; senderName: string }) => void;
  user_stop_typing: (data: { conversationId: string }) => void;
  error: (msg: string) => void;
}

interface ClientToServerEvents {
  join: (userId: string) => void;
  typing: (data: {
    conversationId: string;
    recipientId: string;
    senderName: string;
  }) => void;
  stop_typing: (data: { conversationId: string; recipientId: string }) => void;
}

let io: Server<ClientToServerEvents, ServerToClientEvents>;

const onlineUsers = new Map<string, string>();

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
    pingTimeout: 60000,
  });

  io.on('connection', (socket) => {
    console.log(`⚡ Connected: ${socket.id}`);

    socket.on('join', (userId: string) => {
      if (!userId) return;
      socket.join(userId);
      onlineUsers.set(userId, socket.id);
      console.log(`👥 User ${userId} is now ONLINE`);
    });

    socket.on('typing', ({ conversationId, recipientId, senderName }) => {
      socket
        .to(recipientId)
        .emit('user_typing', { conversationId, senderName });
    });

    socket.on('stop_typing', ({ conversationId, recipientId }) => {
      socket.to(recipientId).emit('user_stop_typing', { conversationId });
    });

    socket.on('disconnect', () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`❌ User ${userId} went OFFLINE`);
          break;
        }
      }
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized!');
  return io;
};
