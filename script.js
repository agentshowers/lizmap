document.addEventListener('DOMContentLoaded', () => {
    // Screen transition functionality
    const cakeScreen = document.getElementById('cakeScreen');
    const balloonScreen = document.getElementById('balloonScreen');
    const mapScreen = document.getElementById('mapScreen');
    const candle = document.getElementById('candle');

    // Check URL parameters to determine which screen to show
    const urlParams = new URLSearchParams(window.location.search);
    const showCake = urlParams.has('liz');

    if (!showCake) {
        // Default: go directly to map
        cakeScreen.classList.remove('active');
        mapScreen.classList.add('active');
        initializeMap();
    }
    // If showCake is true, keep the existing cake screen active (default HTML state)

    // Handle candle click - transition to balloon arch screen
    candle.addEventListener('click', () => {
        cakeScreen.classList.remove('active');
        setTimeout(() => {
            balloonScreen.classList.add('active');
            // Start automatic transition after walking animation completes
            setTimeout(() => {
                balloonScreen.classList.remove('active');
                setTimeout(() => {
                    mapScreen.classList.add('active');
                    // Initialize map after showing the screen
                    initializeMap();
                }, 500);
            }, 4500); // 4.5 seconds total (0.5s delay + 4s animation)
        }, 300);
    });

    // Map initialization function
    function initializeMap() {
        // Check if map is already initialized
        if (window.mapInitialized) return;
        window.mapInitialized = true;

        const map = L.map('map').setView([30, -40], 2);

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 2,
            maxZoom: 19
        }).addTo(map);

        // Create a marker cluster group
        const markers = L.markerClusterGroup({
            disableClusteringAtZoom: 6, // At zoom level 12 and beyond, clusters break apart
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: true,
            zoomToBoundsOnClick: true
        });

        // Define pin locations
        // Format: [latitude, longitude, name, videoFileName]
        const locations = [
            [40.7128, -74.0060, "New York", "cat.mp4"],     // New York
            [41.588, -8.425, "João Sr.", "joaosr.mp4"],    // Palmeira, Braga
            [41.591, -8.429, "Pretinho", "pretinho.mp4"],  // Palmeira, Braga (offset)
            [41.585, -8.429, "Júlia", "julia.mp4"],        // Palmeira, Braga (offset)
            [41.588, -8.434, "Sagradinho", "sagradinho.mp4"], // Palmeira, Braga (offset)
            [51.6341242, -0.076747, "Davy + Ilona", "davyilona.mp4"], // North London area
            [51.54111, -0.15500, "Adam & Grace", "adamgrace.mp4"], // 24 Chalcot Square, London
            [51.5299689, -0.0694819, "Jen & Jack", "jenjack.mp4"], // East London area
            [31.44976, -9.7042, "Isla & Blossom", "islablossom.mp4"], // Atlantic Ocean area
            [51.5280001, -0.0746846, "Natalia", "natalia.mp4"], // East London area
            [34.20705, -84.140343, "Tom & Phyllis", "tomphyllis.mp4"], // Cumming, Georgia
            [40.650002, -73.949997, "Jordan", "jordan.mp4"], // Brooklyn, New York
            [30.333723, -87.14111, "Will, Anna & Ari", "willannaari.mp4"], // Pensacola Beach, Florida
            [35.787743, -78.644257, "Barbara", "barbara.mp4"], // Raleigh, North Carolina
            [25.059999, -77.345001, "Steven", "steven.mp4"], // Nassau, Bahamas
            [33.3747907, -83.1944295, "Heather", "heather.mp4"], // Georgia area
            [-8.83, 13.23, "Ana Lúcia & Hélio", "analuciahelio.mp4"], // Luanda, Angola
            [-8.85, 13.25, "Ana Lúcia & Friends", "analuciasurprise.mp4"], // Luanda, Angola (offset)
            [41.582, -8.432, "Joana & Yassine", "joanayassine.mp4"] // Palmeira, Braga (offset)
        ];

        // Create markers and add them to the cluster group
        locations.forEach(location => {
            const marker = L.marker([location[0], location[1]])
                .bindPopup(`<strong>${location[2]}</strong><br>Click to play video`);
            
            // Add click event to marker
            marker.on('click', function() {
                // Set the video source and show modal
                openVideoModal("videos/" + location[3]);
            });
            
            markers.addLayer(marker);
        });

        // Add marker cluster group to map
        map.addLayer(markers);

        // Modal functionality
        const modal = document.getElementById('videoModal');
        const closeButton = document.querySelector('.close-button');
        const videoPlayer = document.getElementById('videoPlayer');
        const videoSource = document.getElementById('videoSource');

        function openVideoModal(videoSrc) {
            // Update video source
            videoSource.src = videoSrc;
            // Load the new source
            videoPlayer.load();
            // Show modal and play
            modal.style.display = 'block';
            videoPlayer.play();
        }

        function closeVideoModal() {
            modal.style.display = 'none';
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }

        // Close the modal when clicking the close button
        closeButton.addEventListener('click', closeVideoModal);

        // Close the modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeVideoModal();
            }
        });

        // Close modal with ESC key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeVideoModal();
            }
        });
    }
}); 