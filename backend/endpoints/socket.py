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
    code = await make_room_admin(sid)
    quiz = await find_table_admin(sid, id)
    sio.enter_room(sid, code+"admin")

    await sio.save_session(sid, {"quiz":quiz, "code":code})
    await sio.emit("start_info", {"quiz":quiz, "code":code})

async def make_room_admin(sid):
    session = next(get_session())
    run = True
    while run:
        n = random.randint(10000,99999)
        if session.query(models.PlayerRooms).filter_by(code=n).first() is None:
            session.add(models.PlayerRooms(code=n))
            session.commit()
            run = False
    sio.enter_room(sid, str(n))
        
    return str(n)

async def find_table_admin(sid, id):
    session = next(get_session())
    quiz = []
    questions = session.query(models.AllQuizQuestions).filter_by(quiz_id=id)
    for i in questions:
        q = session.query(models.Data).filter_by(id = i.data_id).first()
        options = [i.answer_1, i.answer_2, i.answer_3, q.name]
        random.shuffle(options)
        question = {
            "type":i.type,
            "image":q.image,
            "answer":q.name,
            "options" : options,
            "url":q.url
        }
        quiz.append(question)
    return quiz

@sio.event
def connect(sid, environ, id):
    pass 


@sio.event
async def setup_player(sid, code):
    sio.enter_room(sid, str(code))
    session = next(get_session())
    v = session.query(models.PlayerRooms).filter_by(code=code).first().people_count
    session.query(models.PlayerRooms).filter_by(code=code).update({models.PlayerRooms.people_count: v+1})
    session.commit()
    await sio.emit("player_added", sid, room=str(code)+"admin")
    await sio.save_session(sid, {"code":str(code), "points":0, "answer":0, "time":0})

@sio.event
async def submit_answer(sid, answer):
    data = await sio.get_session(sid)
    await sio.emit("check_answer", {"answer":answer, "id":sid}, room=str(data["code"])+"admin")

@sio.event
async def get_quiz_info(sid):
    data = await sio.get_session(sid)
    await sio.emit("timer_info", data["quiz"])

@sio.event
async def broadcast_intro(sid):
    data = await sio.get_session(sid)
    await sio.emit("intro",  room=str(data["code"]))

@sio.event
async def broadcast_question(sid, answers):
    data = await sio.get_session(sid)
    await sio.emit("answers", answers,  room=str(data["code"]))

@sio.event
async def broadcast_end(sid):
    data = await sio.get_session(sid)
    await sio.emit("end", room=str(data["code"]))

@sio.event
async def return_points(sid, data):
    await sio.emit("send_points", {"points":data["points"]}, room=data["id"])


           
    

        
        


    