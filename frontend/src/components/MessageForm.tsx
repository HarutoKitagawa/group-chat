import { useState, useContext } from "react"
import { SocketContext } from "../providers/SocketProvider"

export const MessageForm = () => {
    const socket = useContext(SocketContext)
    const [ text, setText ] = useState<string>("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (socket) {
            socket.send(text);
        }
        setText("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={handleChange}/>
            <button type="submit">送信</button>
        </form>
    )
}