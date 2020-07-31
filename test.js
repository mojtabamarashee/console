//const req = net.request({
//  method: 'GET',
//  protocol: 'https:',
//  hostname: 'github.com',
//  port: 443,
//  path: '/',
//});
//
//const request = new ClientRequest(req);
//request.on('response', data => {
//  console.log(data);
//});

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
      //partition: 'persist:login',
      partition: 'persist:my-session-name',
    },
  });

  win.on('closed', () => {
    win = null;
  });

  //win.webContents.openDevTools();
  win.webContents.loadURL('http://filterbourse.ir/main/login.html');
  //setTimeout(SendRequest, 10000);

  ipcMain.on('login', (event, arg) => {
    console.log('start: ', arg); // this comes form within window 1 -> and into the mainProcess
    SendRequest();
  });
}

function SendRequest() {
  //const ses = win.webContents.session;
  //  let s = session.fromPartition('persist:login');
  //console.log('ses = ', ses);
  //const request = net.request({
  //  method: 'get',
  //  //partition: 'persist:login',
  //  session: win.webContents.session,
  //  //partition: "persist:sc",
  //  url: 'http://filterbourse.ir/console/console.js',
  //  //redirect: 'manual',
  //});

  //request.on('response', response => {
  //  //console.log(data);
  //  response.on('data', chunk => {
  //    console.log(`BODY: ${chunk}`);
  //  });
  //});

  ////request.on('redirect', data => {
  ////  console.log(data);
  ////});
  //request.end();

  //var postData = JSON.stringify({user: 1, password: 1});
  //const request = net.request({
  //  method: 'POST',
  //  url: 'http://filterbourse.ir/login',
  //  partition: 'persist:my-session-name',
  //});

  //request.on('response', response => {
  //  //console.log(data);
  //  response.on('data', chunk => {
  //    //console.log(`BODY: ${chunk}`);
  //    GetSrcript();
  //  });
  //});
  //request.write(postData);
  //request.end();
  GetSrcript();

  function GetSrcript() {
    request2 = net.request({
      method: 'get',
      url: 'http://filterbourse.ir/console/console.js',
      useSessionCookies: true,
      partition: 'persist:my-session-name',
    });

    request2.on('response', response => {
      //console.log(data);
      response.on('data', chunk => {
        eval(`${chunk}`);
        win.close();
      });
    });

    request2.end();
  }
}

app.on('ready', main);
