from fastapi import FastAPI
from api.routers.ai_router import router
import socketio


fastapi = FastAPI()
fastapi.include_router(router)

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins="*")
app = socketio.ASGIApp(sio, fastapi)

import api.sockets.room_socket