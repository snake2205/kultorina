import  io  from 'socket.io-client';
import { proxy } from "../components/CSS/proxy";

function GetSocket() {
    const socket = io("wss://f7bc-85-254-222-189.ngrok-free.app", { path: "/ws/socket.io/", transports: ['websocket', 'polling'], secure: true });
    return socket
}
export default GetSocket;