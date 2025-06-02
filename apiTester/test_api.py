import requests

BASE_URL = "http://localhost:3000/api/users"

def test_create_user():
    resp = requests.post(BASE_URL, json={"email": "apitest@users.com"})
    assert resp.status_code == 201
    user = resp.json()
    assert user["email"] == "apitest@users.com"
    return user["id"]

def test_get_users():
    resp = requests.get(BASE_URL)
    assert resp.status_code == 200
    users = resp.json()
    assert isinstance(users, list)
    return users

def test_update_user(user_id):
    resp = requests.put(f"{BASE_URL}/{user_id}", json={"email": "apitest-updated@users.com"})
    assert resp.status_code == 200
    user = resp.json()
    assert user["email"] == "apitest-updated@users.com"

def test_delete_user(user_id):
    resp = requests.delete(f"{BASE_URL}/{user_id}")
    assert resp.status_code == 204

def run_all():
    user_id = test_create_user()
    test_get_users()
    test_update_user(user_id)
    test_delete_user(user_id)
    print("All tests passed!")

if __name__ == "__main__":
    run_all()
