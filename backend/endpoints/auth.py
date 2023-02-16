from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import Query
from typing import Optional, Union

from database import Base, engine, SessionLocal, get_session
from sqlalchemy.orm import Session

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from schemas.auth_schemas import Token, TokenData, User
from schemas.user import LoginItem
from functions.auth_functions import auth_methods

from models import models

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
    responses={404: {"description": "Not found"}},
)

Base.metadata.create_all(engine)

@router.get("/")
def getItems(session: Session = Depends(get_session)):
    items = session.query(models.Users).get(1)
    return auth_methods.get_password_hash("root")

@router.post("/login", response_model=Token)
def Login(
    form_data: OAuth2PasswordRequestForm = Depends()    ,
    session: Session = Depends(get_session)
    ):
    user = auth_methods.authenticate_user( session, form_data.username, form_data.password)
    if user == False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth_methods.create_access_token(
        data={"sub": user.username}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me/")
async def read_users_me(current_user: User = Depends(auth_methods.get_current_user)):
    return current_user



