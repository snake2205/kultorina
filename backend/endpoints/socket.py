import socketio
from database import get_session
from models import models
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import time
import asyncio
import random

sio = socketio.AsyncServer(cors_allowed_origins="*",
            async_mode="asgi",
            logger=True,
            engineio_logger=True)
socket_app = socketio.ASGIApp(sio)

@sio.event
def connect(sid, environ, id):
    pass

@sio.event
async def setup_admin(sid, id):
    await make_room_admin(sid)
    await find_table_admin(sid, id)

async def make_room_admin(sid):
    session = next(get_session())
    n = random.randint(10000,99999)
    n=5
    if session.query(models.PlayerRooms).filter_by(code=n).first() is None:
        session.add(models.PlayerRooms(code=n))
        session.commit()
        print()
    else:
        print("no")
    sio.enter_room(sid, 'chat_users')

async def find_table_admin(sid, id):
    session = next(get_session())
    quiz = []
    questions = session.query(models.AllQuizQuestions).filter_by(quiz_id=id)
    for i in questions:
        q = session.query(models.Data).filter_by(id = i.data_id).first()
        question = {
            "type":i.type,
            "image":q.image,
            "answer":q.name,
            "fake1" : i.answer_1,
            "fake2": i.answer_2,
            "fake3":i.answer_3,
            "url":q.url
        }
        quiz.append(question)
    await sio.save_session(sid, quiz)

@sio.event
async def start_quiz_admin(sid):
    run = True
    quiz = await sio.get_session(sid)
    index = 0
    quizTime=5
    c = quizTime
    breakTime=3
    while index != len(quiz):
        if (c == 0):
            index +=1
            c = quizTime
        if index !=len(quiz):
            if (c==quizTime):
                for k in range(breakTime, 0, -1):
                    await sio.emit("count_down_break", {"time": k, "data": quiz[index]}, room='chat_users')
                    await asyncio.sleep(1)
            await sio.emit("count_down_quiz", {"time": c, "data": quiz[index]}, room='chat_users')
            c-=1
            await asyncio.sleep(1)
    await sio.emit("quiz_end", room="chat_users")
           
    

        
        


    