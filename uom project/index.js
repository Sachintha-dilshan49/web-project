// Navigation and Section Display
document.addEventListener('DOMContentLoaded', function() {
    // Initial setup
    const userSubmenu = document.getElementById('userSubmenu');
    userSubmenu.style.display = 'none';
    
    // Register event listeners for forms
    document.getElementById('shopForm').addEventListener('submit', handleShopFormSubmit);
    document.getElementById('adminForm').addEventListener('submit', handleAdminFormSubmit);
    document.getElementById('ownerForm').addEventListener('submit', handleOwnerFormSubmit);
    document.getElementById('settingsForm').addEventListener('submit', handleSettingsFormSubmit);
    document.getElementById('editShopForm').addEventListener('submit', handleEditShopFormSubmit);
    
    // Mobile menu toggle
    document.getElementById('menuToggle').addEventListener('click', toggleMenu);
    
    // Show dashboard section by default
    showSection('dashboard');
});

// Toggle mobile menu
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
}

// Show main section based on navigation click
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    const userSections = document.querySelectorAll('.user-section');
    userSections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');
    
    // Update active nav state
    const navItems = document.querySelectorAll('nav > ul > li');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById('nav-' + sectionId).classList.add('active');
    
    // Reset submenu if not on users section
    if (sectionId !== 'users') {
        document.getElementById('userSubmenu').classList.remove('active');
        document.getElementById('arrow').textContent = '▼';
    }
}

// Toggle user dropdown menu
function toggleUserDropdown() {
    const submenu = document.getElementById('userSubmenu');
    submenu.classList.toggle('active');
    
    const arrow = document.getElementById('arrow');
    if (submenu.classList.contains('active')) {
        arrow.textContent = '▲';
        // If submenu is active, set display to block to make visible
        submenu.style.display = 'block';
    } else {
        arrow.textContent = '▼';
        // If closed, wait for transition then set display to none
        setTimeout(() => {
            if (!submenu.classList.contains('active')) {
                submenu.style.display = 'none';
            }
        }, 300); // Match this with your CSS transition time
    }
    
    // Show admin section by default when toggling users menu
    if (submenu.classList.contains('active')) {
        showUserSection('admin');
    }
}

// Show user section (admin, shop-owners, or signup)
function showUserSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    const userSections = document.querySelectorAll('.user-section');
    userSections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected user section
    document.getElementById(sectionId).classList.remove('hidden');
    
    // Keep submenu open and update active state
    const submenu = document.getElementById('userSubmenu');
    submenu.classList.add('active');
    submenu.style.display = 'block';
    document.getElementById('arrow').textContent = '▲';
    
    // Update active state in nav
    const navItems = document.querySelectorAll('nav > ul > li');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById('nav-users').classList.add('active');
    
    // Highlight the active submenu item
    const submenuItems = document.querySelectorAll('.submenu li');
    submenuItems.forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById('nav-' + sectionId).classList.add('active');
}

// Handle Shop Form Submit
function handleShopFormSubmit(e) {
    e.preventDefault();
    
    const shopName = document.getElementById('shopName').value;
    const shopType = document.getElementById('shopType').value;
    const shopLocation = document.getElementById('shopLocation').value;
    const shopOwner = document.getElementById('shopOwner').value;
    const shopContact = document.getElementById('shopContact').value;
    const shopHours = document.getElementById('shopHours').value;
    const shopStatus = document.getElementById('shopStatus').value;
    
    // Create new table row
    const shopList = document.getElementById('shopList');
    const newRow = document.createElement('tr');
    
    // Determine badge class
    let badgeClass = 'badge-success';
    if (shopStatus === 'Closed') {
        badgeClass = 'badge-danger';
    } else if (shopStatus === 'Renovating') {
        badgeClass = 'badge-warning';
    }
    
    newRow.innerHTML = `
        <td>${shopName}</td>
        <td>${shopType}</td>
        <td>${shopLocation}</td>
        <td>${shopOwner}</td>
        <td>${shopContact}</td>
        <td>${shopHours}</td>
        <td><span class="badge ${badgeClass}">${shopStatus}</span></td>
        <td>
            <div class="action-buttons">
                <button class="btn-primary btn-small" onclick="editShop(this)">Edit</button>
                <button class="btn-danger btn-small" onclick="showDeleteConfirmation('shop', this)">Delete</button>
            </div>
        </td>
    `;
    
    shopList.appendChild(newRow);
    
    // Reset form
    document.getElementById('shopForm').reset();
    
    // Show notification
    showNotification('Shop added successfully!', 'success');
}

// Handle Admin Form Submit
function handleAdminFormSubmit(e) {
    e.preventDefault();
    
    const adminName = document.getElementById('adminName').value;
    const adminEmail = document.getElementById('adminEmail').value;
    const adminRole = document.getElementById('adminRole').value;
    
    // Create new table row
    const adminList = document.getElementById('adminList');
    const newRow = document.createElement('tr');
    
    // Get next ID
    const nextId = adminList.children.length + 1;
    
    newRow.innerHTML = `
        <td>${nextId}</td>
        <td>${adminName}</td>
        <td>${adminEmail}</td>
        <td>${adminRole}</td>
        <td>
            <div class="action-buttons">
                <button class="btn-primary btn-small" onclick="editAdmin(this)">Edit</button>
                <button class="btn-danger btn-small" onclick="showDeleteConfirmation('admin', this)">Delete</button>
            </div>
        </td>
    `;
    
    adminList.appendChild(newRow);
    
    // Reset form
    document.getElementById('adminForm').reset();
    
    // Show notification
    showNotification('Admin added successfully!', 'success');
}

// Handle Shop Owner Form Submit
function handleOwnerFormSubmit(e) {
    e.preventDefault();
    
    const ownerName = document.getElementById('ownerName').value;
    const ownerEmail = document.getElementById('ownerEmail').value;
    const ownerShop = document.getElementById('ownerShop').value;
    const ownerPhone = document.getElementById('ownerPhone').value;
    
    // Create new table row
    const ownerList = document.getElementById('ownerList');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td>${ownerShop}</td>
        <td>${ownerName}</td>
        <td>${ownerEmail}</td>
        <td>${ownerPhone}</td>
        <td>
            <div class="action-buttons">
                <button class="btn-primary btn-small" onclick="editOwner(this)">Edit</button>
                <button class="btn-danger btn-small" onclick="showDeleteConfirmation('owner', this)">Delete</button>
            </div>
        </td>
    `;
    
    ownerList.appendChild(newRow);
    
    // Reset form
    document.getElementById('ownerForm').reset();
    
    // Show notification
    showNotification('Shop owner added successfully!', 'success');
}

// Handle Settings Form Submit
function handleSettingsFormSubmit(e) {
    e.preventDefault();
    
    // Show notification
    showNotification('Settings saved successfully!', 'success');
}

// Delete Confirmation Modal
function showDeleteConfirmation(type, element) {
    const modal = document.getElementById('deleteModal');
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    const modalText = document.getElementById('deleteModalText');
    
    // Set text based on type
    if (type === 'shop') {
        const shopName = element.closest('tr').cells[0].textContent;
        modalText.textContent = `Are you sure you want to delete the shop "${shopName}"?`;
    } else if (type === 'admin') {
        const adminName = element.closest('tr').cells[1].textContent;
        modalText.textContent = `Are you sure you want to delete the admin account for "${adminName}"?`;
    } else if (type === 'owner') {
        const ownerName = element.closest('tr').cells[1].textContent;
        modalText.textContent = `Are you sure you want to delete the shop owner account for "${ownerName}"?`;
    } else if (type === 'user') {
        const userName = element.closest('tr').cells[0].textContent;
        modalText.textContent = `Are you sure you want to block the user "${userName}"?`;
        confirmBtn.textContent = 'Block';
    }
    
    // Store element reference for delete confirmation
    confirmBtn.dataset.elementToDelete = element;
    confirmBtn.dataset.type = type;
    
    // Set up confirmation action
    confirmBtn.onclick = function() {
        const rowToDelete = element.closest('tr');
        rowToDelete.remove();
        
        let message = '';
        if (type === 'shop') {
            message = 'Shop deleted successfully!';
        } else if (type === 'admin') {
            message = 'Admin deleted successfully!';
        } else if (type === 'owner') {
            message = 'Shop owner deleted successfully!';
        } else if (type === 'user') {
            message = 'User blocked successfully!';
        }
        
        showNotification(message, 'success');
        closeModal();
    };
    
    // Show modal
    modal.classList.add('active');
}

// Close Modal
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
}

// Edit Shop
function editShop(element) {
    const row = element.closest('tr');
    const modal = document.getElementById('editShopModal');
    
    // Fill in the edit form
    document.getElementById('editShopName').value = row.cells[0].textContent;
    document.getElementById('editShopType').value = row.cells[1].textContent;
    document.getElementById('editShopLocation').value = row.cells[2].textContent;
    document.getElementById('editShopOwner').value = row.cells[3].textContent;
    document.getElementById('editShopContact').value = row.cells[4].textContent;
    document.getElementById('editShopHours').value = row.cells[5].textContent;
    
    // Set status based on badge text
    const statusText = row.cells[6].querySelector('.badge').textContent;
    document.getElementById('editShopStatus').value = statusText;
    
    // Store reference to row for update
    document.getElementById('editShopForm').dataset.rowToUpdate = row;
    
    // Show modal
    modal.classList.add('active');
}

// Handle Edit Shop Form Submit
function handleEditShopFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const row = form.dataset.rowToUpdate;
    
    // Update row with new values
    row.cells[0].textContent = document.getElementById('editShopName').value;
    row.cells[1].textContent = document.getElementById('editShopType').value;
    row.cells[2].textContent = document.getElementById('editShopLocation').value;
    row.cells[3].textContent = document.getElementById('editShopOwner').value;
    row.cells[4].textContent = document.getElementById('editShopContact').value;
    row.cells[5].textContent = document.getElementById('editShopHours').value;
    
    const status = document.getElementById('editShopStatus').value;
    
    // Determine badge class
    let badgeClass = 'badge-success';
    if (status === 'Closed') {
        badgeClass = 'badge-danger';
    } else if (status === 'Renovating') {
        badgeClass = 'badge-warning';
    }
    
    row.cells[6].innerHTML = `<span class="badge ${badgeClass}">${status}</span>`;
    
    // Close modal and show notification
    closeModal();
    showNotification('Shop updated successfully!', 'success');
}

// Edit Admin
function editAdmin(element) {
    // Implementation would be similar to editShop
    showNotification('Edit Admin functionality coming soon!', 'success');
}

// Edit Owner
function editOwner(element) {
    // Implementation would be similar to editShop
    showNotification('Edit Shop Owner functionality coming soon!', 'success');
}

// View User Details
function viewUserDetails(element) {
    const username = element.closest('tr').cells[0].textContent;
    showNotification(`User details for ${username} coming soon!`, 'success');
}

// Search Shops
function searchShops() {
    const searchTerm = document.getElementById('shopSearch').value.toLowerCase();
    searchTable('shopList', searchTerm);
}

// Search Admins
function searchAdmins() {
    const searchTerm = document.getElementById('adminSearch').value.toLowerCase();
    searchTable('adminList', searchTerm);
}

// Search Shop Owners
function searchOwners() {
    const searchTerm = document.getElementById('ownerSearch').value.toLowerCase();
    searchTable('ownerList', searchTerm);
}

// Search Users
function searchUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    searchTable('userList', searchTerm);
}

// Generic search table function
function searchTable(tableId, searchTerm) {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        let found = false;
        const cells = rows[i].getElementsByTagName('td');
        
        for (let j = 0; j < cells.length; j++) {
            const cellValue = cells[j].textContent.toLowerCase();
            
            if (cellValue.includes(searchTerm)) {
                found = true;
                break;
            }
        }
        
        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Generate Report
function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const reportPeriod = document.getElementById('reportPeriod').value;
    
    showNotification(`${reportPeriod} ${reportType} report generated successfully!`, 'success');
}

// Show Notification
function showNotification(message, type) {
    const notificationArea = document.getElementById('notificationArea');
    const notification = document.createElement('div');
    
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notificationArea.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}