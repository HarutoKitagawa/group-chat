import { useState, useContext, useEffect} from "react"
import { SocketContext } from "../providers/SocketProvider"

export const TextList = () => {
    const ws = useContext(SocketContext)
    const [textList, setList] = useState<string[]>([""])

    useEffect(() => {
        if (ws) {
            ws.on("message", (data) => {
                setList((prevTextList) => [...prevTextList, data])
            })
        }
    },[])

    return (
        <ul>
            {textList.map((text, index) => <li key={index}>{text}</li>)}
        </ul>
    )
}