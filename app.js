document.getElementById('copy-ip').onclick = function() {
    const ip = 'play.twixmc.com';
    navigator.clipboard.writeText(ip).then(() => {
        showPopup();
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
};

document.getElementById('close-button').onclick = function() {
    hidePopup();
};

function showPopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('show');
}

function hidePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

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
