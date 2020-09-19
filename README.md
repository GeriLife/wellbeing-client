# wellbeing-client
Client-only code for Wellbeing project.

# Setup
After cloning the app,
- Run `Yarn` command to installed dependencies
- To start the application in development mode run `yarn dev` which will start the Application on the port 8080.
- The meteor server supports HTTP requests. The method and collection methods are available by the routes `/methods/<method-name>` and `/collections/<collection-name>`. So to work with the meteor server, the frontend must know where to redirect the requests to. So to run the App successfully, the meteor server must be on. Set the URL of the server in the  `.env` file of the frontend folder using the key `BASE_URL`. E.g. in local mode `BASE_URL=http://localhost:3000/`
