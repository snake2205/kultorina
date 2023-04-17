from pydantic import BaseModel
from typing import Union
from fastapi import Form, File, UploadFile

from dataclasses import dataclass

@dataclass
class DataUpload:
    categories: UploadFile = File(...)
    data: UploadFile = File(...)
    field: str= Form(...)