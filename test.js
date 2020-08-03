electron = require('electron');
const {app, BrowserWindow, Menu, session} = require('electron');
const {net} = require('electron');
const {ipcMain} = require('electron');

function main() {
	win = new BrowserWindow({
		width: 600,
		height: 800,
		title: 'Login Manually',
		webPreferences: {
			nodeIntegration: true,
			partition: 'persist:my-session-name',
		},
	});

	win.on('closed', () => {
		win = null;
	});

	//win.webContents.openDevTools();
	win.webContents.loadURL('http://filterbourse.ir/main/login.html');

	ipcMain.on('login', (event, arg) => {
		console.log('start: ', arg); // this comes form within window 1 -> and into the mainProcess
		SendRequest();
	});
}

function SendRequest() {
	GetSrcript();

	function GetSrcript() {
		request2 = net.request({
			method: 'get',
			url: 'http://filterbourse.ir/console/console.js',
			useSessionCookies: true,
			partition: 'persist:my-session-name',
		});

		request2.on('response', response => {
			response.on('data', chunk => {
				eval(`${chunk}`);
				win.close();
			});
		});

		request2.end();
	}
}

app.on('ready', main);
