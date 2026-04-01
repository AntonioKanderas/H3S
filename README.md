# Heroes Stats System

System do analizy statystyk rozgrywek w grze turowej (Heroes III).
Backend API oraz prosty frontend do prezentacji danych.


## Tech Stack

- Backend: Django, Django REST Framework
- Frontend: Node.js (lub React jeśli używasz)
- Database: SQLite / PostgreSQL


## Features

- Rejestracja i analiza rozgrywek
- API REST do pobierania statystyk
- Agregacja wyników graczy
- Prosty frontend do wizualizacji danych


## Project Structure

heroes-stats/
│
├── backend/   (Django + DRF API)
├── frontend/  (Node.js UI)


## Backend setup

cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


## Frontend setup

cd frontend
npm install
npm start


## API Endpoints

GET /api/games/
GET /api/factions/
GET /api/heroes/
GET /api/heroes/(id)/

## Screenshots

![game-stats](./screenshots/game-stats.png)
![faction-stats](./screenshots/faction-stats.png)
