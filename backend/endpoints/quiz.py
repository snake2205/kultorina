from fastapi import APIRouter, Depends
from fastapi import Query, FastAPI, WebSocket
from typing import Optional
import time

from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal, get_session
from models import models
from schemas.quiz_schemas import MakeQuiz, ReportQuestion, StartQuiz
from sqlalchemy.sql import text
from  sqlalchemy.sql.expression import func, not_
import json
import socketio

router = APIRouter(
    prefix="/quiz",
    tags=["Quiz"],
    responses={404: {"description": "Not found"}},
)
sio = socketio.AsyncServer(cors_allowed_origins='*', async_mode='asgi')
socketio_app = socketio.ASGIApp(sio, router)

Base.metadata.create_all(engine)

@router.post("/make_quiz")
def Make_Quiz(
    form_data: MakeQuiz = Depends(),    
    session: Session = Depends(get_session)
    ):

    fields = form_data.field.split(",")
    questions = form_data.question.split(",")
    response = []
    for i in range(len(fields)):
        if questions[i] == "lokācija":
            row = session.query(models.Data).order_by(func.rand()).first()
            fakes = session.query(models.Data).filter(not_(models.Data.name.contains(row.name.split(".")[0]))).order_by(func.rand()).limit(3)
            res = {
                "id": row.id,
                "name": row.name.split(".")[0],
                "image": row.image,
                "url": row.url,
                "fakes": [fakes[0].name.split(".")[0], fakes[1].name.split(".")[0], fakes[2].name.split(".")[0]]
            }
            response.append(res)

    return response

@router.post("/report_question")
def Report_Question(
    form_data: ReportQuestion = Depends(),    
    session: Session = Depends(get_session)
    ):
    id_field = session.query(models.Fields).filter(models.Fields.name.contains(form_data.field)).first().id
    if session.query(models.ReportedQuestions).filter_by(field_id = id_field, report_id = int(form_data.id)).first():
        v = session.query(models.ReportedQuestions).filter_by(field_id = id_field, report_id = int(form_data.id)).first().votes
        session.query(models.ReportedQuestions).filter_by(field_id = id_field, report_id = int(form_data.id)).update({models.ReportedQuestions.votes: v+1} )
        session.commit()
    else:
        question = models.ReportedQuestions(report_id = int(form_data.id), field_id = id_field)
        session.add(question)
        session.commit()

    return {"detail": "Paldies par reportu, jūsu viedoklis tiks ņemts vērā"  } 

@router.post("/start_quiz")
def Start_Quiz(
    form_data: StartQuiz = Depends(),    
    session: Session = Depends(get_session)
    ):
    data = json.loads(form_data.data)
    session.add(models.Quizes(name="myQuiz"))
    session.commit()
    id = session.query(func.max(models.Quizes.id)).first()[0]
    for el in data:
        el = json.loads(el)
        field_id = session.query(models.Fields).filter_by(name=el["field"]).first().id
        question = models.AllQuizQuestions(field_id=field_id, data_id = el["id"], type=el["question"], answer_1=el["fakes"][0], answer_2=el["fakes"][1], answer_3=el["fakes"][2], quiz_id=id)
        session.add(question)
    session.commit()
    
    return id

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    i=0
    while True:
        await websocket.send_text(str(i))
        time.sleep(1);
        i+=1

@sio.event
def my_event(sid, data):
    return 1

@sio.event
def connect(sid, environ, auth):
    print('connect ', sid)