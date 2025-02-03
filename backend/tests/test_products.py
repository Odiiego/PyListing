from http import HTTPStatus

from backend.models import Product
from tests.conftest import ProductFactory


def test_create_product(mock_db_time, client, shopping_list, token):
    with mock_db_time(model=Product) as time:
        response = client.post(
            f'/products/{shopping_list.id}',
            headers={'Authorization': f'Bearer {token}'},
            json={'list_id': shopping_list.id, 'name': 'test', 'quantity': 1},
        )

    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {
        'id': 1,
        'list_id': shopping_list.id,
        'name': 'test',
        'quantity': 1,
        'brands': [],
        'best_offer': None,
        'best_price': None,
        'created_at': time.isoformat(),
        'updated_at': time.isoformat(),
    }


def test_create_product_without_permission(
    client, shopping_list, other_user_token
):
    response = client.post(
        f'/products/{shopping_list.id}',
        headers={'Authorization': f'Bearer {other_user_token}'},
        json={'list_id': shopping_list.id, 'name': 'test', 'quantity': 1},
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'List not found'}


def test_create_product_with_invalid_id(
    client, shopping_list, other_user_token
):
    response = client.post(
        f'/products/{9999}',
        headers={'Authorization': f'Bearer {other_user_token}'},
        json={'list_id': shopping_list.id, 'name': 'test', 'quantity': 1},
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'List not found'}


def test_update_product(client, product, token):
    quantity = 5
    response = client.put(
        f'/products/{product.id}',
        headers={'Authorization': f'Bearer {token}'},
        json={'quantity': quantity},
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json()['quantity'] == quantity


def test_update_product_without_permission(client, product, other_user_token):
    response = client.put(
        f'/products/{product.id}',
        headers={'Authorization': f'Bearer {other_user_token}'},
        json={'quantity': 5},
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Product not found'}


def test_update_product_with_invalid_id(client, other_user_token):
    response = client.put(
        f'/products/{9999}',
        headers={'Authorization': f'Bearer {other_user_token}'},
        json={'quantity': 5},
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Product not found'}


def test_delete_product(client, product, token):
    response = client.delete(
        f'/products/{product.id}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'message': 'Product has been deleted successfully.'
    }


def test_delete_product_without_permission(client, product, other_user_token):
    response = client.delete(
        f'/products/{product.id}',
        headers={'Authorization': f'Bearer {other_user_token}'},
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Product not found'}


def test_delete_product_with_invalid_id(client, token):
    response = client.delete(
        f'/products/{9999}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Product not found'}


def test_get_product(mock_db_time, session, client, token, shopping_list):
    with mock_db_time(model=Product) as time:
        session.add(ProductFactory.create(name='test'))
        session.commit()

    response = client.get(
        '/products/1', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'id': 1,
        'list_id': 1,
        'name': 'test',
        'quantity': 1,
        'brands': [],
        'best_offer': None,
        'best_price': None,
        'created_at': time.isoformat(),
        'updated_at': time.isoformat(),
    }


def test_get_product_without_permission(
    session, client, other_user_token, shopping_list
):
    session.add(ProductFactory.create(name='test'))
    session.commit()

    response = client.get(
        '/products/1', headers={'Authorization': f'Bearer {other_user_token}'}
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Product not found'}


def test_get_product_with_invalid_id(client, token, shopping_list):
    response = client.get(
        f'/products/{9999}', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Product not found'}


def test_get_product_by_list(
    mock_db_time, session, client, token, shopping_list
):
    with mock_db_time(model=Product) as time:
        session.add(ProductFactory.create(name='test'))
        session.commit()

    response = client.get(
        f'/products/list/{shopping_list.id}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json()['products'] == [
        {
            'id': 1,
            'list_id': 1,
            'name': 'test',
            'quantity': 1,
            'brands': [],
            'best_offer': None,
            'best_price': None,
            'created_at': time.isoformat(),
            'updated_at': time.isoformat(),
        }
    ]


def test_get_product_by_list_without_permission(
    session, client, other_user_token, shopping_list
):
    session.add(ProductFactory.create())
    session.commit()

    response = client.get(
        f'/products/list/{shopping_list.id}',
        headers={'Authorization': f'Bearer {other_user_token}'},
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json()['products'] == []
    assert len(response.json()['products']) == 0


def test_get_product_by_list_with_invalid_id(
    session, client, other_user_token, shopping_list
):
    session.add(ProductFactory.create())
    session.commit()

    response = client.get(
        f'/products/list/{9999}',
        headers={'Authorization': f'Bearer {other_user_token}'},
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json()['products'] == []
    assert len(response.json()['products']) == 0
