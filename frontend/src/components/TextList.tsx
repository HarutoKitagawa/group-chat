import { useState, useContext } from "react"
import { SocketContext } from "../providers/SocketProvider"

export const TextList = () => {
    const ws = useContext(SocketContext)

    if (ws) {
        ws.on("message", (data) => console.log(data))
    }

    return (
        <ul>
        </ul>
    )
}