from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.models import ShoppingList, User
from backend.schemas import (
    Message,
    ShoppingListList,
    ShoppingListPublic,
    ShoppingListSchema,
)
from backend.security import get_current_user

router = APIRouter(prefix='/lists', tags=['lists'])

T_Session = Annotated[Session, Depends(get_session)]
T_CurrentUser = Annotated[User, Depends(get_current_user)]


@router.post(
    '/{user_id}',
    response_model=ShoppingListPublic,
    status_code=HTTPStatus.CREATED,
)
def create_list(
    user_id: int,
    list: ShoppingListSchema,
    session: T_Session,
    current_user: T_CurrentUser,
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN,
            detail='Not enough permissions',
        )

    db_list = ShoppingList(
        name=list.name,
        user_id=user_id,
    )

    session.add(db_list)
    session.commit()
    session.refresh(db_list)

    return db_list


@router.patch('/{list_id}', response_model=ShoppingListPublic)
def update_list(
    list_id: int,
    list: ShoppingListSchema,
    session: T_Session,
    user: T_CurrentUser,
):
    db_list = session.scalar(
        select(ShoppingList).where(
            ShoppingList.user_id == user.id, ShoppingList.id == list_id
        )
    )

    if not db_list:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='List not found',
        )

    for key, value in list.model_dump(exclude_unset=True).items():
        setattr(db_list, key, value)

    session.add(db_list)
    session.commit()
    session.refresh(db_list)

    return db_list


@router.delete('/{list_id}', response_model=Message)
def delete_list(
    list_id: int,
    session: T_Session,
    user: T_CurrentUser,
):
    db_list = session.scalar(
        select(ShoppingList).where(
            ShoppingList.user_id == user.id, ShoppingList.id == list_id
        )
    )

    if not db_list:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='List not found',
        )

    session.delete(db_list)
    session.commit()

    return {'message': 'List has been deleted successfully.'}


@router.get('/', response_model=ShoppingListList)
def get_lists_by_user(user: T_CurrentUser, session: T_Session):
    db_lists = session.scalars(
        select(ShoppingList).where(ShoppingList.user_id == user.id)
    )

    return {'shopping_lists': db_lists}


@router.get('/{list_id}', response_model=ShoppingListPublic)
def get_list_by_id(
    list_id: int,
    session: T_Session,
    user: T_CurrentUser,
):
    db_list = session.scalar(
        select(ShoppingList).where(
            ShoppingList.user_id == user.id, ShoppingList.id == list_id
        )
    )

    if not db_list:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='List not found',
        )

    session.add(db_list)
    session.commit()
    session.refresh(db_list)

    return db_list
