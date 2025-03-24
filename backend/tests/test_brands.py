from http import HTTPStatus

from backend.models import Brand
from tests.conftest import BrandFactory


def test_create_brand(mock_db_time, client, product, token):
    with mock_db_time(model=Brand) as time:
        response = client.post(
            f'/brands/{product.id}',
            headers={'Authorization': f'Bearer {token}'},
            json={
                'product_id': product.id,
                'name': 'test',
                'quantity': 1,
                'price': 10,
            },
        )

    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {
        'id': 3,
        'product_id': product.id,
        'name': 'test',
        'quantity': '1.00',
        'price': '10.00',
        'unity_cost': '10.00',
        'predicted_cost': '20.00',
        'created_at': time.isoformat(),
        'updated_at': time.isoformat(),
    }


def test_create_brand_without_permission(client, product, other_user_token):
    response = client.post(
        f'/brands/{product.id}',
        headers={'Authorization': f'Bearer {other_user_token}'},
        json={
            'product_id': product.id,
            'name': 'test',
            'quantity': 1,
            'price': 10,
        },
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Product not found'}


def test_create_brand_with_invalid_id(client, token):
    response = client.post(
        f'/brands/{9999}',
        headers={'Authorization': f'Bearer {token}'},
        json={
            'product_id': 9999,
            'name': 'test',
            'quantity': 1,
            'price': 10,
        },
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Product not found'}


def test_update_brand(client, brand, token):
    quantity = 0.1
    response = client.put(
        f'/brands/{brand.id}',
        headers={'Authorization': f'Bearer {token}'},
        json={'quantity': quantity},
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json()['quantity'] == '0.10'
    assert response.json()['unity_cost'] == '100.00'
    assert response.json()['predicted_cost'] == '200.00'


def test_update_brand_without_permission(client, brand, other_user_token):
    response = client.put(
        f'/brands/{brand.id}',
        headers={'Authorization': f'Bearer {other_user_token}'},
        json={'quantity': 0.1},
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Brand not found'}


def test_update_brand_with_invalid_id(client, token):
    response = client.put(
        f'/brands/{9999}',
        headers={'Authorization': f'Bearer {token}'},
        json={'quantity': 0.1},
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Brand not found'}


def test_delete_brand_best_offer(client, token, product):
    assert float(product.best_price) == 10.79  # noqa: PLR2004
    assert float(product.best_offer) == 3.93  # noqa: PLR2004

    response = client.delete(
        f'/brands/{2}', headers={'Authorization': f'Bearer {token}'}
    )

    assert float(product.best_price) == 10.79  # noqa: PLR2004
    assert float(product.best_offer) == 5.40  # noqa: PLR2004

    response = client.delete(
        f'/brands/{1}', headers={'Authorization': f'Bearer {token}'}
    )

    assert product.best_price is None
    assert product.best_offer is None

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'message': 'Brand has been deleted successfully.'
    }


def test_delete_brand_best_price(client, token, product):
    assert float(product.best_price) == 10.79  # noqa: PLR2004
    assert float(product.best_offer) == 3.93  # noqa: PLR2004
    response = client.delete(
        f'/brands/{1}', headers={'Authorization': f'Bearer {token}'}
    )
    assert float(product.best_price) == 11.79  # noqa: PLR2004
    assert float(product.best_offer) == 3.93  # noqa: PLR2004
    response = client.delete(
        f'/brands/{2}', headers={'Authorization': f'Bearer {token}'}
    )
    assert product.best_price is None
    assert product.best_offer is None

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'message': 'Brand has been deleted successfully.'
    }


def test_delete_brand_without_permission(client, other_user_token):
    response = client.delete(
        f'/brands/{1}', headers={'Authorization': f'Bearer {other_user_token}'}
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Brand not found'}


def test_delete_brand_with_invalid_id(client, token):
    response = client.delete(
        f'/brands/{9999}', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Brand not found'}


def test_get_brand(mock_db_time, session, client, brand, token):
    with mock_db_time(model=Brand) as time:
        session.add(BrandFactory.create(name='test'))
        session.commit()

    response = client.get(
        f'/brands/{4}', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'id': 4,
        'product_id': 1,
        'name': 'test',
        'quantity': '1.00',
        'price': '10.00',
        'unity_cost': '10.00',
        'predicted_cost': '20.00',
        'created_at': time.isoformat(),
        'updated_at': time.isoformat(),
    }


def test_get_brand_without_permission(client, brand, other_user_token):
    response = client.get(
        f'/brands/{1}', headers={'Authorization': f'Bearer {other_user_token}'}
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Brand not found'}


def test_get_brand_with_invalid_id(client, brand, token):
    response = client.get(
        f'/brands/{9999}', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'Brand not found'}


def test_get_brand_by_product(client, product, token):
    response = client.get(
        f'/brands/product/{product.id}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.OK
    assert len(response.json()['brands']) == 2  # noqa: PLR2004


def test_get_brand_by_product_without_permission(
    client, product, other_user_token
):
    response = client.get(
        f'/brands/product/{product.id}',
        headers={'Authorization': f'Bearer {other_user_token}'},
    )

    assert response.status_code == HTTPStatus.OK
    assert len(response.json()['brands']) == 0


def test_get_brand_by_product_with_invalid_id(client, product, token):
    response = client.get(
        f'/brands/product/{9999}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.OK
    assert len(response.json()['brands']) == 0
