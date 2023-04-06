from pydantic import BaseModel
from typing import Union
from fastapi import Form, File, UploadFile

from dataclasses import dataclass

@dataclass
class MakeQuiz:
    field: str= Form(...)
    question: str=Form(...)

@dataclass
class ReportQuestion:
    field: str= Form(...)
    id: int=Form(...)