document.addEventListener('DOMContentLoaded', () => {
    // Screen transition functionality
    const cakeScreen = document.getElementById('cakeScreen');
    const balloonScreen = document.getElementById('balloonScreen');
    const candle = document.getElementById('candle');

    // Handle candle click - transition to balloon arch screen
    candle.addEventListener('click', () => {
        cakeScreen.classList.remove('active');
        setTimeout(() => {
            balloonScreen.classList.add('active');
            // Start automatic transition after walking animation completes
            setTimeout(() => {
                // Navigate to the map page
                window.location.href = '/map.html';
            }, 4500); // 4.5 seconds total (0.5s delay + 4s animation)
        }, 300);
    });
}); 