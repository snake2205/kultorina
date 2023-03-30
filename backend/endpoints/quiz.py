from fastapi import APIRouter, Depends
from fastapi import Query
from typing import Optional

from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal, get_session
from models import models
from schemas.quiz_schemas import MakeQuiz
from sqlalchemy.sql import text
from  sqlalchemy.sql.expression import func, not_
import json

router = APIRouter(
    prefix="/quiz",
    tags=["Quiz"],
    responses={404: {"description": "Not found"}},
)

Base.metadata.create_all(engine)

@router.post("/make_quiz")
def Make_Quiz(
    form_data: MakeQuiz = Depends(),    
    session: Session = Depends(get_session)
    ):

    fields = form_data.field.split(",")
    questions = form_data.question.split(",")
    dataTables = [models.FotoData]#neaizmrst pievienot datu tabulas pie izvelnes
    response = []
    for i in range(len(fields)):
        for table in dataTables:
            if fields[i] in table.__tablename__:
                if questions[i] == "lokācija":
                    row = session.query(table).order_by(func.rand()).first()
                    fakes = session.query(table).filter(not_(table.name.contains(row.name.split(".")[0]))).order_by(func.rand()).limit(3)
                    res = {
                        "id": row.id,
                        "name": row.name.split(".")[0],
                        "image": row.image,
                        "url": row.url,
                        "fakes": fakes[0].name.split(".")[0] + "," + fakes[1].name.split(".")[0] + "," + fakes[2].name.split(".")[0]
                    }
                    response.append(res)

    return response

