# Interactive World Map with Video Pins

This web application displays an interactive world map with pins that play videos when clicked.

## Features

- Interactive world map using Leaflet.js
- Pins that display videos in a modal popup when clicked
- Support for different videos for each pin
- Marker clustering for pins that are close to each other when zoomed out
- Responsive design that works on various screen sizes

## Current Demo Setup

The map currently has 3 sample pins:
- Two pins in London (East and West)
- One pin in New York

All pins currently play the same sample video (sample.mp4), but the code supports different videos for each pin.

## How to Use

1. Open `index.html` in a web browser.
2. Navigate the map by dragging and using the mouse wheel to zoom in/out.
3. Click on pins or pin clusters to interact with them.
4. When clicking on a pin, a video will play in a modal popup.
5. Close the video by clicking the X, clicking outside the video, or pressing ESC.

## Adding More Pins

To add more pins, edit the `locations` array in `script.js`:

```javascript
const locations = [
    [latitude, longitude, "Location Name", "video-file.mp4"],
    // Add more pins here
];
```

Each pin requires four parameters:
1. Latitude (decimal degrees)
2. Longitude (decimal degrees)
3. Location name (displayed in popup)
4. Video filename (must be in the same directory or include path)

## Adding Custom Videos

1. Add your video files to the same directory as the project (or create a subdirectory for them)
2. If using a subdirectory, reference it in the locations array (e.g., "videos/my-video.mp4")
3. Make sure your videos are in a format supported by HTML5 video (MP4, WebM, Ogg)

## Technologies Used

- HTML5, CSS3, JavaScript
- Leaflet.js for mapping
- Leaflet.markercluster for pin clustering 