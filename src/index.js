//index.js
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const checkForUpdates = require('./update')


let mainWindow;

// Initialize the auto-updater
checkForUpdates();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 350,
    icon: path.join(__dirname, '../assets/icon.png'), // Set the icon option
    webPreferences: {
      preload: path.join(__dirname, 'render.js'),
    },
    resizable: false,   // Prevent resizing, for development set rezizable to true
    maximizable: false, // Prevent maximizing
    fullscreen: false,  // Prevent full-screen mode
    fullscreenable: false, // Disallow full-screen
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  //developer tools disable
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};


app.on('ready', () => {
  createWindow();
  
  // Create a custom menu
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Get New Cat',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('get-new-cat');
            }
          },
        },
          //new button for manualy check updates on RC 1.2.0
        {
          label: 'Check for updates',
          click: () => {
            if (mainWindow) {
              checkForUpdates();
            }
          }


        },
        
        {
          role: 'quit',
        },
      ],
    },
  ]);

  // Set the application menu
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
