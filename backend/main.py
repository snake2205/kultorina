from fastapi import FastAPI,Body
import schemas
import models
from fastapi.middleware.cors import CORSMiddleware
from routes.api import router as api_router
from endpoints.socket import socket_app



app = FastAPI()

app.include_router(api_router)
app.mount("/ws", socket_app)

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
