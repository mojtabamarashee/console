// In the main process.  const { BrowserView, BrowserWindow } = require('electron')

const {app, BrowserWindow, Menu, BrowserView} = require('electron');
electron = require('electron');
const {ipcMain} = require('electron');
let startFlag = 0;
let easyWin;
let debug = 1;

function CreateMainWin() {
	let win = new BrowserWindow();
	easyWin = win;
	win.on('closed', () => {
		win = null;
		clearInterval(intervalTask);
	});

	//CreateInvervalTask(1000);

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

	if (debug) {
		win.webContents.loadFile('./test.html');
	} else {
		win.webContents.loadURL('http://filterbourse.ir/main/test.html');
	}
	win.webContents.openDevTools();
	return win;
}

function CreateInvervalTask(interval) {
	intervalTask = setInterval(() => {
		if (1) {
			easyWin.webContents.sendInputEvent({keyCode: 'F9', type: 'keyDown'});
			let D = new Date();
			console.log(
				'send request at ' +
					D.getHours() +
					' : ' +
					D.getMinutes() +
					' : ' +
					D.getSeconds() +
					' : ' +
					D.getMilliseconds(),
			);
		}
	}, interval);
}

function main() {
	CreateMainWin();
	CreateCommandWin();

	ipcMain.on('start', (event, arg) => {
		console.log('start'); // this comes form within window 1 -> and into the mainProcess
		interval = arg;
		console.log('interval = ', interval);
		CreateInvervalTask(interval);
		event.sender.send('nameReply', {not_right: false}); // sends back/replies to window 1 - "event" is a reference to this chanel.
		//window2.webContents.send('forWin2', arg); // sends the stuff from Window1 to Window2.
		startFlag = 1;
	});

	ipcMain.on('stop', (event, arg) => {
		console.log('stop: ', arg);
		startFlag = 0;
		if (typeof intervalTask != 'undefined') {
			clearInterval(intervalTask);
            console.log("clearInterval");
		}
		startFlag = 0;
	});

	ipcMain.on('interval', (event, arg) => {
		interval = arg;
		if (interval > 50) {
			console.log('interval: ', arg);
			if ((startFlag == 1)) {
				clearInterval(intervalTask);
				CreateInvervalTask(interval);
			}
		}
	});
}

if (debug) {
	app.on('ready', main);
} else {
	main();
}
