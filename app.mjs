import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';

import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import routes from './routes/routes.js';
import auth from './routes/auth.js';
import { fileURLToPath } from 'node:url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 ώρα
  sameSite: true,
  }
}));
app.use(passport.authenticate('session'));

app.use('/', routes);
app.use('/', auth);

// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   res.locals.error = err;
//   const status = err.status || 500;
//   res.status(status);
//   res.render('error');
// });

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });




let port = process.env.PORT || '3000';
const server = app.listen(port, () => { console.log("Περιμένω αιτήματα στο port " + port) });

//http://localhost:3000/?departure=Athens&arrival=Kos&depart-date=2022-05-27&return-date=2022-05-31
//COMMENT