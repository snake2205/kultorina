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


class quizAdmin(socketio.AsyncNamespace):

    def connect(sid, environ, id):
        pass

    async def setup_admin(sid, id):
        code = await make_room_admin(sid)
        quiz = await find_table_admin(sid, id)

        await sio.save_session(sid, {"quiz":quiz, "code":code})
        await sio.emit("start_info", code)

    async def make_room_admin(sid):
        session = next(get_session())
        run = True
        while run:
            n = random.randint(10000,99999)
            if session.query(models.PlayerRooms).filter_by(code=n).first() is None:
                session.add(models.PlayerRooms(code=n))
                session.commit()
                run = False
        
        return n

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
        return quiz

    async def start_quiz_admin(sid):
        run = True
        data = await sio.get_session(sid)
        quiz = data["quiz"]
    
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
sio.register_namespace(quizAdmin("/quiz_admin"))
           
    

        
        


    