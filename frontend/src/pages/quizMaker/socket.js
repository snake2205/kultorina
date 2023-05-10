import  io  from 'socket.io-client';
import { proxy } from "../components/CSS/proxy";

function GetSocket() {
    const socket = io("ws://localhost:8000", { path:"/ws/socket.io/", transports: ['websocket', 'polling'], secure: true });
    return socket
}
export default GetSocket;

//ws://localhost:8000