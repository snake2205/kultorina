from fastapi import APIRouter, Depends
from fastapi import Query, FastAPI, WebSocket
from typing import Optional
import time

from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal, get_session
from models import models
from schemas.quiz_schemas import MakeQuiz, ReportQuestion, StartQuiz
from schemas.auth_schemas import User
from sqlalchemy.sql import text
from  sqlalchemy.sql.expression import func, not_
import json
from functions.auth_functions import auth_methods

router = APIRouter(
    prefix="/quiz",
    tags=["Quiz"],
    responses={404: {"description": "Not found"}},
)

Base.metadata.create_all(engine)

@router.post("/make_quiz")
def Make_Quiz(
    form_data: MakeQuiz = Depends(),    
    session: Session = Depends(get_session),
    current_user: User = Depends(auth_methods.get_current_user),
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
    session: Session = Depends(get_session),
    current_user: User = Depends(auth_methods.get_current_user),
    ):
    id_field = session.query(models.Fields).filter(models.Fields.name.contains(form_data.field)).first().id
    if session.query(models.ReportedQuestions).filter_by(field_id = id_field, data_id = int(form_data.id)).first():
        v = session.query(models.ReportedQuestions).filter_by(field_id = id_field, data_id = int(form_data.id)).first().votes
        session.query(models.ReportedQuestions).filter_by(field_id = id_field, data_id = int(form_data.id)).update({models.ReportedQuestions.votes: v+1} )
        session.commit()
    else:
        question = models.ReportedQuestions(data_id = int(form_data.id), field_id = id_field)
        session.add(question)
        session.commit()

    return {"detail": "Paldies par reportu, jūsu viedoklis tiks ņemts vērā"  } 

@router.post("/start_quiz")
def Start_Quiz(
    form_data: StartQuiz = Depends(),    
    session: Session = Depends(get_session),
    current_user: User = Depends(auth_methods.get_current_user),
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



