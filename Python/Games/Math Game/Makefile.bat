IF NOT EXIST "env" (
@ ECHO Initializing virtual enviroment...
@ python -m venv venv   
@ ECHO Initialized virtual enviroment
@ ECHO Activating virtual enviroment..
@ venv\Scripts\activate
@ ECHO Activated virtual enviroment
@ ECHO Installing requirements...
@ python -m pip install -r requirements.txt
@ ECHO Installed requirements
)
@ ECHO Playing the game...
@ cd mathgame && python __init__.py
