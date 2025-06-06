// Shared helpers for users and locations can be placed here.
// Example: function to create a delete button
function createDeleteButton(onClick, label = 'Delete') {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.onclick = onClick;
    return btn;
}

function clearList(listElement) {
    listElement.innerHTML = '';
}

// Tab switching logic (shared)
const usersSection = document.getElementById('usersSection');
const locationsSection = document.getElementById('locationsSection');
const showUsersLink = document.getElementById('showUsersLink');
const showLocationsLink = document.getElementById('showLocationsLink');

// Hide links by default
if (showUsersLink) showUsersLink.style.display = 'none';
if (showLocationsLink) showLocationsLink.style.display = 'none';

// Check API connectivity and show links if available
fetch('http://localhost:3000/api/users', { method: 'GET' })
    .then(res => { if (res.ok && showUsersLink) showUsersLink.style.display = 'inline'; })
    .catch(() => {});
fetch('http://localhost:3001/api/locations', { method: 'GET' })
    .then(res => { if (res.ok && showLocationsLink) showLocationsLink.style.display = 'inline'; })
    .catch(() => {});

if (showUsersLink && showLocationsLink && usersSection && locationsSection) {
    showUsersLink.onclick = function(e) {
        e.preventDefault();
        usersSection.style.display = '';
        locationsSection.style.display = 'none';
    };
    showLocationsLink.onclick = function(e) {
        e.preventDefault();
        usersSection.style.display = 'none';
        locationsSection.style.display = '';
    };
}
