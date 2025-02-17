from http import HTTPStatus
from math import ceil
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.models import Product, ShoppingList, User
from backend.schemas import (
    Message,
    ProductList,
    ProductPublic,
    ProductSchema,
    UpdateProductSchema,
)
from backend.security import get_current_user

T_Session = Annotated[Session, Depends(get_session)]
T_CurrentUser = Annotated[User, Depends(get_current_user)]

router = APIRouter(prefix='/products', tags=['products'])


@router.post(
    '/{list_id}', status_code=HTTPStatus.CREATED, response_model=ProductPublic
)
def create_product(
    list_id: int,
    product: ProductSchema,
    session: T_Session,
    user: T_CurrentUser,
):
    db_list = session.scalar(
        select(ShoppingList).where(
            ShoppingList.id == list_id, ShoppingList.user_id == user.id
        )
    )

    if not db_list:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='List not found',
        )

    db_product = Product(
        list_id=list_id,
        name=product.name,
        quantity=product.quantity,
    )

    session.add(db_product)
    session.commit()
    session.refresh(db_product)

    return db_product


@router.put('/{product_id}', response_model=ProductPublic)
def update_product(
    product_id: int,
    product: UpdateProductSchema,
    session: T_Session,
    user: T_CurrentUser,
):
    db_product = session.scalar(
        select(Product)
        .join(ShoppingList, Product.list_id == ShoppingList.id)
        .where(
            Product.id == product_id,
            ShoppingList.user_id == user.id,
        )
    )

    if not db_product:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Product not found',
        )

    for key, value in product.model_dump(exclude_unset=True).items():
        setattr(db_product, key, value)

    if product.quantity is not None and db_product.brands:
        for brand in db_product.brands:
            brand.unity_cost = brand.price / brand.quantity
            brand.predicted_cost = (
                ceil(product.quantity / brand.quantity) * brand.price
            )

            db_product.best_offer = min(
                db_product.best_offer, brand.unity_cost
            )

            db_product.best_price = min(
                db_product.best_price, brand.predicted_cost
            )

    session.add(db_product)
    session.commit()
    session.refresh(db_product)

    return db_product


@router.delete('/{product_id}', response_model=Message)
def delete_product(
    product_id: int,
    session: T_Session,
    user: T_CurrentUser,
):
    db_product = session.scalar(
        select(Product)
        .join(ShoppingList, Product.list_id == ShoppingList.id)
        .where(
            Product.id == product_id,
            ShoppingList.user_id == user.id,
        )
    )

    if not db_product:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Product not found',
        )

    session.delete(db_product)
    session.commit()

    return {'message': 'Product has been deleted successfully.'}


@router.get('/{product_id}', response_model=ProductPublic)
def get_product_by_id(
    product_id: int,
    session: T_Session,
    user: T_CurrentUser,
):
    db_product = session.scalar(
        select(Product)
        .join(ShoppingList, Product.list_id == ShoppingList.id)
        .where(
            Product.id == product_id,
            ShoppingList.user_id == user.id,
        )
    )

    if not db_product:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Product not found',
        )

    return db_product


@router.get('/list/{list_id}', response_model=ProductList)
def get_products_by_list(
    list_id: int,
    session: T_Session,
    user: T_CurrentUser,
):
    db_products = session.scalars(
        select(Product)
        .join(ShoppingList)
        .where(
            Product.list_id == list_id,
            ShoppingList.user_id == user.id,
        )
    )

    return {'products': db_products}
