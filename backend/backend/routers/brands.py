from http import HTTPStatus
from math import ceil
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.models import Brand, Product, ShoppingList, User
from backend.schemas import BrandList, BrandPublic, BrandSchema, Message
from backend.security import get_current_user

T_Session = Annotated[Session, Depends(get_session)]
T_CurrentUser = Annotated[User, Depends(get_current_user)]

router = APIRouter(prefix='/brands', tags=['brands'])


@router.post(
    '/{product_id}',
    status_code=HTTPStatus.CREATED,
    response_model=BrandPublic,
)
def create_brand(
    product_id: int,
    brand: BrandSchema,
    session: T_Session,
    user: T_CurrentUser,
):
    db_product = session.scalar(
        select(Product).where(
            Product.id == product_id, ShoppingList.user_id == user.id
        )
    )

    if db_product.shopping_list.user_id != user.id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN,
            detail='Not enough permissions',
        )

    if not db_product:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Product not found',
        )

    db_brand = Brand(
        product_id=product_id,
        name=brand.name,
        quantity=brand.quantity,
        price=brand.price,
        unity_cost=brand.price / brand.quantity,
        predicted_cost=ceil(float(db_product.quantity) / brand.quantity)
        * brand.price,
    )

    if (
        db_product.best_offer is None
        or db_product.best_offer > db_brand.unity_cost
    ):
        db_product.best_offer = db_brand.unity_cost

    if (
        db_product.best_price is None
        or db_product.best_price > db_brand.predicted_cost
    ):
        db_product.best_price = db_brand.predicted_cost

    session.add(db_brand)
    session.commit()
    session.refresh(db_brand)

    return db_brand


@router.patch('/{brand_id}', response_model=BrandPublic)
def update_brand(
    brand_id: int,
    brand: BrandSchema,
    session: T_Session,
    user: T_CurrentUser,
):
    db_brand = session.scalar(
        select(Brand).where(
            Brand.id == brand_id,
            Product.id == Brand.product_id,
            ShoppingList.user_id == user.id,
        )
    )

    if not db_brand.product.shopping_list.user_id == user.id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN,
            detail='Not enough permissions',
        )

    if not db_brand:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Brand not found',
        )

    for key, value in brand.model_dump(exclude_unset=True).items():
        setattr(db_brand, key, value)

    db_brand.unity_cost = brand.price / brand.quantity
    db_brand.predicted_cost = (
        ceil(float(db_brand.product.quantity) / brand.quantity) * brand.price
    )

    db_product = session.scalar(
        select(Product).where(Product.id == db_brand.product_id)
    )

    if (
        db_product.best_offer is None
        or db_product.best_offer > db_brand.unity_cost
    ):
        db_product.best_offer = db_brand.unity_cost

    if (
        db_product.best_price is None
        or db_product.best_price > db_brand.predicted_cost
    ):
        db_product.best_price = db_brand.predicted_cost

    session.add(db_brand)
    session.commit()
    session.refresh(db_brand)

    return db_brand


@router.delete('/{brand_id}', response_model=Message)
def delete_brand(brand_id: int, session: T_Session, user: T_CurrentUser):
    db_brand = session.scalar(
        select(Brand).where(
            Brand.id == brand_id,
            Product.id == Brand.product_id,
            ShoppingList.user_id == user.id,
        )
    )

    if not db_brand.product.shopping_list.user_id == user.id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN,
            detail='Not enough permissions',
        )

    if not db_brand:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Brand not found',
        )

    session.delete(db_brand)

    db_product = session.scalar(
        select(Product).where(Product.id == db_brand.product_id)
    )

    db_product.best_offer = None
    db_product.best_price = None

    if db_product.brands:
        for brand in db_product.brands:
            if (
                db_product.best_offer is None
                or db_product.best_offer > brand.unity_cost
            ):
                db_product.best_offer = brand.unity_cost

            if (
                db_product.best_price is None
                or db_product.best_price > brand.predicted_cost
            ):
                db_product.best_price = brand.predicted_cost

    session.commit()

    return {'message': 'Brand has been deleted successfully.'}


@router.get('/{brand_id}', response_model=BrandPublic)
def get_brand_by_id(brand_id: int, session: T_Session, user: T_CurrentUser):
    db_brand = session.scalar(
        select(Brand).where(
            Brand.id == brand_id,
            Product.id == Brand.product_id,
            ShoppingList.user_id == user.id,
        )
    )

    if not db_brand.product.shopping_list.user_id == user.id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN,
            detail='Not enough permissions',
        )

    if not db_brand:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Brand not found',
        )

    return db_brand


@router.get('/product/{product_id}', response_model=BrandList)
def get_brands_by_product(
    product_id: int, session: T_Session, user: T_CurrentUser
):
    db_brands = session.scalars(
        select(Brand)
        .join(Product)
        .where(
            Brand.product_id == product_id,
            Product.list_id == ShoppingList.id,
            ShoppingList.user_id == user.id,
        )
    )

    return {'brands': db_brands}
