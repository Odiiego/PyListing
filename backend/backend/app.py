from fastapi import FastAPI

from backend.routers import auth, lists, users

app = FastAPI()

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(lists.router)


@app.get('/', response_model=str)
def read_root():
    return 'https://github.com/Odiiego/PyListing'
