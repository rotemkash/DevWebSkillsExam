/**
 * Shopping Cart Application
 *
 * This script implements a shopping cart functionality for an e-commerce website.
 * It fetches products from the Fake Store API, allows users to add/remove products,
 * adjust quantities, and calculates order totals with dynamic shipping costs.
 *
 * Features:
 * - Product listing with add to cart functionality
 * - Cart management (add, remove, update quantity)
 * - Order summary with subtotal, shipping, and total calculation
 * - Persistent cart using localStorage
 * - Responsive design using Bootstrap
 * - Special shipping rules (increased shipping for orders with more than 4 items)
 *
 * @author Rotem Kashani
 * @version 1.0
 */

document.addEventListener("DOMContentLoaded", async function() {
    // DOM element references for manipulation
    const productsContainer = document.getElementById("products-container");
    const cartItemsContainer = document.getElementById("cart-items");
    const productsTotal = document.getElementById("products-total");
    const shippingCost = document.getElementById("shipping-cost");
    const orderTotal = document.getElementById("order-total");

    /**
     * Initialize cart from localStorage or create an empty array if none exists
     * This ensures cart persistence between page refreshes
     * @type {Array<Object>}
     */
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    /**
     * Fetches products from the Fake Store API
     * Handles potential network errors with appropriate user feedback
     * @async
     * @returns {Promise<void>}
     */
    async function fetchProducts() {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            productsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        Failed to load products. Please try again later.
                    </div>
                </div>
            `;
        }
    }

    /**
     * Renders the product cards in the product container
     * Dynamically adjusts UI based on whether items are in cart
     * @param {Array<Object>} products - The products to display
     */
    function renderProducts(products) {
        productsContainer.innerHTML = "";

        products.forEach(product => {
            // Check if product is already in the cart
            const inCart = cart.find(item => item.id === product.id);

            const productCard = document.createElement("div");
            productCard.className = "col-md-4 mb-4";
            productCard.innerHTML = `
                <div class="card product-card">
                    ${product.rating && product.rating.rate >= 4.5 ?
                '<div class="featured-badge">Top Rated</div>' : ''}
                    <img src="${product.image}" class="product-image card-img-top" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text text-truncate">${product.description}</p>
                        <div class="mt-auto">
                            <p class="fw-bold">$${product.price.toFixed(2)}</p>
                            ${inCart ? `
                                <div class="quantity-selector">
                                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${product.id}, -1)">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span>${inCart.quantity}</span>
                                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${product.id}, 1)">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <button class="btn btn-danger w-100" onclick="removeFromCart(${product.id})">
                                    Remove from Cart
                                </button>
                            ` : `
                                <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                                    Add to Cart
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    /**
     * Adds a product to the shopping cart
     * Fetches product details from API by ID and updates cart state
     * @async
     * @param {number} productId - The ID of the product to add
     * @returns {Promise<void>}
     */
    window.addToCart = async function(productId) {
        try {
            // Fetch the specific product details from the API
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const product = await response.json();

            // Check if product is already in cart
            const existingProduct = cart.find(item => item.id === product.id);

            if (existingProduct) {
                // Increment quantity if product already exists
                existingProduct.quantity++;
            } else {
                // Add new product to cart
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }

            // Save to localStorage and update the UI
            saveCart();
            await fetchProducts(); // Refresh product display to update UI
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    /**
     * Updates the quantity of a product in the cart
     * Removes product if quantity reaches 0
     * @param {number} productId - The ID of the product to update
     * @param {number} change - The amount to change quantity by (positive or negative)
     */
    window.updateQuantity = function(productId, change) {
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex !== -1) {
            cart[productIndex].quantity += change;

            // Remove product if quantity is 0 or less
            if (cart[productIndex].quantity <= 0) {
                cart.splice(productIndex, 1);
            }

            // Save to localStorage and update the UI
            saveCart();
            fetchProducts(); // Refresh product display
        }
    };

    /**
     * Removes a product from the cart completely
     * @param {number} productId - The ID of the product to remove
     */
    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);

        // Save to localStorage and update the UI
        saveCart();
        fetchProducts(); // Refresh product display
    };

    /**
     * Saves the current cart state to localStorage and updates the cart UI
     * This function ensures persistence between page refreshes
     */
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    /**
     * Renders the cart items in the cart container
     * Displays empty cart message if cart is empty
     */

    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItemEl = document.createElement("div");
                cartItemEl.className = "cart-item";
                cartItemEl.innerHTML = `
                    <div class="cart-item-details">
                        <div>${item.title}</div>
                        <div class="text-muted">$${item.price.toFixed(2)} × ${item.quantity}</div>
                    </div>
                    <div class="quantity-selector">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemEl);
            });
        }

        // Update summary values
        updateSummary();
    }

    /**
     * Updates the order summary section
     * Calculates subtotal, applies shipping rules, and updates total
     * Shipping cost increases to $10 if more than 4 products in cart (otherwise $5)
     */

    function updateSummary() {
        // Calculate total items and subtotal
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Apply special shipping rule: $10 if more than 4 products, otherwise $5
        const shipping = totalItems > 4 ? 10 : 5;

        // Update the DOM with calculated values
        productsTotal.textContent = `$${subtotal.toFixed(2)}`;
        shippingCost.textContent = `$${shipping.toFixed(2)}`;
        orderTotal.textContent = `$${(subtotal + shipping).toFixed(2)}`;
    }

    // Initialize the page on load
    await fetchProducts();
    renderCart();
});