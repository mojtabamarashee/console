// In the main process.  const { BrowserView, BrowserWindow } = require('electron')

const {app, BrowserWindow, Menu, BrowserView} = require('electron');
electron = require('electron');
const {ipcMain} = require('electron');
let start = 0;

function CreateMainWin() {
	let win = new BrowserWindow({width: 600, height: 800});
	win.on('closed', () => {
		win = null;
	});

	interval = setInterval(() => {
		if (start) {
			win.webContents.sendInputEvent({keyCode: 'F9', type: 'keyDown'});
			console.log('F9');
		}
	}, 1000);

	win.webContents.loadURL('https://d.easytrader.emofid.com/');
	return win;
}

function CreateCommandWin() {
	let win = new BrowserWindow({
		width: 400,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	let close = 0;
	win.on('closed', () => {
		win = null;
		clearInterval(interval);
	});

	win.webContents.loadURL(`file://${__dirname}/test.html`);
	win.webContents.openDevTools();
	return win;
}

function main() {
	commandWin = CreateMainWin();
	mainWin = CreateCommandWin();

	ipcMain.on('start', (event, arg) => {
		console.log('start: ', arg); // this comes form within window 1 -> and into the mainProcess
		event.sender.send('nameReply', {not_right: false}); // sends back/replies to window 1 - "event" is a reference to this chanel.
		//window2.webContents.send('forWin2', arg); // sends the stuff from Window1 to Window2.
        start = 1;
	});

	ipcMain.on('stop', (event, arg) => {
		console.log('stop: ', arg); // this comes form within window 1 -> and into the mainProcess
		event.sender.send('nameReply', {not_right: false}); // sends back/replies to window 1 - "event" is a reference to this chanel.
		//window2.webContents.send('forWin2', arg); // sends the stuff from Window1 to Window2.
        start = 0;
	});
}
app.on('ready', main);
