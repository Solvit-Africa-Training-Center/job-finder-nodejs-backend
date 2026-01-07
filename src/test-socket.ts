import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

const USER_ID = process.argv[2];

if (!USER_ID) {
  console.error(
    '❌ Error: Please provide a User ID. Example: npx ts-node test-socket.ts MY_USER_ID',
  );
  process.exit(1);
}

const socket = io(SOCKET_URL);

socket.on('connect', () => {
  console.log(`✅ Connected as: ${socket.id}`);

  socket.emit('join', USER_ID);
  console.log(`📡 Listening for messages directed to User: ${USER_ID}`);
});

socket.on('new_message', (data) => {
  console.log('📩 [REAL-TIME EVENT] New Message Received!');
  console.log('Data:', JSON.stringify(data, null, 2));
});

socket.on('user_typing', (data) => {
  console.log(`⌨️  ${data.senderName} is typing...`);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected');
});
