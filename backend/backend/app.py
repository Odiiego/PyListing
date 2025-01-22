from fastapi import FastAPI

app = FastAPI()


@app.get('/', response_model=str)
def read_root():
    return 'PyListing é um aplicativo desenvolvido com FastAPI que facilita a gestão de listas de compras enquanto ajuda você a comparar marcas e encontrar os melhores preços.'
