import { io } from 'socket.io-client';

function GetSocket() {
    const socket = io("ws://localhost:8000/", { path: "/ws/socket.io", transports: ['websocket', 'polling'] });
    return socket
}

export default GetSocket;