import { createContext } from "react";

export const SocketContext = createContext<WebSocket | null>(null);

export const SocketProvider = (props: any) => {
    const {children} = props;

    const ws = new WebSocket('ws://localhost:8000/chat')

    return (
        <SocketContext.Provider value={ws}>
            {children}
        </SocketContext.Provider>
    )
}