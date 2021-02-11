# wellbeing-client
Client-only code for Wellbeing project.

# Setup
After cloning the app,
- Run `Yarn` command to installed dependencies
- To start the application in development mode run `yarn dev` which will start the Application on the port 8080.
- The meteor server supports HTTP requests. The method and collection methods are available by the routes `/methods/<method-name>` and `/collections/<collection-name>`. So to work with the meteor server, the frontend must know where to redirect the requests to. So to run the App successfully, the meteor server must be on. Set the URL of the server in the  `.env` file of the frontend folder using the key `BASE_URL`. E.g. in local mode `BASE_URL=http://localhost:3000/`


# Running android app (Dev mode)
- Install android tools. (http://www.webupd8.org/2012/08/install-adb-and-fastboot-android-tools.html)
- Make sure developer mode is on in your android device and is on the same network as the android dev server.
- Connect android device by one connecting using a USB port and running the following commands
    - adb tcpip 5555
    - adb connect <device-ip>
- To start the dev server run `yarn android-dev`