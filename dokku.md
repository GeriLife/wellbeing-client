# Dokku deployment instructions

This guide assumes Dokku is already [installed](https://dokku.com/docs/getting-started/installation/) on the remote server.

## Set up Dokku app on remote server

```sh
dokku apps:create gerilife-quasar
```

### Configure GeriLife address and port

The Quasar app will need to connect to a GeriLife server, using protocol, address, and port.

```sh
dokku config:set gerilife-quasar GERILIFE_SERVER_PROTOCOL=<server-protocol>
```

```sh
dokku config:set gerilife-quasar GERILIFE_SERVER_ADDRESS=<server-address>
```

```sh
dokku config:set gerilife-quasar GERILIFE_SERVER_PORT=<port-number>
```

## Add Git remote for Dokku server

The local Git repository will need to be configured with a Dokku remote.

```sh
git remote add dokku dokku@<server-address>:gerilife-quasar
```

## Deploy

In order to deploy, simply push the `main` branch to the Dokku server.

```sh
git push dokku main
```

### Server resources

Note: when deploying the server, ensure there is enough CPU reserved to build the app. For example, reserve 4x CPU resources on a Hetzner Cloud instance. The server resources can be scaled back down after the build finishes.

## Reference(s)

- [Build and deploy static Vue/React SPA on Dokku](https://dev.to/jaschabur/build-and-deploy-static-vue-react-spa-on-dokku-6jj)
