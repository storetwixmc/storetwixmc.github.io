// JavaScript to handle the pop-up info box
document.querySelectorAll('.info-button').forEach(button => {
    button.addEventListener('click', function () {
        alert('Rank perks and info go here');
    });
});
// Array to hold cart items
let cart = [];

// Function to add items to cart
function addToCart(rankName, price) {
    cart.push({ rankName, price });
    alert(rankName + ' has been added to the cart!');
    console.log(cart); // Check the cart contents in the console
}

function showInfo(info) {
    document.getElementById('infoText').innerText = info;
    document.getElementById('infoPopup').style.display = 'block';
}

function closeInfo() {
    document.getElementById('infoPopup').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == document.getElementById('infoPopup')) {
        closeInfo();
    }
}
document.addEventListener("DOMContentLoaded", function () {
    var categories = document.querySelectorAll('.category');
    categories.forEach(function (category) {
        category.addEventListener('click', function (event) {
            categories.forEach(function (item) {
                item.classList.remove('selected');
            });
            event.currentTarget.classList.add('selected');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.small-container');
            const item = {
                img: itemElement.querySelector('img').src,
                name: itemElement.querySelector('.rank-name').textContent,
                price: parseFloat(itemElement.querySelector('.price').textContent.replace(' USD', '')),
                quantity: 1
            };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'checkout.html';
        });
    });
});


  
    document.addEventListener('DOMContentLoaded', () => {
        const serverInput = 'https://discord.gg/YsgJeteQ'; // Replace this with the actual invite link
        const onlineMemberCounter = document.getElementById('onlineMemberCounter');
    
        fetchOnlineMembers(serverInput);
    
        function extractInviteCode(input) {
            const urlPattern = /^https?:\/\/(www\.)?discord\.(gg|com\/invite)\/(\w+)/;
            const match = input.match(urlPattern);
            return match ? match[3] : input;
        }
    
        function fetchOnlineMembers(input) {
            const inviteCode = extractInviteCode(input);
            const apiUrl = `https://discord.com/api/v9/invites/${encodeURIComponent(inviteCode)}?with_counts=true`;
    
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.guild) {
                        const onlineMembers = data.approximate_presence_count;
                        onlineMemberCounter.textContent = `${onlineMembers}`;
                    } else {
                        showError('Invalid invite code');
                    }
                })
                .catch(error => {
                    showError('Error fetching server data');
                    console.error('Error:', error);
                });
        }
    
        function showError(message) {
            onlineMemberCounter.textContent = message;
        }
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
    