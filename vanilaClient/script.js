const API_URL = 'http://localhost:3000/api/users';

// Fetch and display users
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

// Add user
const userForm = document.getElementById('userForm');
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    // Ensure email is sent as JSON and not empty
    if (!email) return;
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    userForm.reset();
    fetchUsers();
});

// Delete or Edit user
const userList = document.getElementById('userList');
userList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchUsers();
    } else if (e.target.classList.contains('edit-btn')) {
        const id = e.target.getAttribute('data-id');
        const oldEmail = e.target.getAttribute('data-email');
        const newEmail = prompt('Edit user email:', oldEmail);
        if (newEmail && newEmail !== oldEmail) {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: newEmail })
            });
            fetchUsers();
        }
    }
});

// Initial load
fetchUsers();