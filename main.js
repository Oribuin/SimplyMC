const { app, BrowserWindow } = require('electron');
const client = require('discord-rich-presence')("1016511847953858670");
const ejse = require('ejs-electron');
const path = require("path");
const {autoUpdater} = require("electron-updater");
let mainWindow;

// The absolute path of current this directory.
const dataDir = path.join(__dirname, 'site');

// Absolute path of ./templates directory.
const templateDir = path.join(dataDir, 'templates');

const renderTemplate = (mainWindow, template, data = {}) => {
    // Default base data which passed to the ejs template by default.
    ejse.data({
        path: path.join(templateDir, template),
        error: null,
    });

    // Load the template
    mainWindow.loadFile(path.join(templateDir, template));

    // Show the window after the template is loaded
    mainWindow.webContents.on('ready-to-show', async () => mainWindow.show());
};

app.on('ready', () => {
    mainWindow = new BrowserWindow({ show: false });
    const startTimstamp = Date.now()
    renderTemplate(mainWindow, 'index.ejs');
    mainWindow.webContents.on("page-title-updated", (event, title, explicitSet) =>{
        client.updatePresence({
            state: title,
            largeImageKey: 'icon',
            startTimestamp: startTimstamp
        })
    })
});