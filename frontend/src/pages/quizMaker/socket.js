import { io } from 'socket.io-client';
import { proxy } from "../components/CSS/proxy";

function GetSocket() {
    const socket = io("wss://3967-213-226-141-96.ngrok-free.app", {
        path: "/ws/socket.io/",
        transports: ['websocket', 'polling'],
        secure: true,
        upgrade: true
    });
    return socket
}

export default GetSocket;