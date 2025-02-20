from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers import auth, brands, lists, products, users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(lists.router)
app.include_router(products.router)
app.include_router(brands.router)


@app.get('/', response_model=str)
def default():  # pragma: nocover
    return 'https://github.com/Odiiego/PyListing'
