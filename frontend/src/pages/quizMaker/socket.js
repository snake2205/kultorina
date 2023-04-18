import { io } from 'socket.io-client';

export const socket = io("ws://localhost:8000/", { path: "/ws/quiz_admin/socket.io", transports: ['websocket', 'polling'] });