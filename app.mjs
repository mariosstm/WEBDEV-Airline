import express from 'express';
import {engine} from 'express-handlebars';
const app = express();
import session from 'express-session';
import routes from './routes/routes.js';
import auth from './routes/auth.js';

app.use(express.static('public'));
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

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

app.use('/', routes);
app.use('/', auth);


let port = process.env.PORT || '3000';
const server = app.listen(port, () => { console.log("Περιμένω αιτήματα στο port " + port) });

//http://localhost:3000/?departure=Athens&arrival=Kos&depart-date=2022-05-27&return-date=2022-05-31
//COMMENT