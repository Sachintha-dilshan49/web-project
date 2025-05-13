// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mock data for dashboard stats
    updateDashboardStats({
        totalOrders: 128,
        pendingOrders: 15,
        completedOrders: 103,
        totalRevenue: 2389.50
    });

    // Initialize event listeners
    initNavigation();
    initShopTypeSwitcher();
    initCategoryTabs();
    initPreorderTabs();
    initItemActions();
    initPreorderItems();
    initModalHandlers();
    initFormHandlers();
});

// Dashboard stats update
function updateDashboardStats(data) {
    document.getElementById('total-orders').textContent = data.totalOrders;
    document.getElementById('pending-orders').textContent = data.pendingOrders;
    document.getElementById('completed-orders').textContent = data.completedOrders;
    document.getElementById('total-revenue').textContent = '$' + data.totalRevenue.toFixed(2);
}

// Navigation functionality
function initNavigation() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            navOverlay.classList.toggle('show');
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('show');
            navOverlay.classList.remove('show');
        });
    }

    // Handle navigation clicks
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all sections
            const sections = document.querySelectorAll('.section-content');
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show targeted section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
            
            // Close mobile nav if open
            navLinks.classList.remove('show');
            navOverlay.classList.remove('show');
        });
    });

    // Show dashboard section by default
    document.querySelectorAll('.section-content').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('dashboard').style.display = 'block';
}

// Shop type switcher functionality
function initShopTypeSwitcher() {
    const shopTypeSelect = document.getElementById('main-shop-type');
    
    if (shopTypeSelect) {
        shopTypeSelect.addEventListener('change', function() {
            const shopType = this.value;
            
            // Update navigation items
            const foodNavItem = document.querySelector('.food-nav-item');
            const juiceNavItem = document.querySelector('.juice-nav-item');
            const bookNavItem = document.querySelector('.book-nav-item');
            const preorderNavItem = document.querySelector('.preorder-nav-item');
            
            // Reset display
            foodNavItem.style.display = 'none';
            juiceNavItem.style.display = 'none';
            bookNavItem.style.display = 'none';
            
            // Update menu item categories
            const foodCategories = document.getElementById('food-categories');
            const juiceCategories = document.getElementById('juice-categories');
            const bookCategories = document.getElementById('book-categories');
            
            foodCategories.style.display = 'none';
            juiceCategories.style.display = 'none';
            bookCategories.style.display = 'none';
            
            // Update item lists
            const foodItemsList = document.getElementById('food-items-list');
            const juiceItemsList = document.getElementById('juice-items-list');
            const bookItemsList = document.getElementById('book-items-list');
            
            foodItemsList.style.display = 'none';
            juiceItemsList.style.display = 'none';
            bookItemsList.style.display = 'none';
            
            // Update section titles
            const itemsSectionTitle = document.getElementById('items-section-title');
            const itemsListTitle = document.getElementById('items-list-title');
            
            // Show/hide preorder section based on shop type
            const preorderSection = document.getElementById('preorders');
            const bookshopInfo = document.getElementById('bookshop-info');

            // Update modal titles
            const addModalTitle = document.getElementById('add-modal-title');
            const editModalTitle = document.getElementById('edit-modal-title');
            
            // Show category groups in modals
            const foodCategoryGroup = document.getElementById('food-category-group');
            const juiceCategoryGroup = document.getElementById('juice-category-group');
            const bookCategoryGroup = document.getElementById('book-category-group');
            const editFoodCategoryGroup = document.getElementById('edit-food-category-group');
            const editJuiceCategoryGroup = document.getElementById('edit-juice-category-group');
            const editBookCategoryGroup = document.getElementById('edit-book-category-group');
            
            foodCategoryGroup.style.display = 'none';
            juiceCategoryGroup.style.display = 'none';
            bookCategoryGroup.style.display = 'none';
            editFoodCategoryGroup.style.display = 'none';
            editJuiceCategoryGroup.style.display = 'none';
            editBookCategoryGroup.style.display = 'none';
            
            // Update based on selected shop type
            switch(shopType) {
                case 'canteen':
                    foodNavItem.style.display = 'block';
                    preorderNavItem.style.display = 'block';
                    foodCategories.style.display = 'flex';
                    foodItemsList.style.display = 'grid';
                    itemsSectionTitle.textContent = 'Food Items';
                    itemsListTitle.textContent = 'Menu Items';
                    preorderSection.style.display = 'block';
                    bookshopInfo.style.display = 'none';
                    addModalTitle.textContent = 'Add New Food Item';
                    editModalTitle.textContent = 'Edit Food Item';
                    foodCategoryGroup.style.display = 'block';
                    editFoodCategoryGroup.style.display = 'block';
                    break;
                    
                case 'juicebar':
                    juiceNavItem.style.display = 'block';
                    preorderNavItem.style.display = 'block';
                    juiceCategories.style.display = 'flex';
                    juiceItemsList.style.display = 'grid';
                    itemsSectionTitle.textContent = 'Drink Items';
                    itemsListTitle.textContent = 'Drink Menu';
                    preorderSection.style.display = 'block';
                    bookshopInfo.style.display = 'none';
                    addModalTitle.textContent = 'Add New Drink Item';
                    editModalTitle.textContent = 'Edit Drink Item';
                    juiceCategoryGroup.style.display = 'block';
                    editJuiceCategoryGroup.style.display = 'block';
                    break;
                    
                case 'bookshop':
                    bookNavItem.style.display = 'block';
                    preorderNavItem.style.display = 'none';
                    bookCategories.style.display = 'flex';
                    bookItemsList.style.display = 'grid';
                    itemsSectionTitle.textContent = 'Book & Accessories';
                    itemsListTitle.textContent = 'Inventory Items';
                    preorderSection.style.display = 'none';
                    bookshopInfo.style.display = 'block';
                    addModalTitle.textContent = 'Add New Item';
                    editModalTitle.textContent = 'Edit Item';
                    bookCategoryGroup.style.display = 'block';
                    editBookCategoryGroup.style.display = 'block';
                    break;
            }
        });
        
        // Trigger change to set initial state
        shopTypeSelect.dispatchEvent(new Event('change'));
    }
}

// Category tabs functionality
function initCategoryTabs() {
    const categoryTabContainers = [
        document.getElementById('food-categories'),
        document.getElementById('juice-categories'),
        document.getElementById('book-categories')
    ];
    
    categoryTabContainers.forEach(container => {
        if (container) {
            const tabs = container.querySelectorAll('.category-tab');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs in this container
                    container.querySelectorAll('.category-tab').forEach(t => {
                        t.classList.remove('active');
                    });
                    
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Filter items
                    const category = this.getAttribute('data-category');
                    const parentId = container.id;
                    let itemsList;
                    
                    if (parentId === 'food-categories') {
                        itemsList = document.getElementById('food-items-list');
                    } else if (parentId === 'juice-categories') {
                        itemsList = document.getElementById('juice-items-list');
                    } else if (parentId === 'book-categories') {
                        itemsList = document.getElementById('book-items-list');
                    }
                    
                    if (itemsList) {
                        const items = itemsList.querySelectorAll('.food-item');
                        
                        items.forEach(item => {
                            if (category === 'all' || item.getAttribute('data-category') === category) {
                                item.style.display = 'flex';
                            } else {
                                item.style.display = 'none';
                            }
                        });
                    }
                });
            });
            
            // Activate "All" tab by default
            const allTab = container.querySelector('[data-category="all"]');
            if (allTab) {
                allTab.click();
            }
        }
    });
}

// Preorder tabs functionality
function initPreorderTabs() {
    const preorderTabs = document.querySelectorAll('.preorder-tab');
    
    preorderTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            preorderTabs.forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content
            const contents = document.querySelectorAll('.preorder-content');
            contents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Show target content
            const targetId = this.getAttribute('data-target');
            const targetContent = document.querySelector(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
            }
        });
    });
    
    // Activate first tab by default
    if (preorderTabs.length > 0) {
        preorderTabs[0].click();
    }
}

// Item action buttons (edit, delete)
function initItemActions() {
    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const foodItem = this.closest('.food-item');
            const foodId = foodItem.getAttribute('data-id');
            const foodName = foodItem.querySelector('h4').textContent;
            const foodPrice = foodItem.querySelector('p').textContent.replace('Rs', '');
            const foodCategory = foodItem.getAttribute('data-category');
            const isAvailable = foodItem.querySelector('.item-available') !== null;
            
            // Populate edit form
            const editForm = document.getElementById('edit-food-form');
            editForm.querySelector('input[name="food-id"]').value = foodId;
            editForm.querySelector('#edit-food-name').value = foodName;
            editForm.querySelector('#edit-food-price').value = foodPrice;
            
            // Set category based on shop type
            const shopType = document.getElementById('main-shop-type').value;
            if (shopType === 'canteen') {
                editForm.querySelector('#edit-food-category').value = foodCategory;
            } else if (shopType === 'juicebar') {
                editForm.querySelector('#edit-juice-category').value = foodCategory;
            } else if (shopType === 'bookshop') {
                editForm.querySelector('#edit-book-category').value = foodCategory;
            }
            
            editForm.querySelector('#edit-food-available').value = isAvailable ? 'yes' : 'no';
            
            // Show modal
            document.getElementById('edit-food-modal').classList.add('show');
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const foodItem = this.closest('.food-item');
            const foodId = foodItem.getAttribute('data-id');
            
            // Set food id in delete form
            document.getElementById('delete-food-form').querySelector('input[name="food-id"]').value = foodId;
            
            // Show modal
            document.getElementById('delete-food-modal').classList.add('show');
        });
    });
    
    // Add new item button
    document.querySelector('.add-btn').addEventListener('click', function() {
        // Reset form
        document.getElementById('add-food-form').reset();
        
        // Show modal
        document.getElementById('add-food-modal').classList.add('show');
    });
}

// Preorder items click to show details
function initPreorderItems() {
    document.querySelectorAll('.preorder-item').forEach(item => {
        item.addEventListener('click', function() {
            const orderId = this.getAttribute('data-id');
            const orderStatus = this.querySelector('.preorder-status').textContent.toLowerCase();
            
            // Update order details modal
            const modal = document.getElementById('order-details-modal');
            modal.querySelector('.order-id').textContent = orderId;
            modal.querySelector('.order-status').textContent = orderStatus;
            modal.querySelector('#order-status').value = orderStatus;
            modal.querySelector('input[name="order-id"]').value = orderId;
            
            // Show modal
            modal.classList.add('show');
        });
    });
}

// Modal functionality
function initModalHandlers() {
    // Close modals
    document.querySelectorAll('.close-modal, .cancel-btn').forEach(element => {
        element.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('show');
            });
        });
    });
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });
}

// Form submit handlers
function initFormHandlers() {
    // Add food form
    document.getElementById('add-food-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const foodName = this.querySelector('#add-food-name').value;
        const foodPrice = this.querySelector('#add-food-price').value;
        
        // Get category based on shop type
        const shopType = document.getElementById('main-shop-type').value;
        let foodCategory;
        if (shopType === 'canteen') {
            foodCategory = this.querySelector('#add-food-category').value;
        } else if (shopType === 'juicebar') {
            foodCategory = this.querySelector('#add-juice-category').value;
        } else if (shopType === 'bookshop') {
            foodCategory = this.querySelector('#add-book-category').value;
        }
        
        const isAvailable = this.querySelector('#add-food-available').value === 'yes';
        
        // Determine which list to add to
        let itemsList;
        if (shopType === 'canteen') {
            itemsList = document.getElementById('food-items-list');
        } else if (shopType === 'juicebar') {
            itemsList = document.getElementById('juice-items-list');
        } else if (shopType === 'bookshop') {
            itemsList = document.getElementById('book-items-list');
        }
        
        // Generate a new ID
        const newId = Date.now();
        
        // Create new item HTML
        const newItem = document.createElement('div');
        newItem.className = 'food-item';
        newItem.setAttribute('data-id', newId);
        newItem.setAttribute('data-category', foodCategory);
        
        newItem.innerHTML = `
            <div class="food-item-info">
                <h4>${foodName}</h4>
                <p>$${parseFloat(foodPrice).toFixed(2)}</p>
                <p class="${isAvailable ? 'item-available' : 'item-unavailable'}">${isAvailable ? 'Available' : 'Unavailable'}</p>
            </div>
            <div class="food-item-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        // Add to list
        itemsList.appendChild(newItem);
        
        // Add event listeners to new buttons
        newItem.querySelector('.edit-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            const foodItem = this.closest('.food-item');
            const foodId = foodItem.getAttribute('data-id');
            const foodName = foodItem.querySelector('h4').textContent;
            const foodPrice = foodItem.querySelector('p').textContent.replace('$', '');
            const foodCategory = foodItem.getAttribute('data-category');
            const isAvailable = foodItem.querySelector('.item-available') !== null;
            
            // Populate edit form
            const editForm = document.getElementById('edit-food-form');
            editForm.querySelector('input[name="food-id"]').value = foodId;
            editForm.querySelector('#edit-food-name').value = foodName;
            editForm.querySelector('#edit-food-price').value = foodPrice;
            
            // Set category based on shop type
            if (shopType === 'canteen') {
                editForm.querySelector('#edit-food-category').value = foodCategory;
            } else if (shopType === 'juicebar') {
                editForm.querySelector('#edit-juice-category').value = foodCategory;
            } else if (shopType === 'bookshop') {
                editForm.querySelector('#edit-book-category').value = foodCategory;
            }
            
            editForm.querySelector('#edit-food-available').value = isAvailable ? 'yes' : 'no';
            
            // Show modal
            document.getElementById('edit-food-modal').classList.add('show');
        });
        
        newItem.querySelector('.delete-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            const foodItem = this.closest('.food-item');
            const foodId = foodItem.getAttribute('data-id');
            
            // Set food id in delete form
            document.getElementById('delete-food-form').querySelector('input[name="food-id"]').value = foodId;
            
            // Show modal
            document.getElementById('delete-food-modal').classList.add('show');
        });
        
        // Close modal
        document.getElementById('add-food-modal').classList.remove('show');
        
        // Reset form
        this.reset();
        
        // Update dashboard stats (simulate)
        const currentTotal = parseInt(document.getElementById('total-orders').textContent);
        updateDashboardStats({
            totalOrders: currentTotal + 1,
            pendingOrders: parseInt(document.getElementById('pending-orders').textContent),
            completedOrders: parseInt(document.getElementById('completed-orders').textContent),
            totalRevenue: parseFloat(document.getElementById('total-revenue').textContent.replace('$', '')) + parseFloat(foodPrice)
        });
    });
    
    // Edit food form
    document.getElementById('edit-food-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const foodId = this.querySelector('input[name="food-id"]').value;
        const foodName = this.querySelector('#edit-food-name').value;
        const foodPrice = this.querySelector('#edit-food-price').value;
        
        // Get category based on shop type
        const shopType = document.getElementById('main-shop-type').value;
        let foodCategory;
        if (shopType === 'canteen') {
            foodCategory = this.querySelector('#edit-food-category').value;
        } else if (shopType === 'juicebar') {
            foodCategory = this.querySelector('#edit-juice-category').value;
        } else if (shopType === 'bookshop') {
            foodCategory = this.querySelector('#edit-book-category').value;
        }
        
        const isAvailable = this.querySelector('#edit-food-available').value === 'yes';
        
        // Find the item
        const foodItem = document.querySelector(`.food-item[data-id="${foodId}"]`);
        if (foodItem) {
            // Update item attributes and content
            foodItem.setAttribute('data-category', foodCategory);
            foodItem.querySelector('h4').textContent = foodName;
            foodItem.querySelector('p').textContent = '$' + parseFloat(foodPrice).toFixed(2);
            
            const availabilityElement = foodItem.querySelector('.item-available, .item-unavailable');
            if (availabilityElement) {
                if (isAvailable) {
                    availabilityElement.className = 'item-available';
                    availabilityElement.textContent = 'Available';
                } else {
                    availabilityElement.className = 'item-unavailable';
                    availabilityElement.textContent = 'Unavailable';
                }
            }
        }
        
        // Close modal
        document.getElementById('edit-food-modal').classList.remove('show');
    });
    
    // Delete food form
    document.getElementById('delete-food-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get food id
        const foodId = this.querySelector('input[name="food-id"]').value;
        
        // Find and remove the item
        const foodItem = document.querySelector(`.food-item[data-id="${foodId}"]`);
        if (foodItem) {
            foodItem.remove();
        }
        
        // Close modal
        document.getElementById('delete-food-modal').classList.remove('show');
        
        // Update dashboard stats (simulate)
        updateDashboardStats({
            totalOrders: parseInt(document.getElementById('total-orders').textContent) - 1,
            pendingOrders: parseInt(document.getElementById('pending-orders').textContent),
            completedOrders: parseInt(document.getElementById('completed-orders').textContent),
            totalRevenue: Math.max(0, parseFloat(document.getElementById('total-revenue').textContent.replace('$', '')) - 10) // Simulate revenue decrease
        });
    });
    
    // Order action form
    document.getElementById('order-action-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const orderId = this.querySelector('input[name="order-id"]').value;
        const newStatus = this.querySelector('#order-status').value;
        
        // Update order status in UI (in a real app, this would update in the backend)
        const preorderItem = document.querySelector(`.preorder-item[data-id="${orderId}"]`);
        if (preorderItem) {
            const statusElement = preorderItem.querySelector('.preorder-status');
            if (statusElement) {
                // Remove existing status class
                statusElement.classList.remove('status-pending', 'status-accepted', 'status-completed', 'status-rejected');
                // Add new status class
                statusElement.classList.add(`status-${newStatus}`);
                // Update status text
                statusElement.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
                
                // Move to appropriate tab section
                const currentList = preorderItem.parentElement;
                const targetList = document.querySelector(`#${newStatus}-preorders .preorder-list`);
                if (targetList && currentList !== targetList) {
                    currentList.removeChild(preorderItem);
                    targetList.appendChild(preorderItem);
                }
                
                // Update dashboard stats (simulate)
                let pendingOrders = parseInt(document.getElementById('pending-orders').textContent);
                let completedOrders = parseInt(document.getElementById('completed-orders').textContent);
                
                if (newStatus === 'completed') {
                    pendingOrders = Math.max(0, pendingOrders - 1);
                    completedOrders += 1;
                } else if (newStatus === 'pending') {
                    pendingOrders += 1;
                    completedOrders = Math.max(0, completedOrders - 1);
                }
                
                updateDashboardStats({
                    totalOrders: parseInt(document.getElementById('total-orders').textContent),
                    pendingOrders: pendingOrders,
                    completedOrders: completedOrders,
                    totalRevenue: parseFloat(document.getElementById('total-revenue').textContent.replace('$', ''))
                });
            }
        }
        
        // Close modal
        document.getElementById('order-details-modal').classList.remove('show');
    });
}