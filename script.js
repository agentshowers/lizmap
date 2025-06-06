document.addEventListener('DOMContentLoaded', () => {
    // Screen references
    const discoScreen = document.getElementById('discoScreen');
    const cakeScreen = document.getElementById('cakeScreen');
    const videoScreen = document.getElementById('videoScreen');
    const candle = document.getElementById('candle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const muteButton = document.getElementById('muteButton');
    const catVideo = document.getElementById('catVideo');

    // Start background music (with user interaction handling)
    function startBackgroundMusic() {
        backgroundMusic.play().catch(e => {
            // If autoplay is blocked, play on first user interaction
            document.addEventListener('click', () => {
                backgroundMusic.play();
            }, { once: true });
        });
    }

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

    // Transition from disco screen to cake screen after 16 seconds
    setTimeout(() => {
        discoScreen.classList.remove('active');
        setTimeout(() => {
            cakeScreen.classList.add('active');
        }, 1);
    }, 6000);

    // Start the music immediately
    startBackgroundMusic();

    // Handle candle click - transition to video screen
    candle.addEventListener('click', () => {
        // Stop the background music
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        
        // Hide mute button during video
        muteButton.style.display = 'none';
        
        cakeScreen.classList.remove('active');
        setTimeout(() => {
            videoScreen.classList.add('active');
            // Play the cat video
            catVideo.play();
        }, 100);
    });

    // Handle video end - navigate to map
    catVideo.addEventListener('ended', () => {
        window.location.href = '/map.html';
    });
}); 