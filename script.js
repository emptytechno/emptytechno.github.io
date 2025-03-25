document.addEventListener("DOMContentLoaded", function() {
    const quantityDisplay = document.getElementById("quantity-display");
    const quantityText = document.getElementById("quantity-text");
    const quantityMenu = document.getElementById("quantity-menu");
    const customQuantityInput = document.getElementById("custom-quantity");
    const totalPriceElement = document.getElementById("total-price");
    const cartContainer = document.querySelector(".cart-items");
    const cartTotalContainer = document.querySelector(".cart-total");
    const checkoutButton = document.querySelector(".checkout-button");
    const cartCountElement = document.getElementById("cart-count");
    const addToCartButton = document.getElementById("add-to-cart"); // Button on product page
    const unitPrice = 149.00; // Price per USB
    const menuButton = document.querySelector('.menu-icon');
    const slidingMenu = document.getElementById('sliding-menu');
    const exploreButton = document.querySelector('.cta-button');


    let cartQuantity = parseInt(localStorage.getItem("cartQuantity")) || 0;

    updateCartUI();


  // Add to cart button event (Product Page)
    if (addToCartButton) {
        addToCartButton.addEventListener("click", function () {
            let selectedQuantity = parseInt(quantityText.textContent, 10) || 1;
            cartQuantity = selectedQuantity;
            localStorage.setItem("cartQuantity", cartQuantity);
            updateCartUI();
        });
    }

    if (exploreButton) {
        exploreButton.addEventListener('click', function() {
            // Smooth scroll down 1000px
            window.scrollBy({
                top: 1000,
                left: 0,
                behavior: 'smooth'
            });
        });
    }

    // Toggle dropdown menu when clicking quantity display
    if (quantityDisplay) {
        quantityDisplay.addEventListener("click", function (event) {
            event.stopPropagation();
            quantityMenu.classList.toggle("hidden");
        });
    }
    // Handle number selection from dropdown
    document.querySelectorAll(".quantity-option").forEach(option => {
        option.addEventListener("click", function(event) {
            event.stopPropagation();
            let selectedValue = this.getAttribute("data-value");

            if (selectedValue === "custom") {
                quantityText.style.display = "none";
                customQuantityInput.style.display = "inline-block";
                customQuantityInput.focus();
                quantityMenu.classList.add("hidden");
            } else {
                quantityText.textContent = selectedValue;
                updateTotalPrice(parseInt(selectedValue, 10)); // Update price based on selection
                quantityMenu.classList.add("hidden");
            }
        });
    });


    // Handle custom input field for 10+ and update UI
    if (customQuantityInput) {
        customQuantityInput.addEventListener("blur", function () {
            let customValue = parseInt(customQuantityInput.value, 10);
            if (customValue >= 11) {
                quantityText.textContent = customValue;
            } else {
                quantityText.textContent = "10+";
            }
            quantityText.style.display = "inline";
            customQuantityInput.style.display = "none";
        });
    }

    // Function to update the UI when cart changes
    function updateCartUI() {
        if (cartCountElement) {
            cartCountElement.textContent = cartQuantity;
            if (cartQuantity > 0) {
                cartContainer.innerHTML = `
                    <div class="cart-item">
                        <img src="images/product12345.png" alt="Product Image" class="product-image">
                        <div class="product-details">
                            <h2 class="product-name">The Empty USB - 1 terabyte</h2>
                            <p class="product-description">Ultra-fast, premium minimalistic USB storage solution.</p>
                            <p class="product-price">$149.00</p>
                            <div class="quantity-control">
                                        <div class="quantity-display" id="quantity-display">
                                              <span id=quantity-text>${cartQuantity}</span>
<span class="dropdown-arrow">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0171E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 9l6 6 6-6"></path>
    </svg>
</span>
                        </div>
                    
                        <div id="quantity-menu" class="quantity-menu hidden">
                            <div class="quantity-option" data-value="1">1</div>
                            <div class="quantity-option" data-value="2">2</div>
                            <div class="quantity-option" data-value="3">3</div>
                            <div class="quantity-option" data-value="4">4</div>
                            <div class="quantity-option" data-value="5">5</div>
                            <div class="quantity-option" data-value="6">6</div>
                            <div class="quantity-option" data-value="7">7</div>
                            <div class="quantity-option" data-value="8">8</div>
                            <div class="quantity-option" data-value="9">9</div>
                            <div class="quantity-option" data-value="custom">10+</div>
                        </div>
                    
                        <input type="number" id="custom-quantity" class="hidden" min="11" value="10">
                    </div>

                <!-- Remove button -->
                <button class="remove-from-cart-btn" onclick="removeItem(this)">Remove</button>

                        
                    <!-- Total Price Section -->
<div class="cart-total">
    <h2>Total: <span id="total-price">$149.00</span></h2>
</div>

        
                        </div>
                    </div>
                    </div>

                    `;
                cartTotalContainer.style.display = "block";
                checkoutButton.style.display = "block";
                updateTotalPrice(cartQuantity);
            } else {
                cartContainer.innerHTML = `
                    <h2 class="empty-cart-message" style="text-align:left; font-size: 30px; font-weight: light; margin-top:-80px;">Your bag is empty.</h2>
                    <button class="continue-shopping-button" style="display:block; margin: 20px auto; background-color: #0171e3; 
                    font-size:25px; color: white; padding: 40px 80px; border: none; border-radius: 25px; 
                    cursor: pointer;" onclick="window.location.href='EmptyUSB.html'">Continue shopping</button>
                `;
                cartTotalContainer.style.display = "none";
                checkoutButton.style.display = "none";
            }
        }
    }

    // Remove item from cart
    window.removeItem = function (button) {
        cartQuantity = 0;
        localStorage.setItem("cartQuantity", cartQuantity);
        updateCartUI();
    };

    // Function to update the total price
    function updateTotalPrice(quantity) {
        const totalPrice = (unitPrice * quantity).toFixed(2);
        if (totalPriceElement) {
            totalPriceElement.textContent = `$${totalPrice}`;
        }
    }

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (quantityDisplay && !quantityDisplay.contains(event.target)) {
            quantityMenu.classList.add("hidden");
        }
    });
});


// Remove item from cart
window.removeItem = function(button) {
    const cartItem = button.closest(".cart-item");
    cartItem.remove(); // Remove the item from the DOM
    totalQuantity = 0; // Reset total quantity
    updateTotalPrice(); // Update total price
};



document.addEventListener('DOMContentLoaded', function () {
    const addToCartButton = document.getElementById('add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    let cartQuantity = parseInt(localStorage.getItem('cartQuantity')) || 0; // Get quantity from localStorage

    // Update cart count on the icon
    cartCountElement.textContent = cartQuantity;

    // When the button is pressed, increase the quantity and update cart count
    addToCartButton.addEventListener('click', function () {
        cartQuantity++; // Increase the cart quantity by 1
        localStorage.setItem('cartQuantity', cartQuantity); // Save new quantity in localStorage
        cartCountElement.textContent = cartQuantity; // Update the cart count in the icon
        updateCartUI(cartQuantity); // Update cart UI with new quantity
        
    });
});

function updateCartUI(cartQuantity) {
    // Update the cart page quantity (in case it's loaded)
    const cartItemCount = document.getElementById('cart-count');
    if (cartItemCount) {
        cartItemCount.textContent = cartQuantity;
    }

    
}


const exploreButton = document.querySelector('.cta-button');

exploreButton.addEventListener('click', function() {

    window.scrollBy({
    top: 1650, 
    left: 0,
    behavior: 'smooth'
  });
});


// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Get all the circle elements
    const circles = document.querySelectorAll('.circle');
    
    // Get the progress indicator container
    const progressIndicator = document.querySelector('.progress-indicator');
    
    // Get the elements that will trigger circle changes
    const sideImage = document.querySelector('.side-image');
    const sideImageOne = document.querySelector('.side-image-one');
    const cover = document.querySelector('.cover');
    
    // Get the footer element
    const footer = document.querySelector('footer');
    
    // Get the position of the first side image (when to start showing the indicator)
    const sideImagePosition = sideImage.getBoundingClientRect().top + window.scrollY - 200;
    const sideImageOnePosition = sideImageOne.getBoundingClientRect().top + window.scrollY - 200;
    
    // Get the position of the footer (when to hide the indicator)
    const footerPosition = footer.getBoundingClientRect().top + window.scrollY - window.innerHeight + 100;
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Show/hide the progress indicator based on first side image position and footer position
        if (scrollPosition >= sideImagePosition && scrollPosition < footerPosition) {
            progressIndicator.classList.add('visible');
        } else {
            progressIndicator.classList.remove('visible');
        }
        
        // Determine which section the user has scrolled to
        const viewportMiddle = scrollPosition + window.innerHeight / 2;
        
        // Get positions of key elements
        const sideImageMidpoint = sideImage.getBoundingClientRect().top + window.scrollY + sideImage.offsetHeight / 2;
        const sideImageOneMidpoint = sideImageOne.getBoundingClientRect().top + window.scrollY + sideImageOne.offsetHeight / 2;
        const coverMidpoint = cover.getBoundingClientRect().top + window.scrollY + 200;
        
        // Update active circle based on scroll position
        if (viewportMiddle < sideImageOneMidpoint - 200) {
            activateCircle(1); // First dot - side-image
        } else if (viewportMiddle < coverMidpoint+ 400) {
            activateCircle(2); // Second dot - side-image-one
        } else if (viewportMiddle < coverMidpoint + 2000) {
            activateCircle(3); // Third dot - in cover
        } else {
            activateCircle(4); // Fourth dot - deeper in cover
        }
    });
    
    // Function to activate a specific circle and deactivate others
    function activateCircle(circleNumber) {
        circles.forEach(circle => {
            circle.classList.remove('active');
        });
        
        // Note: Your HTML has circle IDs numbered from 4 to 1 (in reverse)
        // So we invert the number: 5 - circleNumber
        const targetCircleId = `circle${5 - circleNumber}`;
        document.getElementById(targetCircleId).classList.add('active');
    }
    
    // Make circles clickable to navigate to sections
    circles.forEach(circle => {
        circle.addEventListener('click', function() {
            const circleId = this.id;
            const circleNumber = parseInt(circleId.replace('circle', ''));
            const targetSection = 5 - circleNumber; // Invert the number again
            
            // Scroll to the appropriate section
            let scrollTarget = 0;
            
            switch(targetSection) {
                case 1:
                    scrollTarget = sideImagePosition;
                    break;
                case 2:
                    scrollTarget = sideImageOne.getBoundingClientRect().top + window.scrollY - 100;
                    break;
                case 3:
                    scrollTarget = cover.getBoundingClientRect().top + window.scrollY + 1200;
                    break;
                case 4:
                    scrollTarget = cover.getBoundingClientRect().top + window.scrollY + 2200;
                    break;
            }
            
            window.scrollTo({
                top: scrollTarget,
                behavior: 'smooth'
            });
        });
    });
    
    // Trigger the scroll event to initialize the indicator visibility
    window.dispatchEvent(new Event('scroll'));
});


document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) { // Change after scrolling down 50px
            header.classList.add("visible");
        } else {
            header.classList.remove("visible");
        }
    });
});

// Cart Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cartButton');
    const cartPanel = document.getElementById('cartPanel');
    const closeCartButton = document.getElementById('closeCartButton');
    const cartOverlay = document.getElementById('cartOverlay');

    // Function to open the cart panel
    function openCartPanel() {
        cartPanel.classList.add('open');
        cartOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when cart is open
    }

    // Function to close the cart panel
    function closeCartPanel() {
        cartPanel.classList.remove('open');
        cartOverlay.classList.remove('visible');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners
    cartButton.addEventListener('click', openCartPanel);
    closeCartButton.addEventListener('click', closeCartPanel);
    cartOverlay.addEventListener('click', closeCartPanel);

    // Close cart panel when ESC key is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCartPanel();
        }
    });
});


document.querySelector('.newsletter-button').addEventListener('click', function(e) {
    // Prevent default form submission if needed
    e.preventDefault();
    
    const button = this;
    
    // Add the success class to trigger the animation
    button.classList.add('success');
    
    // Remove the class after animation completes
    setTimeout(() => {
      button.classList.remove('success');
    }, 600);
    
    // Here you would handle the actual form submission
    // For example: document.querySelector('.newsletter').submit();
  });

  