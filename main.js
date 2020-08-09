// In the main process.  const { BrowserView, BrowserWindow } = require('electron')

const {app, BrowserWindow, Menu, BrowserView} = require('electron');
const {session} = require('electron');
electron = require('electron');
const {ipcMain} = require('electron');
let startFlag = 0;
let easyWin;
let debug = 1;

function CreateMainWin() {
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  });
  easyWin = win;
  win.on('closed', () => {
    win = null;
    clearInterval(intervalTask);
  });

  //CreateInvervalTask(1000);

  const filter = {
    urls: ['*://*/*'],
  };
  //win.webContents.loadURL('https://d.easytrader.emofid.com/');
  win.webContents.loadFile('./test2.html');
  //win.webContents.openDevTools();

  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      if (details.uploadData) {
        //const buffer = Array.from(details.uploadData)[0].bytes;
        //console.log('Request body: ', buffer.toString() + '\n\n');
        //console.log('Response body: ', JSON.stringify(details) + '\n\n');
      }
      callback(details);
    },
  );

  session.defaultSession.webRequest.onResponseStarted(filter, details => {
    if (details.responseHeaders) {
      const buffer = details.responseHeaders;
      //console.log('Response body: ', JSON.stringify(buffer));
    }
    //callback(details);
  });

  return win;
}

function CreateCommandWin() {
  let win = new BrowserWindow({
    width: 400,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      'web-security': false,
      webviewTag: true,
    },
  });
  let close = 0;
  win.on('closed', () => {
    win = null;
  });

  if (debug) {
    win.webContents.loadURL(`https://d.easytrader.emofid.com/`);
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
  easyWin = CreateMainWin();
  CreateCommandWin();
  //setTimeout(() => {
  //  easyWin.webContents.executeJavaScript(`
  //  var script = document.createElement('script');
  //  script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
  //  script.onload = script.onreadystatechange = function() {
  //    $(document).ready(function() {
  //      console.log('$ = ', $);
  //      $.ajax({
  //        type: 'POST',
  //        url: 'https://d11.emofid.com/easy/api/OmsOrder',
  //        crossDomain: true,
  //        xhrFields: {
  //          withCredentials: true,
  //        },
  //        data: {
  //          isin: 'IRO1PTEH0001',
  //          financeId: 1,
  //          quantity: 1000,
  //          price: 50650,
  //          side: 0,
  //          validityType: 74,
  //          validityDateJalali: '1399/5/16',
  //          easySource: 1,
  //          referenceKey: '6d3bb7da-8471-432c-8a82-f77b0545a0e3',
  //          cautionAgreementSelected: false,
  //        },
  //        success: function(msg) {
  //          alert('wow' + msg);
  //        },
  //      });
  //    });
  //  };
  //  document.body.appendChild(script);
  //        `);
  //}, 10000);

  ipcMain.on('start', (event, arg) => {
    console.log('start');
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
      console.log('clearInterval');
    }
    startFlag = 0;
  });

  ipcMain.on('interval', (event, arg) => {
    interval = arg;
    if (interval > 50) {
      console.log('interval: ', arg);
      if (startFlag == 1) {
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
