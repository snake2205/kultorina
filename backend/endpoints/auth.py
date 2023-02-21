from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import Query, Form
from typing import Optional, Union

from database import Base, engine, SessionLocal, get_session
from sqlalchemy.orm import Session

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from schemas.auth_schemas import Token, TokenData, User, UserSignUp
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

@router.post("/signup", response_model=Token)
def SignUp(form_data: UserSignUp = Depends(),  session: Session = Depends(get_session)):
    if session.query(models.Users).filter(models.Users.email == form_data.email).first() is not None and session.query(models.Users).filter(models.Users.username == form_data.username).first() is not None:
        raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="User with this email or username already exists")
    else:
        user = models.Users(username = form_data.username, password = auth_methods.get_password_hash(form_data.password), email = form_data.email)
        session.add(user)
        session.commit()
        access_token = auth_methods.create_access_token(
            data={"sub": user.username}
        )
        return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me/")
async def read_users_me(current_user: User = Depends(auth_methods.get_current_user)):
    return current_user



