# Dokku deployment instructions

This guide assumes Dokku is already [installed](https://dokku.com/docs/getting-started/installation/) on the remote server.

## Set up Dokku app on remote server

```
dokku apps:create quasar-gerilife
```

### Configure GeriLife address and port

The Quasar app will need to connect to a GeriLife server, using address and port.

```
dokku config:set quasar-gerilife GERILIFE_SERVER_ADDRESS=<server-address>
```

```
dokku config:set quasar-gerilife GERILIFE_SERVER_PORT=<port-number>
```

## Add Git remote for Dokku server

The local Git repository will need to be configured with a Dokku remote.

```
git remote add dokku dokku@<server-address>:quasar-gerilife
```

s

## Deploy

In order to deploy, simply push the `main` branch to the Dokku server.

```
git push dokku main
```

### Server resources

Note: when deploying the server, ensure there is enough CPU reserved to build the app. For example, reserve 4x CPU resources on a Hetzner Cloud instance. The server resources can be scaled back down after the build finishes.

## Reference(s)

- [Build and deploy static Vue/React SPA on Dokku ](https://dev.to/jaschabur/build-and-deploy-static-vue-react-spa-on-dokku-6jj)
