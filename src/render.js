const { ipcRenderer, remote } = require('electron');
const cache = []; // Cache for storing fetched cat images

document.addEventListener('DOMContentLoaded', () => {
  const catImage = document.getElementById('catImage');

  // Fetch the initial cat image when the app loads
  fetchCatImage();

  // Automatically update the cat image every 2 seconds
  setInterval(fetchCatImage, 2000);

  async function fetchCatImage() {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      if (data.length > 0) {
        const imageUrl = data[0].url;

        // Cache the image
        cache.push(imageUrl);

        // Display the image from the cache
        displayCachedImage();

        // Check if the catImage element exists before setting its properties
        if (catImage) {
          catImage.src = imageUrl;
          catImage.width = 420;
          catImage.height = 300;
        }
      } else {
        console.error('No cat images found.');
      }
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  }

  function displayCachedImage() {
    if (cache.length > 0) {
      const cachedImageUrl = cache[cache.length - 1]; // Display the latest cached image
      if (catImage) {
        catImage.src = cachedImageUrl;
        catImage.style.width = '100%';
        catImage.style.height = '100%';
        catImage.style.objectFit = 'cover'; // This will ensure that the aspect ratio of the image is maintained
      }
    }
  }

  // Create a custom menu
  const menu = new remote.Menu();

  // Create a "Get New Cat" menu item
  const getNewCatMenuItem = new remote.MenuItem({
    label: 'Get New Cat',
    click: () => fetchCatImage(),
  });

  // Add the menu item under the File menu
  const fileMenu = new remote.Menu();
  fileMenu.append(getNewCatMenuItem);

  menu.append(new remote.MenuItem({
    label: 'File',
    submenu: fileMenu
  }));

  // Set the application menu to the custom menu
  remote.Menu.setApplicationMenu(menu);
});
