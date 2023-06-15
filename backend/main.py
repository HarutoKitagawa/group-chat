from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

CLIENTS = {}

@app.get("/")
async def main():
    return {"message": "Hello World"}

@app.websocket("/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    # 接続されたら、キーを発行してクライアントを登録する
    key = websocket.headers.get('sec-websocket-key')
    CLIENTS[key] = websocket
    try:
        while True:
            # クライアントからのメッセージを待ち受ける
            message = await websocket.receive_text()
            print(message)
            # 接続しているすべてのクライアントにメッセージを送信
            #for client in CLIENTS.values():
            #    await client.send_text(f"ID: {key} | Message: {message}")
    except:
        websocket.close()
        del CLIENTS[key]

        