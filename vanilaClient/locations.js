function setupLocationManagement() {
    const API_URL = 'http://localhost:3001/api/locations';
    async function fetchLocations() {
        const res = await fetch(API_URL);
        const locations = await res.json();
        const list = document.getElementById('locationList');
        list.innerHTML = '';
        locations.forEach(loc => {
            const li = document.createElement('li');
            li.textContent = loc.name + ' ';
            const delBtn = document.createElement('span');
            delBtn.textContent = 'X';
            delBtn.title = 'Delete location';
            delBtn.style.cursor = 'pointer';
            delBtn.className = 'delete-btn';
            delBtn.setAttribute('data-id', loc.id);
            delBtn.setAttribute('data-type', 'location');
            li.appendChild(delBtn);
            list.appendChild(li);
        });
    }
    const form = document.getElementById('locationForm');
    const nameInput = document.getElementById('locationName');
    form.onsubmit = async function(e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        if (!name) return;
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        nameInput.value = '';
        fetchLocations();
    };
    fetchLocations();

    const locationList = document.getElementById('locationList');
    locationList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.getAttribute('data-id');
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchLocations();
        }
    });
}

if (document.getElementById('locationForm')) setupLocationManagement();
