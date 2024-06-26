from fastapi.testclient import TestClient
from fastapi import FastAPI
from u_todo_app import setting
from sqlmodel import SQLModel, create_engine, Session
from u_todo_app.main import app, get_session
import pytest

connection_string: str = str(setting.TEST_DATABASE_URL).replace("postgresql", "postgresql+psycopg")
engine = create_engine(connection_string, connect_args={"sslmode": "require"}, pool_recycle=300, pool_size=10)


@pytest.fixture(scope="module", autouse=True)
def get_db_session():
    SQLModel.metadata.create_all(engine)
    yield Session(engine)

@pytest.fixture(scope="function")
def test_app(get_db_session):
    def test_session():
        yield get_db_session
    app.dependency_overrides[get_session] = test_session
    with TestClient(app=app) as client:
        yield client


def test_root ():
    client = TestClient(app=app)
    response = client.get('/')
    data = response.json()
    assert response.status_code == 200
    assert data == {"message": "Welcome to U Todo App"}

def test_create_todo(test_app):
    test_todo = {"content":"Create todo test", "is_completed":False}
    response = test_app.post('/todos/', json=test_todo)
    data = response.json()
    assert response.status_code == 200
    assert data["content"] == test_todo["content"]

def test_get_all(test_app):
    test_todo = {"content":"Get All Todos test", "is_completed":False}
    response = test_app.post('/todos/', json=test_todo)
    data = response.json

    response = test_app.get('/todos/')
    new_todo = response.json()[-1]
    assert response.status_code == 200
    assert new_todo["content"] == test_todo["content"]

def test_get_single_todo(test_app):
    test_todo = {"content":"Get Single Todo test", "is_completed":False}
    response = test_app.post('/todos/', json=test_todo)
    todo_id = response.json()["id"]

    res = test_app.get(f'/todos/{todo_id}')
    data = res.json()
    assert res.status_code == 200
    assert data["content"] == test_todo["content"]

def test_edit_todo(test_app):
    test_todo = {"content":"Edit Todo test", "is_completed":False}
    response = test_app.post('/todos/', json=test_todo)
    todo_id = response.json()["id"]

    edited_todo = {"content":"We Have Edited This", "is_completed":False}
    response = test_app.put(f'/todos/{todo_id}', json=edited_todo)
    data = response.json()
    assert response.status_code == 200
    assert data["content"] == edited_todo["content"]

def test_delete_todo(test_app):
    test_todo = {"content":"delete Todo test", "is_completed":False}
    response = test_app.post('/todos/', json=test_todo)
    todo_id = response.json()["id"]

    response = test_app.delete(f'/todos/{todo_id}')
    data = response.json()
    assert response.status_code == 200
    assert data["message"] == "Task Successfully Deleted!"