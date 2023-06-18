import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = (props: any) => {
    const {children} = props;

    const socket: Socket = io('http://localhost:8000/', {
        transports: ['websocket'],
    })

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}