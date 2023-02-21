from fastapi import APIRouter, Depends
from fastapi import Query
from typing import Optional

from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal, get_session
from models import models

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    responses={404: {"description": "Not found"}},
)

Base.metadata.create_all(engine)

@router.get("/data_upload")
def append(session: Session = Depends(get_session)):
    items = session.query(models.Item).all()
    return items


