# wellbeing-client
Client-only code for Wellbeing project.

# Setup
After cloning the app,
- Run `Yarn` command to installed dependencies
- To start the application in development mode run `yarn dev` which will start the Application on the port 8080.
- The meteor server supports HTTP requests. The method and collection methods are available by the routes `/api/methods/<method-name>` and `/collections/<collection-name>`. So to work with the meteor server, the frontend must know where to redirect the requests to. So to run the App successfully, the meteor server must be on. Set the URL of the server in the  `.env` file of the frontend folder using the key `BASE_URL`. E.g. in local mode `BASE_URL=http://localhost:3000/`

## Install the dependencies
```bash
yarn
```

## Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

## Lint the files
```bash
yarn run lint
```

## Build the app for production
```bash
quasar build
```

## Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).



# Running android app (Dev mode)
- Install android tools. (http://www.webupd8.org/2012/08/install-adb-and-fastboot-android-tools.html)
- Make sure developer mode is on in your android device and is on the same network as the android dev server.
- Connect android device by one connecting using a USB port and running the following commands
    - adb tcpip 5555
    - adb connect <device-ip>
- To start the dev server run `yarn android-dev`

# Docker deployment

## Setup

Here is a useful link (https://medium.com/@jwdobken/develop-quasar-applications-with-docker-a19c38d4a6ac) to setup docker deployment for the frontend folder. There is a one time command from it that needs to be fired to setup docker on the server. Make sure you have docker pre-installed

`cd "$_"`
`docker run --rm -v ${PWD}:/app -it node:12.20.2-alpine3.10  sh -c "yarn global add @vue/cli && vue init 'quasarframework/quasar-starter-kit' app"`

## deployment
run the following command to start the frontend server, `yarn docker-deploy`.