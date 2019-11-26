const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true }
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "assets/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  if (process.env.NODE_ENV == "development") win.webContents.openDevTools();
  win.on("closed", () => (win = null));
}

// Start the app
app.on("ready", createWindow);