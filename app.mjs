import express from 'express';
import {engine} from 'express-handlebars';
import * as model  from './models/model_PG.js';
import bodyParser from "body-parser";
const app = express();
import routes from './routes/routes.js'

app.use(express.static('public'));
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({extended:true}));

app.use('/',routes);

//INSERT USERS

let port = process.env.PORT || '3000';
const server = app.listen(port, () => { console.log("Περιμένω αιτήματα στο port " + port) });

//http://localhost:3000/?departure=Athens&arrival=Kos&depart-date=2022-05-27&return-date=2022-05-31
//COMMENT