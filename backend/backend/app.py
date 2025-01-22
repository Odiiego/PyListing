from fastapi import FastAPI

app = FastAPI()


@app.get('/', response_model=str)
def read_root():
    return 'https://github.com/Odiiego/PyListing'
