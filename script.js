document.addEventListener('DOMContentLoaded', () => {
    // Screen transition functionality
    const cakeScreen = document.getElementById('cakeScreen');
    const doorScreen = document.getElementById('doorScreen');
    const mapScreen = document.getElementById('mapScreen');
    const candle = document.getElementById('candle');
    const door = document.getElementById('door');

    // Handle candle click - transition to door screen
    candle.addEventListener('click', () => {
        cakeScreen.classList.remove('active');
        setTimeout(() => {
            doorScreen.classList.add('active');
        }, 300);
    });

    // Handle door click - transition to map screen
    door.addEventListener('click', () => {
        doorScreen.classList.remove('active');
        setTimeout(() => {
            mapScreen.classList.add('active');
            // Initialize map after showing the screen
            initializeMap();
        }, 300);
    });

    // Map initialization function
    function initializeMap() {
        // Check if map is already initialized
        if (window.mapInitialized) return;
        window.mapInitialized = true;

        // Initialize map centered on the Atlantic to show both London and New York
        const map = L.map('map').setView([40, -20], 3);

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Create a marker cluster group
        const markers = L.markerClusterGroup({
            disableClusteringAtZoom: 12, // At zoom level 12 and beyond, clusters break apart
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: true,
            zoomToBoundsOnClick: true
        });

        // Define pin locations
        // Format: [latitude, longitude, name, videoFileName]
        const locations = [
            [51.5074, -0.1278, "London West", "cat.mp4"], // London West
            [51.5074, -0.0800, "London East", "cat.mp4"],  // London East
            [40.7128, -74.0060, "New York", "cat.mp4"]     // New York
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