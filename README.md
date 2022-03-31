# Node-RED installer
The Node-RED installer is a standalone installer that includes Node-RED and Node.js.
Because this installer easily sets up the Node-RED environment by executing the installer binary, 
it is useful for beginner users who would like to start Node-RED without command-line operations.

*This project is under development. Therefore, it is not ready for production use currently.*

## Quick Start
The installer binaries are available for Windows, macOS, and Linux environments.

### Windows
(1) Download the Windows installer (Node-RED-x.x.x.msi) from [the GitHub releases page](../../releases).

(2) Execute installer which was downloaded.

(3) After installing Node-RED, the installer automatically opens the Node-RED flow editor on the default browser.

*While executing the Node-RED server, The task tray area has the Node-RED icon. To terminate the Node-RED process, you can select "Quit" on the menu of the icon.*

*Node-RED will be registered in the start menu as an application. Therefore, you can start Node-RED from the start menu after the installation.*

### macOS
(1) Download the macOS installer (Node-RED-x.x.x.dmg) from [the GitHub releases page](../../releases).

(2) Open the dmg file.

(3) Drag and drop the Node-RED icon to the Application directory.

(4) On the Finder in the Application directory, you need to right-click the Node-RED icon and select "Open" in the menu to start.

*While executing the Node-RED server, The menu bar area has the Node-RED icon. To terminate the Node-RED process, you can select "Quit" on the menu of the icon.*

# Prerequisites
 As the default, there is no prerequisite to use Node-RED but other software is needed when you use additional features.

 - Node installation

   If you want to install third-party nodes on the flow editor, you need the npm command in your environment.
   The [Node.js installer](https://nodejs.org/en/) is the simple way to install the npm command.

 - Project feature

   To use the project feature, the git command is required. To install the git command, you can use the [git installer](https://git-scm.com/).
   After installing the git command, the Node-RED environment automatically enables the project feature.
