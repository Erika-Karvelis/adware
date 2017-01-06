# ninja-schedule

### setting up dev environment

#### set up nodejs
install nodejs, use latest stable version.
You can use [nvm](https://github.com/creationix/nvm) to install latest stable version.

#### install local dependencies
`npm install`

#### install global dependencies
`npm install sequelize-cli gulp -g`

#### create db.json file for db migration
copy `server/config/db.example.json` to `server/config/db.json`, and populate values

#### migrate database structure
<!-- `sequelize db:migrate --env development --config ./server/config/db.json` -->

#### run the application
`gulp dev`

### deploying application
TBD
