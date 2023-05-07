from decimal import Decimal
from email.mime import image
import string
from tkinter.tix import COLUMN
from xmlrpc.client import Boolean
from sqlalchemy import Column, Integer, String, ForeignKey, Float, BOOLEAN
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
    admin = Column(BOOLEAN())

class Fields(Base):
    __tablename__ = 'fields'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256))
    #children = relationship("categories")

class Categories(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256))  
    field_id = Column (Integer, ForeignKey("fields.id"))
    #if field_id == '1':
     #   children = relationship("foto_data")

class Data(Base):
    __tablename__ = 'data'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256))
    url = Column(String(256))
    image = Column(String(256)) 
    latitude = Column(Float)
    longitude = Column(Float)
    field_id = Column (Integer, ForeignKey("fields.id"))
    categories_id = Column (Integer, ForeignKey("categories.id"))

class ReportedQuestions(Base):
    __tablename__ = 'reported_questions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    data_id = Column(Integer, ForeignKey("data.id"))
    field_id = Column(Integer, ForeignKey("fields.id"))
    votes = Column(Integer, default=int(1))
    #children = relationship("categories")

class Quizes(Base):
    __tablename__ = 'quizes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    name = Column(String(256), nullable=True)
    explanation = Column(String(256), nullable=True)
    #children = relationship("categories")  

class AllQuizQuestions(Base):
    __tablename__ = 'all_quiz_questions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    field_id = Column(Integer, ForeignKey("fields.id"), nullable=False)
    data_id = Column(Integer, ForeignKey("data.id"), nullable=False)
    type = Column(String(256), nullable=False)
    answer_1 = Column(String(256), nullable=True)
    answer_2 = Column(String(256), nullable=True)
    answer_3 = Column(String(256), nullable=True)
    quiz_id = Column(Integer, ForeignKey("quizes.id"), nullable=False)
    #children = relationship("categories")

class PlayerRooms(Base):
    __tablename__ = 'player_rooms'
    id = Column(Integer, primary_key=True, autoincrement=True)
    #quiz_id = Column(Integer, ForeignKey("quizes.id"), nullable=True)
    code = Column(Integer)
    people_count = Column(Integer)