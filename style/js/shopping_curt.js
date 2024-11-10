document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const clearCartButton = document.getElementById('clear-cart');

    function getCartItems() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }
    
    function saveCartItems(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    function displayCartItems() {
        const cartItems = getCartItems();
        cartItemsContainer.innerHTML = '';

        let subtotal = 0;

        cartItems.forEach(product => {
            const totalProductPrice = product.price * product.quantity;
            subtotal += totalProductPrice;

            const cartItem = document.createElement('tr');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <td>
                    <div class="product-details">
                        <div style="position: relative; display: inline-block;">
                            <img src="${product.thumbnail}" alt="${product.title}" style="width: 83px; height: 87px; border-radius: 3px;">
                            <button class="remove-button" data-id="${product.id}">×</button>
                        </div>
                        <div>
                            <p style="margin: 0; font-weight:bold;font-size: 14px;font-family:'Josefin Sans'; ">${product.title}</p>
                            <p style="margin: 0; color:#a1a8c1; font-size: 14px;font-family:'Josefin Sans';">Color: ${product.color || 'Brown'}</p>
                            <p style="margin: 0; color: #a1a8c1; font-size: 14px;font-family:'Josefin Sans';">Size: ${product.size || 'XL'}</p>
                        </div>
                    </div>
                </td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <div class="quantity-control">
                        <button class="quantity-button" data-id="${product.id}" data-action="decrement">−</button>
                        <input type="number" value="${product.quantity}" min="1" class="quantity-input" data-id="${product.id}" style="width: 50px; text-align: center;">
                        <button class="quantity-button" data-id="${product.id}" data-action="increment">+</button>
                    </div>
                </td>
                <td>$${totalProductPrice.toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    function removeCartItem(productId) {
        let cartItems = getCartItems();
        cartItems = cartItems.filter(item => item.id !== productId);
        saveCartItems(cartItems);
        displayCartItems();
    }

    cartItemsContainer.addEventListener('click', (e) => {
        const cartItems = getCartItems();
        const productId = parseInt(e.target.dataset.id);

        if (e.target.classList.contains('quantity-button')) {
            const isIncrement = e.target.dataset.action === 'increment';
            const product = cartItems.find(item => item.id === productId);

            if (product) {
                if (isIncrement) {
                    product.quantity += 1;
                } else if (product.quantity > 1) {
                    product.quantity -= 1;
                }
                saveCartItems(cartItems);
                displayCartItems();
            }
        }
        if (e.target.classList.contains('remove-button')) {
            removeCartItem(productId);
        }
    });
    cartItemsContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const productId = parseInt(e.target.dataset.id);
            const newQuantity = parseInt(e.target.value);

            let cartItems = getCartItems();
            const product = cartItems.find(item => item.id === productId);
            if (product && newQuantity > 0) {
                product.quantity = newQuantity;
                saveCartItems(cartItems);
                displayCartItems();
            }
        }
    });
    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        displayCartItems();
    });
    displayCartItems();
});
