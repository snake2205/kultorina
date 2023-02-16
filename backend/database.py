from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import DBUrl
#Create sqlite engine instance
engine = create_engine(DBUrl)
#Create declaritive base meta instance
Base = declarative_base()
#Create session local class for session maker
SessionLocal = sessionmaker(bind=engine,	expire_on_commit=False)

def get_session():
    session = SessionLocal()
    try:    
        yield session
    finally:
        session.close()