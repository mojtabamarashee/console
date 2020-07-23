// In the main process.  const { BrowserView, BrowserWindow } = require('electron')

const {app, BrowserWindow, Menu, BrowserView} = require('electron');
electron = require('electron');

function createWindow() {
	let win = new BrowserWindow({width: 800, height: 600});
	win.on('closed', () => {
		win = null;
	});

	let view1 = new BrowserView({
		webPreferences: {
			nodeIntegration: false,
		},
	});
	win.setBrowserView(view1);
	view1.setBounds({x: 0, y: 0, width:800, height: 400});
    view1.setAutoResize({ width: true, height: true });
	view1.webContents.loadURL('https://d.easytrader.emofid.com/');
	setInterval(() => {
		view1.webContents.sendInputEvent({keyCode: 'F9', type: 'keyDown'});
		console.log('a');
	}, 1000);
	
	
	view = new BrowserView({
		webPreferences: {
			nodeIntegration: false,
		},
	});
	win.addBrowserView(view);
	view.setBounds({x: 0, y: 400, width:800, height: 200});
    view.setAutoResize({ width: true, height: true });
	view.webContents.loadFile('console.js');
}
app.on('ready', createWindow);
