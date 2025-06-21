// Handle navigation for Groups only
const showGroupsLink = document.getElementById('showGroupsLink');
const groupsSection = document.getElementById('groupsSection');

showGroupsLink.addEventListener('click', (e) => {
    e.preventDefault();
    groupsSection.style.display = '';
    // Optionally hide other sections if needed
    const usersSection = document.getElementById('usersSection');
    const locationsSection = document.getElementById('locationsSection');
    if (usersSection) usersSection.style.display = 'none';
    if (locationsSection) locationsSection.style.display = 'none';
});

// API base URL (adjust if needed)
const GROUPS_API_URL = 'http://localhost:3000/api/groups';

const groupForm = document.getElementById('groupForm');
const groupNameInput = document.getElementById('groupName');
const groupList = document.getElementById('groupList');

// Fetch and display groups
async function fetchGroups() {
    groupList.innerHTML = '<li>Loading...</li>';
    try {
        const res = await fetch(GROUPS_API_URL);
        const groups = await res.json();
        groupList.innerHTML = '';
        if (groups.length === 0) {
            groupList.innerHTML = '<li>No groups found.</li>';
        } else {            groups.forEach(group => {
                const li = document.createElement('li');
                li.textContent = group.name + ' ';
                // Delete button
                const delBtn = document.createElement('span');
                delBtn.textContent = 'X';
                delBtn.title = 'Delete group';
                delBtn.style.cursor = 'pointer';
                delBtn.className = 'delete-btn';
                delBtn.onclick = () => deleteGroup(group.id);
                li.appendChild(delBtn);
                groupList.appendChild(li);
            });
        }
    } catch (err) {
        groupList.innerHTML = '<li>Error loading groups.</li>';
    }
}

// Add group
if (groupForm) {
    groupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = groupNameInput.value.trim();
        if (!name) return;
        try {
            await fetch(GROUPS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            groupNameInput.value = '';
            fetchGroups();
        } catch (err) {
            alert('Failed to add group.');
        }
    });
}

// Delete group
async function deleteGroup(id) {
    if (!confirm('Are you sure you want to delete this group?')) return;
    try {
        await fetch(`${GROUPS_API_URL}/${id}`, { method: 'DELETE' });
        fetchGroups();
    } catch (err) {
        alert('Failed to delete group.');
    }
}

// Show groups by default if navigated directly
if (window.location.hash === '#groups') {
    showGroupsLink.click();
}

// Fetch groups when the section is shown
showGroupsLink.addEventListener('click', fetchGroups);

// Initial fetch if section is visible
if (groupsSection && groupsSection.style.display !== 'none') {
    fetchGroups();
}
