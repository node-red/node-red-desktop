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

var os = require('os');
var path = require('path');
var http = require('http');
var expressApp = require('express')();
var server = http.createServer(expressApp);
var RED = require('node-red');
var { app, Menu, dialog, shell, Tray } = require('electron');
var tray = null;

var settings = {
    uiHost: '127.0.0.1',
    uiPort: process.env.PORT || 1880,
    httpAdminRoot: '/red',
    httpNodeRoot: '/',
    userDir: path.join(os.homedir(), '.node-red-standalone'),
    editorTheme: { projects: { enabled: true } }
};
var url = 'http://' + settings.uiHost + ':' + settings.uiPort + settings.httpAdminRoot;

if (process.platform === 'darwin') {
    process.env.PATH += ':/usr/local/bin';
    app.dock.hide();
}
if (!app.requestSingleInstanceLock()) {
    shell.openExternal(url);
    app.quit();
} else {
    RED.init(server, settings);
    expressApp.use(settings.httpAdminRoot, RED.httpAdmin);
    expressApp.use(settings.httpNodeRoot, RED.httpNode);
    server.on('error', function (error) {
        dialog.showErrorBox('Error', error.toString());
        app.exit(1);
    });
    server.listen(settings.uiPort, settings.uiHost, function () {
        RED.start().then(function () {
            app.whenReady().then(function () {
                var icon = (process.platform === 'darwin') ? 'iconTemplate.png' : 'icon.png';
                tray = new Tray(path.join(__dirname, 'build' ,icon));
                tray.setToolTip('Node-RED');
                tray.on('click', function () {
                    shell.openExternal(url);
                });
                tray.setContextMenu(Menu.buildFromTemplate([
                    {
                        label: 'Node-RED', click: function () {
                            shell.openExternal(url);
                        }
                    },
                    {
                        label: 'Quit', click: function () {
                            app.exit(1);
                        }
                    }
                ]));
                shell.openExternal(url);
            });
        }).catch(function (error) {
            dialog.showErrorBox('Error', error.toString());
            app.exit(1);
        });
    });
}
