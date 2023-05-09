from fastapi import APIRouter, Depends
from fastapi import Query
from typing import Optional

from sqlalchemy import func
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal, get_session
from models import models
from schemas.admin_schemas import DataUpload, DeleteReported, DeleteQuestion, QuestionSearch
from functions.auth_functions import auth_methods
from schemas.auth_schemas import User

import json

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    responses={404: {"description": "Not found"}},
)

Base.metadata.create_all(engine)

@router.post("/data_upload")
def append(
    form_data: DataUpload = Depends(),    
    session: Session = Depends(get_session),
    current_user: User = Depends(auth_methods.get_current_user),
    ):
    categories = json.loads(form_data.categories.file.read())
    data = json.loads(form_data.data.file.read())
    c = 0
    q = 0

    if session.query(models.Fields).filter_by(name=form_data.field).first() is None:
        if session.query(func.max(models.Fields.id)).first()[0] is None:
            id = 1
        else: 
            id = session.query(func.max(models.Fields.id)).first()+1
        field = models.Fields(name=form_data.field)
        session.add(field) 
    else:
        id = session.query(models.Fields).filter_by(name=form_data.field).first().id

    for i in range (len(categories)):
        if session.query(models.Categories).filter_by(name=categories[i]["category"]).first() is None:
            category = models.Categories(name=categories[i]["category"] , field_id = id)
            session.add(category)
            c+=1

    for el in data:
        if session.query(models.Data).filter_by(url=el["url"]).first() is None:
            category = session.query(models.Categories).filter_by(name=el["category"]).first().id
            question = models.Data(name = el["name"], url = el["url"], image = el["image"], latitude = el["latitude"], longitude = el["longitude"], field_id = id, categories_id = category )
            session.add(question)
            q+=1
    

    session.commit()
    return {"detail": "Tika pievienotas " + str(c) + " kategorijas un " + str(q) + " jautājumi"  }

@router.post("/reported_questions")
def Reported_questions(
    session: Session = Depends(get_session),
    #current_user: User = Depends(auth_methods.get_current_user),
    ):
      id = session.query(models.ReportedQuestions).first().id
      data_id = session.query(models.ReportedQuestions).first().data_id
      value =  session.query(models.ReportedQuestions).filter_by(id=id).first().votes
      image =  session.query(models.Data).filter_by(id=data_id).first().image
      name = session.query(models.Data).filter_by(id=data_id).first().name
      url = session.query(models.Data).filter_by(id=data_id).first().url

      if id > 0:
          return ({
              'report id': id,
              'votes': value,
              'image': image,
              'name': name,
              'url': url,
              'data id': data_id
              } )
      else:
          return ({
              'report id': -1
              } )
@router.post("/delete_report")
def Delete_reported (
      form_data: DeleteReported = Depends(),    
      session: Session = Depends(get_session)
      ):
       session.delete(session.query(models.ReportedQuestions).filter_by(id=form_data.id).first())
       session.commit()
       return('darbs padarīts!')
 
@router.post("/delete_question")
def Delete_question (
      form_data: DeleteQuestion = Depends(),    
      session: Session = Depends(get_session)
      ):
       session.delete(session.query(models.ReportedQuestions).filter_by(id=form_data.id).first())
       session.delete(session.query(models.Data).filter_by(id=form_data.data_id).first())
       session.commit()
       return('darbs padarīts!')

   
@router.post("/question_search")
def Question_Search (
    form_data: QuestionSearch = Depends(),
    session: Session = Depends(get_session),
    #current_user: User = Depends(auth_methods.get_current_user),
    ):
   
     id = session.query(models.Data).filter_by(id=form_data.id).first().id
     name = session.query(models.Data).filter_by(id=id).first().name
     url   = session.query(models.Data).filter_by(id=id).first().url

     if hasattr (session.query(models.Data).filter_by(id=form_data.id).first(), 'id'):
             return ({
          'id': id,
 
          'name': name,
          'url': url,

          } )
     else:
        return ("neeksiste")
       

