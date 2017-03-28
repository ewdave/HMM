const Assign = require('deep-assign');
const Http = require('http');
const Bcrypt = require('bcryptjs');
const Async = require('async');
const Multer = require('multer');
const UUID = require('uuid');
const Express = require('express');
const ExpressValidator = require('express-validator');
const SocketIO = require('socket.io');
const SocketIORedis = require('socket.io-redis');
const CookieParser = require('cookie-parser');
const Morgan = require('morgan');
const BodyParser = require('body-parser');
const Session: any = require('express-session');
const RedisStore: any = require('connect-redis')(Session);

const Sockets: any = require('./socket');
const Database: any = require('./db');
const Environment: Object = require('./env');

const app = Express();
const server: any = Http.createServer(app);
const io = SocketIO(server);
const DB = Database();

io.adapter(SocketIORedis(Environment['redis']));
Sockets(io);

app.use(CookieParser());
app.use(Morgan('combined'));

app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", req.get('origin'));
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return next();
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(ExpressValidator());

app.use(
  Session({
    store: new RedisStore(Environment['Redis']),
    secret: '',
    resave: false,
    saveUninitialized: false
  })
);

const upload = Multer({ dest: 'uploads/' });
app.use('/uploads', Express.static('./uploads'));
app.set('router', Express.Router());

app.use((req: any, res: any, next: any) => {
  req.db = DB;
  req.async = Async;
  return next();
});

app.use(require('./handlers/Common.js')(app));
app.use(require('./handlers/User.js')(app));

const PORT: number = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Typescript API up and Running on PORT", PORT);
});
