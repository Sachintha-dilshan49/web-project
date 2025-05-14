const maxWidth = 768;
const isWithinMaxWidth = (width) => window.matchMedia(`(max-width: ${width}px)`).matches;

const mobileButton = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const authBtn = document.getElementById('authButtons');

const toggleMobileActiveClass = (element) => {
  if (element.classList.contains('mobile-active')) {
    element.classList.remove('mobile-active');
  } else {
    element.classList.add('mobile-active');
  }
};

mobileButton.addEventListener('click', () => {
  if (isWithinMaxWidth(maxWidth)) {
    toggleMobileActiveClass(mainNav);
    toggleMobileActiveClass(authBtn);
  }
});


const menuTabBtn = document.getElementById('menuTabBtn');
const reviewTabBtn = document.getElementById('reviewTabBtn');
const preOrderTabBtn = document.getElementById('preOrderTabBtn');

const menuTab = document.getElementById('menuTab');
const reviewsTab = document.getElementById('reviewsTab');
const preOderTab = document.getElementById('preOderTab');

const toggleElement = (element,commonClassname,spClassname) => {
    const tabs = document.querySelectorAll(`.${commonClassname}`);
    tabs.forEach(tab => tab.classList.remove(spClassname));
    element.classList.add(spClassname);
}

menuTabBtn.addEventListener('click',()=>{
    toggleElement(menuTabBtn,"tab-btn","active");
    toggleElement(menuTab ,"tab-pane", "selected");
});
reviewTabBtn.addEventListener('click',()=>{
    toggleElement(reviewTabBtn,"tab-btn","active");
    toggleElement(reviewsTab , "tab-pane","selected");
});
preOrderTabBtn.addEventListener('click',()=>{
    toggleElement(preOrderTabBtn,"tab-btn","active");
    toggleElement(preOderTab , "tab-pane","selected");
});


//functionality for review tab

const addRevBtn = document.getElementById("addReview");
const reviewWindowBtns = document.querySelectorAll('.reviewWindowBtn');

const toggleVisibility = (element) => {
    const reviewWindow = document.getElementById('addReviewWindowContainer');
    if(reviewWindow.classList.contains('visible') || reviewWindow.classList.contains('non-visible')){
      const revWindowVisibility = reviewWindow.classList.contains('visible');
      if(!revWindowVisibility && element==addRevBtn){
        reviewWindow.classList.remove('non-visible');
        reviewWindow.classList.add('visible');
        return;
      }
      reviewWindowBtns.forEach((reviewWindowBtn) =>{
        if(revWindowVisibility && reviewWindowBtn === element){
          reviewWindow.classList.remove('visible');
          reviewWindow.classList.add('non-visible');
        }
      });
    }else{
      console("could find the needed element!");
    }
}

addRevBtn.addEventListener('click',()=>{
  toggleVisibility(addRevBtn);
});

reviewWindowBtns.forEach(reviewWindowBtn => {
  reviewWindowBtn.addEventListener('click', () => {
    toggleVisibility(reviewWindowBtn);
  });
});

document.getElementById('reviewSubmitBtn').addEventListener('click',(event)=>{
  event.preventDefault();

  const reviewText = document.getElementById('review-info').value;
  console.log('Review submitted:', reviewText);
});



//Add to Order


const addToOrderBtns = document.querySelectorAll('add-order-btn');
addToOrderBtns.forEach(addToOrderBtn =>{
  addToOrderBtn.addEventListener('click',()=>{
    const itemName = addToOrderBtn.previousElementSibling.previousElementSibling.previousElementSibling;
    
  })
}) 





