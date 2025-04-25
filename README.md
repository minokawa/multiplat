###### Created by li2@gmail.com  ######
  This monorepo is a JS boilerplate for targetting different platforms. It is using npm workspaces please use `npm 7`, implement symlinking if not possible. Default workspace folders are Web, Mobile(android), Desktop(windows) and a core/common package for shared components.

Development stack:
- Coding: ES6, Babel, Eslint, SASS
- Web: React, Webpack, Fastify and Nexe(packager).
- Desktop for windows: Electron for desktop(packager).
- Mobile for android: React Native, implementing ADB in a host(Win)/client(WSL) set up.

Clone to your WSL project folder then run npm install at root.

```
  npm install
```

Folder structure
```
root
│
└───apps
    └───desktop (target)
    └───mobile (target)
    └───web (target)
└───common
    └───idianali (shared)
```

Todo:
- [x] Web
- [ ] Mobile
- [x] Desktop
- [x] Dependency injection
- [ ] Module hotswapping
- [ ] Win/WSL setup script
- [ ] Minimal react-native config


-----
## **Web** ##

  The webserver is built on Fastiy https://www.fastify.io/. Page markup are rendered server side then hydrated in browser side by the bundled public JS.

  Start file watcher by running:
  ```
    npm run watch --workspace=@litlag/web
  ```

  To pack the webserver as a windows executable:

  ```
    npm run pack --workspace=@litlag/web
  ```

-----
## **Desktop** ##

  The desktop apps are built using Electron. This needs improvement. Vcxsrv throws gpu usage errors. Disable hardware acceleration as workaround: `--disable-gpu --disable-software-rasterizer`. The following describes how to setup Windows X Server to view desktop apps in a headless WSL distribution.

  **In Windows**

  Install VcXsrv https://community.chocolatey.org/packages/vcxsrv in Windows using Chocolatey.

  ```
    choco install vcxsrv
  ```
  Use the configurations:  "Multiple Windows" , "Start no client", "Clipboard and OpenGL integration", and add *-ac* in additional arguments.

  **In WSL**

  Add the following lines to the ~/.bashrc file.
  ```
    export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0
    export LIBGL_ALWAYS_INDIRECT=true
  ```

  To start coding, make sure vcxsrv is running in host then:
  ```
    npm run watch --workspace=@litlag/desktop
  ```

  To pack electron for distiribution:
  ```
    npm run pack --workspace=@litlag/desktop
  ```

-----
## **Mobile** ##
  >### In progress. Hoisting issue between ReactNative and NPM workspace. Looking at yarn workspace as alternative. ###
  Uses Android Debug Bridge. Runs ADB client in WSL(Ubuntu) and ADB server in host(Windows).

  **SDK on Windows(Host)**

  Install Android Studio https://developer.android.com/studio  and make sure the PATHS are using the installed SDK.

  **SDK  on Ubuntu(WSL)**

  Find `setup_wsl_sdk.sh` in `setup` folder of this repo. This script should create the ***Android*** folder in your home folder. Make sure version matches the Windows SDK. Edit  `line 12` if necesary.

  `./sdkmanager --install "platform-tools" "platforms;android-29" "build-tools;29.0.2"`

  Then run:

  ```
  ./setup_wsl_sdk.sh
  ```

  Setup the environemnt vars. Add the following in `~/.bash_profile`.

  ```
  export ANDROID_HOME=/home/<YOURE USER NAME IN WSL>/Android/cmdline-tools/latest
  export ANDROID_SDK_ROOT=/home/<YOURE USER NAME IN WSL>/Android
  export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
  export PATH=$PATH:$ANDROID_HOME/bin
  export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
  export NODE_OPTIONS=--openssl-legacy-provider
  ```

  **Communication between WSL and Host**

  Forward adb commands in WSL to the adb server(Host), Set ADB_SERVER_SOCKET to host ip address. Add the following in `~/.bash_profile`.

  ```
  export ADB_SERVER_SOCKET=tcp:$(cat /etc/resolv.conf  | grep -v '^#' | grep nameserver | awk '{print $2}'):5037
  ```

  Then the emulator(host) needs to connect to  metro(wsl). You may need to run script below as admin to setup forwarding:
  ```
  netsh interface portproxy add v4tov4 listenport=8081 listenaddress=0.0.0.0 connectport=8081 connectaddress=<IP ADDRESS OF THE WSL_CLIENT>
  ```

  **Starting the tools**

  Assuming ReactNative project is setup and there is a device in Android studio:

  `In Windows terminal`, start ADB server. Use adb kill-server to make sure it runs only in Host.

  ```
  adb kill-server
  adb -a nodaemon server start
  ```

  Then start an emulator.

  ```
  emulator -avd <NAME OF THE DEVICE CREATED IN ADNROID STUDIO>
  ```

  `In WSL terminal`, check for connection to adb server..

  Command below should show device IDs running in Host.

  ```
  adb devices
  ```

  `cd` into the React Native project folder and start:

  ```
  npx react-native start --host <THE WSLs IP ADDR>
  ```

  In WSL terminal use device id to connect to the emulator. A streamed install of the project will start then the emulator will connect to Metro.

  ```
  npx react-native run-android --variant=debug --deviceId <THE DEVICE ID>
  ```

