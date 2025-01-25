from fastapi import FastAPI

from backend.routers import auth, lists, products, users

app = FastAPI()

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(lists.router)
app.include_router(products.router)


@app.get('/', response_model=str)
def default():
    return 'https://github.com/Odiiego/PyListing'
