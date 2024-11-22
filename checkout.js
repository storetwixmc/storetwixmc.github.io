document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        window.location.href = 'index.html';
    }
    updateCartDisplay(cart);

    document.getElementById('payment-form').addEventListener('submit', (e) => {
        const totalPriceElement = document.getElementById('total-price');
        const amountInput = document.getElementById('amount');
        amountInput.value = totalPriceElement.textContent;
    });

    function updateCartDisplay(cart) {
        const cartItemsContainer = document.querySelector('.cart-items-container');
        const totalPriceElement = document.getElementById('total-price');
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="Item Image" class="cart-item-image">
                <div class="item-info">
                    <p class="rank-name">${item.name}</p>
                    <p class="price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="item-actions">
                    <button class="decrement" style="color: red; font-weight: bold; margin-right: 2px;" data-index="${index}">-</button>
                    <input type="text" value="${item.quantity}" readonly style="width: 37px; height: 26px; text-align: center; border: 1px solid #2c2c3c; border-radius: 3px; padding: 5px; font-size: 14px; background-color: #2c2c3c; color: white;">
                    <button class="increment" style="color: green; font-weight: bold; margin-left: 2px;" data-index="${index}">+</button>
                    <button class="remove-item" data-index="${index}" style="background: none; border: none; padding: 0; cursor: pointer;">
                        <img src="dustbin.png" alt="Delete" class="delete-icon" style="width: 18px; height: 18px;">
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.innerHTML = `<span style="color: white; font-weight: bold;">Total Price:</span> <span style="color: gold; font-weight: bold;">USD ${totalPrice.toFixed(2)}</span>`;
        adjustTotalPriceContainer(cartItemsContainer.children.length);

        // Add event listeners for buttons
        document.querySelectorAll('.decrement').forEach(button => {
            button.addEventListener('click', () => updateQuantity(parseInt(button.dataset.index), -1));
        });

        document.querySelectorAll('.increment').forEach(button => {
            button.addEventListener('click', () => updateQuantity(parseInt(button.dataset.index), 1));
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => removeItem(parseInt(button.dataset.index)));
        });
    }

    function updateQuantity(index, change) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart[index].quantity += change;
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay(cart);
    }

    function adjustTotalPriceContainer(itemCount) {
        const totalPriceContainer = document.querySelector('.total-price-container');
        const baseHeight = 50; // Base height for the container
        const additionalHeight = 30; // Additional height per item
        totalPriceContainer.style.maxHeight = (baseHeight + (itemCount * additionalHeight)) + 'px';
    }

    function removeItem(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay(cart);
        if (cart.length === 0) {
            window.location.href = 'index.html';
        }
    }
});
