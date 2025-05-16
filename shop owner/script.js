function showSection(sectionId) {
  // Hide all sections first
  document.querySelectorAll(".section-content").forEach(sec => {
    sec.style.display = "none";
  });

  // Show the requested section
  const target = document.getElementById(sectionId);
  if (target) {
    target.style.display = "block";
  }
}

// Initialize and show dashboard by default
document.addEventListener('DOMContentLoaded', function () {
  // Show dashboard initially
  showSection('dashboard');

  // Mock data for dashboard stats
  updateDashboardStats({
    totalOrders: 17,
    pendingOrders: 15,
    completedOrders: 103,
    totalRevenue: 2390.00
  });

  // Initialize shop status toggle
  initShopStatus();

  // Initialize item availability toggles
  initItemAvailability();

  // Initialize add item functionality
  initAddItemFunctionality();

  initAddJuiceItemFunctionality();

  initAddBookshopItemFunctionality(); 
});

// Dashboard stats update
function updateDashboardStats(data) {
  document.getElementById('total-orders').textContent = data.totalOrders;
  document.getElementById('pending-orders').textContent = data.pendingOrders;
  document.getElementById('completed-orders').textContent = data.completedOrders;
  document.getElementById('total-revenue').textContent = 'LKR ' + data.totalRevenue.toFixed(2);
}

// Shop status toggle functionality
function initShopStatus() {
  const statusText = document.getElementById("status-text");
  const toggleBtn = document.querySelector("#shop-status .switch");

  // Load saved state
  let isOpen = localStorage.getItem("shopOpen") === "true";
  updateStatus(isOpen);

  // Toggle on click
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isOpen = !isOpen;
      localStorage.setItem("shopOpen", isOpen);
      updateStatus(isOpen);
    });
  }

  function updateStatus(open) {
    statusText.textContent = open ? " Open " : " Closed";
    statusText.className = open ? "open" : "closed";
  }
}

// Item availability toggle functionality
function initItemAvailability() {
  const itemsSwitches = document.querySelectorAll('.item-switch');

  itemsSwitches.forEach(itemSwitch => {
    const statusTextItem = itemSwitch.closest('.item-status').querySelector('.status-text-item');

    // Set initial state
    itemSwitch.checked = true;
    statusTextItem.textContent = 'Available ';
    statusTextItem.style.color = 'green';

    itemSwitch.addEventListener('change', () => {
      if (itemSwitch.checked) {
        statusTextItem.textContent = 'Available ';
        statusTextItem.style.color = 'green';
      } else {
        statusTextItem.textContent = 'Not Available ';
        statusTextItem.style.color = 'red';
      }
    });
  });
}

// Add item functionality
function initAddItemFunctionality() {
  const addItemBtn = document.getElementById("add-btn");
  const addItemForm = document.querySelector(".add-item-form");
  const addItemWindowContainer = document.getElementById("additemWindowContainer");
  const itemCancelBtn = document.getElementById("item-cancel-btn");
  const itemSubmitBtn = document.getElementById("item-submit-btn");
  const foodItemsList = document.getElementById("food-items-list");

  // Toggle add item window visibility
  function toggleAddItemWindow(show) {
    if (show) {
      addItemWindowContainer.classList.remove("non-visible");
      addItemWindowContainer.classList.add("visible");
    } else {
      addItemWindowContainer.classList.remove("visible");
      addItemWindowContainer.classList.add("non-visible");
    }
  }

  // Add item button click event
  if (addItemBtn) {
    addItemBtn.addEventListener("click", () => {
      toggleAddItemWindow(true);
    });
  }

  // Cancel button click event
  if (itemCancelBtn) {
    itemCancelBtn.addEventListener("click", () => {
      addItemForm.reset();
      toggleAddItemWindow(false);
    });
  }

  // Form submission event
  if (addItemForm) {
    addItemForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('add-food-name').value;
      const price = document.getElementById('add-food-price').value;
      const category = document.getElementById('add-food-category').value;

      if (name && price && category) {
        // Add new food item
        addNewFoodItem(name, price, category);

        // Reset form and close window
        addItemForm.reset();
        toggleAddItemWindow(false);
      }
    });
  }

  // Function to generate a unique ID for new food items
  function generateUniqueId() {
    return Date.now().toString();
  }

  // Function to add a new food item to the list
  function addNewFoodItem(name, price, category) {
    const id = generateUniqueId();

    // Create a new food item element
    const newFoodItem = document.createElement('div');
    newFoodItem.className = 'food-item';
    newFoodItem.dataset.id = id;
    newFoodItem.dataset.category = category;

    // Create HTML structure for the new food item
    newFoodItem.innerHTML = `
      <div class="food-item-info">
        <h4>${name}</h4>
        <p>LKR ${parseFloat(price).toFixed(2)}</p>
        <div class="item-status">
          <span class="status-text-item"></span>
          <div class="checkbox-wrapper-14">
            <input id="switch-${id}" type="checkbox" class="item-switch switch">
            <label for="switch-${id}"></label>
          </div>
        </div>
      </div>
      <div class="food-item-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Add the new food item to the list
    foodItemsList.appendChild(newFoodItem);

    // Set up switch functionality for the new item
    const itemSwitch = newFoodItem.querySelector('.item-switch');
    const statusText = newFoodItem.querySelector('.status-text-item');

    // Add event listeners to the new buttons
    const editBtn = newFoodItem.querySelector('.edit-btn');
    const deleteBtn = newFoodItem.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
      // Edit functionality can be added here
      console.log('Edit item:', id);
    });

    deleteBtn.addEventListener('click', () => {
      // Remove the food item
      newFoodItem.remove();
      console.log('Delete item:', id);
    });

    // Set up availability toggle
    itemSwitch.addEventListener('change', () => {
      if (itemSwitch.checked) {
        statusText.textContent = 'Available';
        statusText.style.color = 'green';
      } else {
        statusText.textContent = 'Not Available';
        statusText.style.color = 'red';
      }
    });

    // Set initial state to available
    itemSwitch.checked = true;
    statusText.textContent = 'Available';
    statusText.style.color = 'green';
  }
}


function initAddJuiceItemFunctionality() {
  const addJuiceItemBtn = document.getElementById("add-juice-btn");
  const juiceItemWindowContainer = document.getElementById("addjuiceitemWindowContainer");
  const juiceItemForm = document.querySelector("#addjuiceitemWindowContainer .add-item-form");
  const juiceCancelBtn = document.querySelector("#addjuiceitemWindowContainer #juice-cancel-btn");
  const juiceSubmitBtn = document.querySelector("#addjuiceitemWindowContainer #juice-submit-btn");
  const juicebarItemsList = document.getElementById("juicebar-items-list");

  // Toggle juice item window visibility
  function toggleJuiceItemWindow(show) {
    if (show) {
      juiceItemWindowContainer.classList.remove("non-visible");
      juiceItemWindowContainer.classList.add("visible");
    } else {
      juiceItemWindowContainer.classList.remove("visible");
      juiceItemWindowContainer.classList.add("non-visible");
    }
  }

  // Add juice item button click event
  if (addJuiceItemBtn) {
    addJuiceItemBtn.addEventListener("click", () => {
      toggleJuiceItemWindow(true);
    });
  }

  // Cancel button click event
  if (juiceCancelBtn) {
    juiceCancelBtn.addEventListener("click", () => {
      juiceItemForm.reset();
      toggleJuiceItemWindow(false);
    });
  }

  // Form submission event
  if (juiceItemForm) {
    juiceItemForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values using correct IDs
      const name = document.getElementById("juice-item-name").value;
      const price = document.getElementById("juice-item-price").value;
      const category = document.getElementById("juice-item-category").value;

      if (name && price && category) {
        // Add new juice item
        addNewJuiceItem(name, price, category);

        // Reset form and close window
        juiceItemForm.reset();
        toggleJuiceItemWindow(false);
      }
    });
  }

  // Function to add a new juice item to the list
  function addNewJuiceItem(name, price, category) {
    // Generate unique ID for the new item
    const id = Date.now().toString();

    // Create new juice item element
    const newJuiceItem = document.createElement("div");
    newJuiceItem.className = "food-item";
    newJuiceItem.dataset.id = id;
    newJuiceItem.dataset.category = category;

    // Create HTML structure for the juice item
    newJuiceItem.innerHTML = `
      <div class="food-item-info">
        <h4>${name}</h4>
        <p>LKR ${parseFloat(price).toFixed(2)}</p>
        <div class="item-status">
          <span class="status-text-item">Available</span>
          <div class="checkbox-wrapper-14">
            <input id="js-${id}" type="checkbox" class="item-switch switch" checked>
            <label for="js-${id}"></label>
          </div>
        </div>
      </div>
      <div class="food-item-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Add the new juice item to the list
    juicebarItemsList.appendChild(newJuiceItem);

    // Add event listeners for the new item
    const itemSwitch = newJuiceItem.querySelector(".item-switch");
    const statusText = newJuiceItem.querySelector(".status-text-item");
    const editBtn = newJuiceItem.querySelector(".edit-btn");
    const deleteBtn = newJuiceItem.querySelector(".delete-btn");

    // Set up availability toggle
    itemSwitch.addEventListener("change", () => {
      if (itemSwitch.checked) {
        statusText.textContent = "Available";
        statusText.style.color = "green";
      } else {
        statusText.textContent = "Not Available";
        statusText.style.color = "red";
      }
    });

    // Edit button functionality
    editBtn.addEventListener("click", () => {
      console.log("Edit juice item:", id);
      // Add edit functionality here if needed
    });

    // Delete button functionality
    deleteBtn.addEventListener("click", () => {
      newJuiceItem.remove();
      console.log("Delete juice item:", id);
    });
  }
}

function initAddBookshopItemFunctionality() {
  const addBookshopItemBtn = document.getElementById("add-bookshop-btn");
  const bookshopItemWindowContainer = document.getElementById("additembookshopWindowContainer");
  const bookshopItemForm = document.querySelector("#additembookshopWindowContainer .add-item-form");
  const bookshopCancelBtn = document.querySelector("#additembookshopWindowContainer #bookshop-cancel-btn");
  const bookshopSubmitBtn = document.querySelector("#additembookshopWindowContainer #bookshop-submit-btn");
  const bookshopItemsList = document.getElementById("bookshop-items-list");

  // Toggle juice item window visibility
  function toggleBookshopItemWindow(show) {
    if (show) {
      bookshopItemWindowContainer.classList.remove("non-visible");
      bookshopItemWindowContainer.classList.add("visible");
    } else {
      bookshopItemWindowContainer.classList.remove("visible");
      bookshopItemWindowContainer.classList.add("non-visible");
    }
  }

  // Add bookshop item button click event
  if (addBookshopItemBtn) {
    addBookshopItemBtn.addEventListener("click", () => {
      toggleBookshopItemWindow(true);
    });
  }

  // Cancel button click event
  if (bookshopCancelBtn) {
    bookshopCancelBtn.addEventListener("click", () => {
      bookshopItemForm.reset();
      toggleBookshopItemWindow(false);
    });
  }

  // Form submission event
  if (bookshopItemForm) {
    bookshopItemForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values using correct IDs
      const name = document.getElementById("add-bookshop-name").value;
      const price = document.getElementById("add-bookshop-price").value;


      if (name && price) {
        // Add new juice item
        addNewBookshopItem(name, price);

        // Reset form and close window
        bookshopItemForm.reset();
        toggleBookshopItemWindow(false);
      }
    });
  }

  // Function to add a new bookshop item to the list
  function addNewBookshopItem(name, price) {
    // Generate unique ID for the new item
    const id = Date.now().toString();

    // Create new bookshop item element
    const newBookshopItem = document.createElement("div");
    newBookshopItem.className = "food-item";
    newBookshopItem.dataset.id = id;
  

    // Create HTML structure for the bookshop item
    newBookshopItem.innerHTML = `
      <div class="food-item-info">
        <h4>${name}</h4>
        <p>LKR ${parseFloat(price).toFixed(2)}</p>
        <div class="item-status">
          <span class="status-text-item">Available</span>
          <div class="checkbox-wrapper-14">
            <input id="js-${id}" type="checkbox" class="item-switch switch" checked>
            <label for="js-${id}"></label>
          </div>
        </div>
      </div>
      <div class="food-item-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Add the new bookshop item to the list
    bookshopItemsList.appendChild(newBookshopItem);

    // Add event listeners for the new item
    const itemSwitch = newBookshopItem.querySelector(".item-switch");
    const statusText = newBookshopItem.querySelector(".status-text-item");
    const editBtn = newBookshopItem.querySelector(".edit-btn");
    const deleteBtn = newBookshopItem.querySelector(".delete-btn");

    // Set up availability toggle
    itemSwitch.addEventListener("change", () => {
      if (itemSwitch.checked) {
        statusText.textContent = "Available";
        statusText.style.color = "green";
      } else {
        statusText.textContent = "Not Available";
        statusText.style.color = "red";
      }
    });

    // Edit button functionality
    editBtn.addEventListener("click", () => {
      console.log("Edit juice item:", id);
      // Add edit functionality here if needed
    });

    // Delete button functionality
    deleteBtn.addEventListener("click", () => {
      newBookshopItem.remove();
      console.log("Delete juice item:", id);
    });
  }
}