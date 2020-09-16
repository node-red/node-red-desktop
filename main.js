/**
 * Copyright OpenJS Foundation and other contributors 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var http = require('http');
var expressApp = require('express')();
var server = http.createServer(expressApp);
var RED = require('node-red');
var { app, BrowserWindow, shell, Menu } = require('electron');

var settings = {
    uiPort: process.env.PORT || 1880,
    httpAdminRoot: '/red',
    httpNodeRoot: '/',
    editorTheme: { projects: { enabled: true } }
};

var win;
var createWindow = function () {
    Menu.setApplicationMenu(new Menu());
    win = new BrowserWindow({ titleBarStyle: 'hidden', frame: (process.platform !== 'darwin')});
    win.maximize();
    var template = [{
        label: 'Node-RED',
        submenu: [{ label: 'About', role: 'about' }, { label: 'Quit', role: 'quit' }]
    }, {
        label: 'View',
        submenu: [{ role: 'reload', accelerator: 'F5' }, { type: 'separator' },
                  { role: 'resetzoom' }, { role: 'zoomin' }, { role: 'zoomout' }]
    }, {
        label: 'Window',
        submenu: [{
            label: 'Toggle Maximize', accelerator: 'F9',
            click: function () {
                if (win.isMaximized()) { win.setSize(800, 600); } else { win.maximize(); }
            }
        },
        { role: 'togglefullscreen', accelerator: 'F11' },
        { type: 'separator' }, { role: 'toggledevtools', accelerator: 'F12' }]
    }];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    win.setMenuBarVisibility(false);
    win.webContents.on('new-window', function (event, url) {
        event.preventDefault();
        shell.openExternal(url);
    });
    win.webContents.on('did-finish-load', function () {
        win.webContents.insertCSS('#red-ui-header { -webkit-app-region: drag; }');
        win.webContents.insertCSS('#red-ui-header > ul { -webkit-app-region: no-drag; }');
    });
    win.loadURL('http://localhost:' + settings.uiPort + settings.httpAdminRoot);
    app.on('second-instance', function () {
        if (win.isMinimized()) { win.restore(); }
        win.focus();
    });
};

if (!app.requestSingleInstanceLock()) {
    app.quit();
} else {
    RED.init(server, settings);
    expressApp.use(settings.httpAdminRoot, RED.httpAdmin);
    expressApp.use(settings.httpNodeRoot, RED.httpNode);
    server.listen(settings.uiPort);
    RED.start().then(function () {
        app.whenReady().then(createWindow);
    });
}
