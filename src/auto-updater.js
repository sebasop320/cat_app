// auto-updater.js

const { autoUpdater } = require('electron');

// Specify the update feed URL for your GitHub repository
const feedURL = 'https://github.com/sebasop320/cat_app/releases/download/vX.Y.Z/'; // Replace with the actual URL

autoUpdater.setFeedURL({ url: feedURL });

// Check for updates
autoUpdater.checkForUpdates();

// Listen for update events
autoUpdater.on('update-available', () => {
  // An update is available, notify the user
});

autoUpdater.on('update-downloaded', () => {
  // An update is downloaded and ready to be installed
});

module.exports = autoUpdater; // Export the autoUpdater object
