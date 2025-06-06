function setupUserManagement() {
    const API_URL = 'http://localhost:3000/api/users';
    async function fetchUsers() {
        const res = await fetch(API_URL);
        const users = await res.json();
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.email + ' ';
            const delBtn = document.createElement('span');
            delBtn.textContent = 'X';
            delBtn.title = 'Delete user';
            delBtn.style.cursor = 'pointer';
            delBtn.className = 'delete-btn';
            delBtn.setAttribute('data-id', user.id);
            li.appendChild(delBtn);
            userList.appendChild(li);
        });
    }

    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        if (!email) return;
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        userForm.reset();
        fetchUsers();
    });

    const userList = document.getElementById('userList');
    userList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.getAttribute('data-id');
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchUsers();
        }
    });

    fetchUsers();
}

if (document.getElementById('userForm')) setupUserManagement();
