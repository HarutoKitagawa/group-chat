import { useState, useContext } from "react"
import { SocketContext } from "../providers/SocketProvider"

export const TextList = () => {
    const ws = useContext(SocketContext)

    return (
        <ul>

        </ul>
    )
}