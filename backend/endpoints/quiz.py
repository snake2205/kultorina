from fastapi import APIRouter, Depends
from fastapi import Query
from typing import Optional

from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal, get_session
from models import models
from schemas.auth_schemas import DataUpload

router = APIRouter(
    prefix="/quiz",
    tags=["Quiz"],
    responses={404: {"description": "Not found"}},
)

Base.metadata.create_all(engine)

@router.post("/make_quiz")
def append(
    form_data: DataUpload = Depends(),    
    session: Session = Depends(get_session)
    ):
    return form_data.categories.filename


