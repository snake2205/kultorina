from fastapi import APIRouter, Depends
from fastapi import Query
from typing import Optional

from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
from models import models

router = APIRouter(
    prefix="/users",
    tags=["Users"],
    responses={404: {"description": "Not found"}},
)

Base.metadata.create_all(engine)
def get_session():
    session = SessionLocal()
    try:    
        yield session
    finally:
        session.close()

@router.get("/")
def getItems(session: Session = Depends(get_session)):
    items = session.query(models.Item).all()
    return items


