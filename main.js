// In the main process.  const { BrowserView, BrowserWindow } = require('electron')

const {app, BrowserWindow, Menu, BrowserView} = require('electron');
electron = require('electron');
const {ipcMain} = require('electron');
let start = 0;
let easyWin;

function CreateMainWin() {
	let win = new BrowserWindow({width: 600, height: 800});
    easyWin = win;
	win.on('closed', () => {
		win = null;
		clearInterval(intervalTask);
	});

    CreateInvervalTask(1000);

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
	});

	win.webContents.loadURL(`file://${__dirname}/test.html`);
	win.webContents.openDevTools();
	return win;
}

function CreateInvervalTask(interval) {
	intervalTask = setInterval(() => {
		if (start) {
			easyWin.webContents.sendInputEvent({keyCode: 'F9', type: 'keyDown'});
			console.log('F9');
		}
	}, interval);
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
		console.log('stop: ', arg);
		start = 0;
	});

	ipcMain.on('interval', (event, arg) => {
		console.log('interval: ', arg);
        interval = arg;
		if (interval > 50) {
			clearInterval(intervalTask);
            CreateInvervalTask(interval);
		}
	});
}
app.on('ready', main);
