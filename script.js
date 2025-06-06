document.addEventListener('DOMContentLoaded', () => {
    // Screen references
    const discoScreen = document.getElementById('discoScreen');
    const cakeScreen = document.getElementById('cakeScreen');
    const balloonScreen = document.getElementById('balloonScreen');
    const candle = document.getElementById('candle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const muteButton = document.getElementById('muteButton');

    // Start background music (with user interaction handling)
    function startBackgroundMusic() {
        backgroundMusic.play().catch(e => {
            // If autoplay is blocked, play on first user interaction
            document.addEventListener('click', () => {
                backgroundMusic.play();
            }, { once: true });
        });
    }

    // Start the music immediately
    startBackgroundMusic();

    // Mute/unmute functionality - start muted
    let isMuted = true;
    backgroundMusic.muted = true;
    muteButton.textContent = '🔇 UNMUTE';
    
    muteButton.addEventListener('click', () => {
        if (isMuted) {
            backgroundMusic.muted = false;
            muteButton.textContent = '🔊 MUTE';
            isMuted = false;
        } else {
            backgroundMusic.muted = true;
            muteButton.textContent = '🔇 UNMUTE';
            isMuted = true;
        }
    });

    // Transition from disco screen to cake screen after 5 seconds
    setTimeout(() => {
        discoScreen.classList.remove('active');
        setTimeout(() => {
            cakeScreen.classList.add('active');
        }, 1);
    }, 16000);

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