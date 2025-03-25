document.addEventListener("DOMContentLoaded", function () {
    const cartItem = document.querySelector(".cart-item");
    const totalPriceElement = document.getElementById("total-price");
    const removeButton = document.querySelector(".remove-from-cart-btn");
    const quantityDisplay = document.getElementById("quantity-display");
    const quantityText = document.getElementById("quantity-text");
    const quantityMenu = document.getElementById("quantity-menu");
    const customQuantityInput = document.getElementById("custom-quantity");
    const cartCountElement = document.getElementById("cart-count");

    let pricePerUnit = 169.00; 
    let quantity = getStoredQuantity();

    quantityText.textContent = quantity;
    updateTotal(quantity * pricePerUnit);
    updateCartCount(quantity);

    removeButton.addEventListener("click", function () {
        cartItem.remove();
        updateTotal(0);
        updateCartCount(0);
        localStorage.setItem("cartQuantity", 0); // Reset stored quantity
    });

    quantityDisplay.addEventListener("click", function () {
        quantityMenu.classList.toggle("hidden");
    });

    document.querySelectorAll(".quantity-option").forEach(option => {
        option.addEventListener("click", function () {
            let selectedValue = this.getAttribute("data-value");

            if (selectedValue === "custom") {
                customQuantityInput.classList.remove("hidden");
                customQuantityInput.value = ""; 
                customQuantityInput.focus();
            } else {
                quantity = parseInt(selectedValue);
                updateCart(quantity);
            }
        });
    });

    customQuantityInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let customValue = parseInt(this.value);
            if (!isNaN(customValue) && customValue >= 10) {
                updateCart(customValue);
            }
        }
    });

    function updateCart(newQuantity) {
        quantity = newQuantity;
        quantityText.textContent = quantity;
        updateTotal(quantity * pricePerUnit);
        updateCartCount(quantity);
        localStorage.setItem("cartQuantity", quantity); 

        quantityMenu.classList.add("hidden");
        customQuantityInput.classList.add("hidden");
    }

    function updateTotal(price) {
        totalPriceElement.textContent = `$${price.toFixed(2)}`;
    }

    function updateCartCount(count) {
        cartCountElement.textContent = count;
    }

    function getStoredQuantity() {
        return parseInt(localStorage.getItem("cartQuantity")) || 1; // Default to 1 if nothing stored
    }
});
