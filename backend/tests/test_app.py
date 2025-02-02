from http import HTTPStatus


def default_should_return_a_message(client):
    response = client.get('/')

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'message': 'https://github.com/Odiiego/PyListing'
    }
