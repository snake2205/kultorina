# KULTORINA

Kultorina is a website where you can make and play quizes about the culture of Latvia. The questions are made automatically, by using open data offered by the National Library of Latvia. 

The website uses FastAPI for backend and React.js for frontend as well as MySQL server.

To install the website you need to:
1. install backend dependancies (see requirements.txt) and frontend dependencies (see package.json).
2. install MySQL workbench. Make a new connection and database. Change the BUrl variable in config.py accordingly.
3. start the backend and frontend applications using command prompt (backend => "uvicorn main:app --reload";frontend => "npm start")



