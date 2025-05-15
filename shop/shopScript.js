const maxWidth = 768;
const isWithinMaxWidth = (width) =>
  window.matchMedia(`(max-width: ${width}px)`).matches;

const mobileButton = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");
const authBtn = document.getElementById("authButtons");

const toggleMobileActiveClass = (element) => {
  if (element.classList.contains("mobile-active")) {
    element.classList.remove("mobile-active");
  } else {
    element.classList.add("mobile-active");
  }
};

mobileButton.addEventListener("click", () => {
  if (isWithinMaxWidth(maxWidth)) {
    toggleMobileActiveClass(mainNav);
    toggleMobileActiveClass(authBtn);
  }
});

const menuTabBtn = document.getElementById("menuTabBtn");
const reviewTabBtn = document.getElementById("reviewTabBtn");
const preOrderTabBtn = document.getElementById("preOrderTabBtn");

const menuTab = document.getElementById("menuTab");
const reviewsTab = document.getElementById("reviewsTab");
const preOderTab = document.getElementById("preOderTab");

const toggleElement = (element, commonClassname, spClassname) => {
  const tabs = document.querySelectorAll(`.${commonClassname}`);
  tabs.forEach((tab) => tab.classList.remove(spClassname));
  element.classList.add(spClassname);
};

menuTabBtn.addEventListener("click", () => {
  toggleElement(menuTabBtn, "tab-btn", "active");
  toggleElement(menuTab, "tab-pane", "selected");
});
reviewTabBtn.addEventListener("click", () => {
  toggleElement(reviewTabBtn, "tab-btn", "active");
  toggleElement(reviewsTab, "tab-pane", "selected");
});
preOrderTabBtn.addEventListener("click", () => {
  toggleElement(preOrderTabBtn, "tab-btn", "active");
  toggleElement(preOderTab, "tab-pane", "selected");
});

//minus and plus button on pre order

//functionality for review tab

const addRevBtn = document.getElementById("addReview");
const reviewWindowBtns = document.querySelectorAll(".reviewWindowBtn");

const toggleVisibility = (element) => {
  const reviewWindow = document.getElementById("addReviewWindowContainer");
  if (
    reviewWindow.classList.contains("visible") ||
    reviewWindow.classList.contains("non-visible")
  ) {
    const revWindowVisibility = reviewWindow.classList.contains("visible");
    if (!revWindowVisibility && element == addRevBtn) {
      reviewWindow.classList.remove("non-visible");
      reviewWindow.classList.add("visible");
      return;
    }
    reviewWindowBtns.forEach((reviewWindowBtn) => {
      if (revWindowVisibility && reviewWindowBtn === element) {
        reviewWindow.classList.remove("visible");
        reviewWindow.classList.add("non-visible");
      }
    });
  } else {
    console("could find the needed element!");
  }
};

addRevBtn.addEventListener("click", () => {
  toggleVisibility(addRevBtn);
});

reviewWindowBtns.forEach((reviewWindowBtn) => {
  reviewWindowBtn.addEventListener("click", () => {
    toggleVisibility(reviewWindowBtn);
  });
});

document
  .getElementById("reviewSubmitBtn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    const reviewText = document.getElementById("review-info").value;
    console.log("Review submitted:", reviewText);
  });

//Add to Order

const preOrderItemsNo = document.getElementById("preOrderItems");
let numOfOrderedItem = 0;

function preOrderItemNumShow() {
  if (preOrderItemsNo.textContent > 0) {
    preOrderItemsNo.classList.remove("non-visible");
    preOrderItemsNo.classList.add("visible");
  } else {
    preOrderItemsNo.classList.remove("visible");
    preOrderItemsNo.classList.add("non-visible");
  }
}
preOrderItemNumShow();

function addPreOrdertoList(itemId, itemName, itemPrice) {
  const orderItem = document.createElement("div");
  orderItem.className = "ordered-item";
  orderItem.id = itemId;

  const orderItemName = document.createElement("div");
  orderItemName.className = "ordered-item-name";
  orderItem.textContent = itemName;

  const orderItemDetail = document.createElement("div");
  orderItemDetail.className = "ordered-item-details";

  const orderItemPrice = document.createElement("span");
  orderItemPrice.className = "ordered-item-price";
  orderItemPrice.textContent = itemPrice;

  const orderItemQuantity = document.createElement("span");
  orderItemQuantity.className = "ordered-item-quantity";

  const orderQuantityMinus = document.createElement("span");
  orderQuantityMinus.className = "order-quantity-changer minus";
  orderQuantityMinus.textContent = "-";
  orderQuantityMinus.addEventListener('click',()=>{
    if(inputNum.value>0){
      inputNum.value--;
    }
  })

  const inputNum = document.createElement("input");
  inputNum.className = "order-quantity";
  inputNum.type = "number";
  inputNum.value = 1;

  const orderQuantityPlus = document.createElement("span");
  orderQuantityPlus.className = "order-quantity-changer plus";
  orderQuantityPlus.textContent = "+";
  orderQuantityPlus.addEventListener('click',()=>{
    inputNum.value++;
  })

  orderItemQuantity.appendChild(orderQuantityMinus);
  orderItemQuantity.appendChild(inputNum);
  orderItemQuantity.appendChild(orderQuantityPlus);
  orderItemDetail.appendChild(orderItemPrice);
  orderItemDetail.appendChild(orderItemQuantity);
  orderItem.appendChild(orderItemName);
  orderItem.appendChild(orderItemDetail);

  const orderedItemList = document.getElementById("orderItemList");
  orderedItemList.appendChild(orderItem);
}

const addToOrderBtns = document.querySelectorAll(".add-order-btn");
addToOrderBtns.forEach((addToOrderBtn) => {
  if (addToOrderBtn.previousElementSibling.classList.contains("available")) {
    addToOrderBtn.addEventListener("click", () => {
      if (!addToOrderBtn.classList.contains("inactive")) {
        numOfOrderedItem++;
        const itemName =
          addToOrderBtn.previousElementSibling.previousElementSibling
            .previousElementSibling.textContent;
        const itemPrice =
          addToOrderBtn.previousElementSibling.previousElementSibling
            .textContent;
        console.log(itemName);
        console.log(itemPrice);
        console.log(addToOrderBtn.parentNode.id);

        addPreOrdertoList(addToOrderBtn.parentNode.id, itemName, itemPrice);

        preOrderItemsNo.textContent++;
        console.log(preOrderItemsNo.textContent);
        preOrderItemNumShow();

        addToOrderBtn.textContent = 'Added to List';

        // refreshNeeds();
        addToOrderBtn.classList.add("inactive");
      }
    });
  }else{
    addToOrderBtn.classList.add("inactive");
  }
});

//preOrderSide

// const preOrderInputs = document.querySelectorAll('.order-quantity');
// preOrderInputs.forEach(preOrderInput=>{
//   preOrderInput.value=0;
// })

