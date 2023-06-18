import socketio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app_fastapi = FastAPI()

# origins = [
#     'http://localhost:3000',
#     'http://127.0.0.1:3000'
# ]

app_fastapi.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins="*")
app_socketio = socketio.ASGIApp(sio, other_asgi_app=app_fastapi)

@sio.on("message")
async def echo(sid, data):
    await sio.emit("message", data)
    
@sio.event
async def connect(sid, environ):
    print("connected", sid)

if __name__ == "__main__":
    uvicorn.run(app_socketio, host="127.0.0.1", port=8000)