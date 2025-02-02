from http import HTTPStatus

from backend.models import ShoppingList
from tests.conftest import ShoppingListFactory


def test_create_list(client, user, token, mock_db_time):
    with mock_db_time(model=ShoppingList) as time:
        response = client.post(
            f'/lists/{user.id}',
            headers={'Authorization': f'Bearer {token}'},
            json={
                'name': 'test',
            },
        )

    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {
        'id': 1,
        'user_id': user.id,
        'name': 'test',
        'products': [],
        'created_at': time.isoformat(),
        'updated_at': time.isoformat(),
    }


def test_create_list_without_permission(client, user, other_user, token):
    response = client.post(
        f'/lists/{other_user.id}',
        headers={'Authorization': f'Bearer {token}'},
        json={
            'name': 'test',
        },
    )

    assert response.status_code == HTTPStatus.FORBIDDEN
    assert response.json() == {'detail': 'Not enough permissions'}


def test_update_list(client, token, shopping_list):
    response = client.put(
        f'/lists/{shopping_list.id}',
        headers={'Authorization': f'Bearer {token}'},
        json={
            'name': 'test',
        },
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json()['name'] == 'test'


def test_update_list_without_permission(client, session, token, other_user):
    shopping_list = ShoppingListFactory(user_id=other_user.id)

    session.add(shopping_list)
    session.commit()

    response = client.put(
        f'/lists/{shopping_list.id}',
        headers={'Authorization': f'Bearer {token}'},
        json={
            'name': 'test',
        },
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Shopping list not found'}


def test_delete_list(client, user, shopping_list, token):
    response = client.delete(
        f'/lists/{shopping_list.id}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'message': 'Shopping List has been deleted successfully.'
    }


def test_delete_list_without_permission(client, session, token, other_user):
    shopping_list = ShoppingListFactory(user_id=other_user.id)

    session.add(shopping_list)
    session.commit()

    response = client.delete(
        f'/lists/{shopping_list.id}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Shopping list not found'}


def test_get_lists_by_user(mock_db_time, session, client, token, user):
    with mock_db_time(model=ShoppingList) as time:
        session.add(
            ShoppingListFactory.create(
                user_id=user.id,
                name='Test',
            )
        )
        session.commit()

    response = client.get(
        '/lists/', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json()['shopping_lists'] == [
        {
            'id': 1,
            'user_id': user.id,
            'name': 'Test',
            'created_at': time.isoformat(),
            'updated_at': time.isoformat(),
        }
    ]


def test_get_lists_by_id(mock_db_time, session, client, token, user):
    with mock_db_time(model=ShoppingList) as time:
        session.add(
            ShoppingListFactory.create(
                user_id=user.id,
                name='Test',
            )
        )
        session.commit()

    response = client.get(
        '/lists/1', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'id': 1,
        'user_id': user.id,
        'name': 'Test',
        'products': [],
        'created_at': time.isoformat(),
        'updated_at': time.isoformat(),
    }


def test_get_lists_with_invalid_id(client, token, user):
    response = client.get(
        '/lists/1', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
