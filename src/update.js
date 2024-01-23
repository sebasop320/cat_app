const { dialog, shell } = require('electron');
const axios = require('axios'); // You can use Axios to make HTTP requests

// Function to compare app version with the latest GitHub release
async function checkForUpdates() {
  const currentVersion = 'V1.1.0'; // Your app's current version
  const owner = 'sebasop320'; // GitHub repository owner
  const repo = 'cat_app'; // GitHub repository name

  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
    const latestVersion = response.data.tag_name;

    if (latestVersion !== currentVersion) {
      const choice = await dialog.showMessageBox({
        type: 'info',
        buttons: ['Download Update', 'Dismiss'],
        defaultId: 0,
        message: 'A new version is available!',
        detail: `You are using version ${currentVersion}, and the latest version is ${latestVersion}.`,
      });

      if (choice.response === 0) {
        // Open the GitHub release page in the default browser
        shell.openExternal(`https://github.com/${owner}/${repo}/releases/latest`);
      }
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
}

// Call the update check function when needed (e.g., on app startup)
//checkForUpdates();
module.exports = checkForUpdates;