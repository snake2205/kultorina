from decimal import Decimal
from email.mime import image
from tkinter.tix import COLUMN
from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import declarative_base, relationship
from database import Base

class Item(Base):
    __tablename__ = 'items'
    id = Column(Integer, primary_key=True)
    task = Column(String(256))  

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String(100))
    password = Column(String(100))
    email = Column(String(100))

class fields(Base):
    __tablename__ = 'fields'
    id = Column(Integer, primary_key=True)
    name = Column(String(256))  
    children = relationship("categories")

class categories(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    name = Column(String(256))  
    field_id = Column (Integer, ForeignKey("fields.id"))
    if field_id == '1':
        children = relationship("fotodata")

class fotodata(Base):
    __tablename__ = 'foto_data'
    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    url = Column(String(256))
    latitude = Column(Float)
    longitude = Column(Float)
    field_id = Column (Integer, ForeignKey("fields.id"))
    categories_id = Column (Integer, ForeignKey("categories.id"))