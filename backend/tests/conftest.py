from contextlib import contextmanager
from datetime import datetime
from math import ceil

import factory
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import Session
from testcontainers.postgres import PostgresContainer

from backend.app import app
from backend.database import get_session
from backend.models import Brand, Product, ShoppingList, User, table_registry
from backend.security import get_password_hash


@pytest.fixture
def client(session):
    def get_session_override():
        return session

    with TestClient(app) as client:
        app.dependency_overrides[get_session] = get_session_override
        yield client

    app.dependency_overrides.clear()


@contextmanager
def _mock_db_time(*, model, time=datetime(2024, 1, 1)):
    def fake_time_hook(mapper, connection, target):
        if hasattr(target, 'created_at'):
            target.created_at = time
            target.updated_at = time

    event.listen(model, 'before_insert', fake_time_hook)

    yield time

    event.remove(model, 'before_insert', fake_time_hook)


@pytest.fixture
def mock_db_time():
    return _mock_db_time


@pytest.fixture(scope='session')
def engine():
    with PostgresContainer('postgres:16', driver='psycopg') as postgres:
        _engine = create_engine(postgres.get_connection_url())

        with _engine.begin():
            yield _engine


@pytest.fixture
def session(engine):
    table_registry.metadata.create_all(engine)

    with Session(engine) as session:
        yield session
        session.rollback()

    table_registry.metadata.drop_all(engine)


@pytest.fixture
def user(session):
    password = 'testtest'
    user = UserFactory(
        password=get_password_hash(password),
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    user.clean_password = password

    return user


@pytest.fixture
def shopping_list(session, user):
    shopping_list = ShoppingListFactory()
    session.add(shopping_list)
    session.commit()
    session.refresh(shopping_list)

    return shopping_list


@pytest.fixture
def product(session, user, shopping_list):
    product = ProductFactory(
        quantity=2,
        best_price=10.79,
        best_offer=11.79 / 3,
    )
    product.brands = [
        BrandFactory(
            product_id=product.id,
            quantity=2,
            price=10.79,
            name='garrafa 2L',
            unity_cost=10.79 / 2,
            predicted_cost=ceil(2 / 2) * 10.79,
        ),
        BrandFactory(
            product_id=product.id,
            quantity=3,
            price=11.79,
            name='garrafa 3L',
            unity_cost=11.79 / 3,
            predicted_cost=ceil(2 / 3) * 11.79,
        ),
    ]
    session.add(product)
    session.commit()
    session.refresh(product)

    return product


@pytest.fixture
def brand(session, user, shopping_list, product):
    brand = BrandFactory()
    session.add(brand)
    session.commit()
    session.refresh(brand)

    return brand


@pytest.fixture
def other_user(session, user):
    password = 'testtest'
    other_user = UserFactory(
        password=get_password_hash(password),
    )
    session.add(other_user)
    session.commit()
    session.refresh(other_user)

    other_user.clean_password = password

    return other_user


@pytest.fixture
def token(client, user):
    response = client.post(
        '/auth/token',
        data={'username': user.username, 'password': user.clean_password},
    )
    return response.json()['access_token']


@pytest.fixture
def other_user_token(client, other_user):
    response = client.post(
        '/auth/token',
        data={
            'username': other_user.username,
            'password': other_user.clean_password,
        },
    )
    return response.json()['access_token']


class UserFactory(factory.Factory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f'test{n}')
    email = factory.LazyAttribute(lambda obj: f'{obj.username}@test.com')
    password = factory.LazyAttribute(lambda obj: f'{obj.username}@example.com')


class ShoppingListFactory(factory.Factory):
    class Meta:
        model = ShoppingList

    name = factory.Sequence(lambda n: f'list{n}')
    user_id = 1


class ProductFactory(factory.Factory):
    class Meta:
        model = Product

    name = factory.Sequence(lambda n: f'product{n}')
    list_id = 1
    quantity = 1


class BrandFactory(factory.Factory):
    class Meta:
        model = Brand

    name = factory.Sequence(lambda n: f'brand{n}')
    product_id = 1
    quantity = 1.0
    price = 10.0
    unity_cost = 10.0
    predicted_cost = 20.0
