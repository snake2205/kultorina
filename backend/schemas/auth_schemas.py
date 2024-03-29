from pydantic import BaseModel
from typing import Union
from fastapi import Form, File, UploadFile

from dataclasses import dataclass

class Token(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    username: str
    email: Union[str, None] = None
    id: Union[int, None]= None

@dataclass
class UserSignUp:
    username: str = Form(...)
    password: str = Form(...)
    email: str= Form(...)