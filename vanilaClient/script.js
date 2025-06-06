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
