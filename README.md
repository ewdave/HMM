# HMM
## Staple boilerplate for Typescript, Express, Socket.io and MySQL
### By Chris Cates :star:
#### Licensed under GNU Public License

### Installation Instructions

1. Have Node 7+ installed
2. Have gulp installed `npm install gulp -g`
3. Run `gulp`
4. App will run in `~/build`

### `~/src` Contents

1. `~/handlers` contain all the routes for the app.
2. `~/middleware` contain all the middleware to validate the routes for the app.
3. `~/models` contain all the data models in MySQL for the app.
4. `~/db.ts` contains the connection pool for MySQL.
5. `~/env.ts` contains the environment variables for dev/prod or whatever else environment you want.
6. `~/server.ts` contains the core application structure.
7. `~/socket.ts` contains all the Socket.io structures.
8. `~/tables.ts` contains all the table schemas.
