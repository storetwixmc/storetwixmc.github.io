document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior to handle adding to cart first

            const product = {
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.name === product.name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = button.href; // Redirect to checkout page
        });
    });
});
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 30; // Reduced the number of snowflakes

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${Math.random() * 6 + 4}s`; // Random duration between 4-10 seconds
        snowflake.style.animationDelay = `${Math.random() * 3}s`;
        snowContainer.appendChild(snowflake);
    }
}

document.addEventListener('DOMContentLoaded', createSnowflakes);
