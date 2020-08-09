const {app, BrowserWindow} = require('electron');

let demo;

app.on('ready', () => {
  demo = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      'web-security': false,
    },
  });
  demo.webContents.openDevTools();
  demo.loadURL(`file:///${__dirname}/test2.html`);
  demo.on('close', () => {
    demo = null;
  });
});
