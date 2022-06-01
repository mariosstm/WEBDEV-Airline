import express from 'express';
import {engine} from 'express-handlebars';
import * as model  from './models/model_PG.js';
import bodyParser from "body-parser";
const app = express();
const router = express.Router();

app.use(express.static('public'));
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');


const urlencodedParser=express.urlencoded({extended:true}); 

app.use(bodyParser.urlencoded({
  extended: true
}));

let flights = [
  {"id": 1, "airline": "Aegean", "depart": "Athens", "arrive": "Berlin", "dptAirport": "ATH", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "15", "price": "90$"},
  {"id": 2, "airline": "Scoot", "depart": "Athens", "arrive": "Berlin", "dptAirport": "ATH", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "15", "price": "82$"},
  {"id": 3, "airline": "RyanAir", "depart": "Athens", "arrive": "Milan", "dptAirport": "ATH", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "17", "price": "101$"},
  {"id": 4, "airline": "Easyjet", "depart": "London", "arrive": "Berlin", "dptAirport": "ATH", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "17", "price": "63$"},
  {"id": 5, "airline": "Wiz", "depart": "London", "arrive": "Milan", "dptAirport": "ATH", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "15", "price": "96$"},
  {"id": 6, "airline": "RyanAir", "depart": "Berlin", "arrive": "Athens", "dptAirport": "ATH", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "27", "price": "82$"},
  {"id": 7, "airline": "Aegean", "depart": "Berlin", "arrive": "Athens", "dptAirport": "ATH", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "27", "price": "80$"},
  {"id": 8, "airline": "Easyjet", "depart": "Berlin", "arrive": "Athens", "dptAirport": "ATH", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "26", "price": "86$"},
  {"id": 9, "airline": "Aegean", "depart": "London", "arrive": "Athens", "dptAirport": "ATH", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "27", "price": "94$"},
];


let renderFlights = function (req, res) {
  //req.query
  const filtFlights = flights.filter(flight => flight.depart === req.query.departure && flight.arrive === req.query.arrival && flight.date === req.query["depart-date"].slice(8))
  return res.render('flights', {layout: 'main', formData: req.query, departFlights: filtFlights});
}

let renderHomePage = function (req, res) {
  res.render('home', {layout:'main'});
}

let renderDest = function (req, res) {
  res.render('destinations', {layout:'main'});
}

let renderFaq = function (req, res) {
  res.render('faq', {layout:'main'});
}

let renderSignInPage = function (req, res) {
  res.render('signIn', {layout:'main'});
}

let renderSignUpPage = function (req, res) {
  res.render('signUp', {layout:'main'});
}

let renderAboutUs = function (req, res) {
  res.render('aboutOurCo', {layout:'main'});
}

let renderUserInfoForm = function (req, res) {
  res.render('customerInfoForm', {layout:'main'});
}

let renderProfilePage = function (req, res) {
  res.render('profilePage', {layout:'main'});
}

app.use(router);


router.route('/').get(renderHomePage);
router.route('/destinations').get(renderDest);
router.route('/faq').get(renderFaq);
router.route('/sign-in').get(renderSignInPage);
router.route('/sign-up').get(renderSignUpPage);
router.route('/about-us').get(renderAboutUs);
router.route('/user-info-form').get(renderUserInfoForm);
router.route('/profile').get(renderProfilePage);
router.route('/flights').get(renderFlights);

//INSERT USERS

app.post("/profile-page",urlencodedParser,(req,res)=>{
  let ID=null;
  let Fname=req.body.Fname;
  let Mname=req.body.Mname;
  let Lname=req.body.Lname;
  let Email=req.body.Email;
  let Cellphone=req.body.Cellphone;
  let Username=req.body.Username;
  let Password=req.body.Password;
  let NewsLetter=req.body.NewsLetter;

  model.insertUser(ID,Fname,Mname,Lname,Email,Cellphone,Username,Password,NewsLetter,(err,row)=>{
    if(err){
      console.log(err.message);
      
    }
    else{
      //ADD SESSION & COOKIES
      /*
      req.sesssion.ID=row[0].ID;
      req.sesssion.Fname=row[0].Fname;
      req.sesssion.Mname=row[0].Mname;
      req.sesssion.Lname=row[0].Lname;
      req.sesssion.Email=row[0].Email;
      req.sesssion.Cellphone=row[0].Cellphone;
      req.sesssion.Username=row[0].Username;
      req.session.Password=row[0].Password;
      req.sesssion.NewsLetter=row[0].NewsLetter;
      //res.render('sign-up',{qs:req.query});
      */
      //res.redirect("/");
    }

    
  });
})

let port = process.env.PORT || '3000';
const server = app.listen(port, () => { console.log("Περιμένω αιτήματα στο port " + port) });

//http://localhost:3000/?departure=Athens&arrival=Kos&depart-date=2022-05-27&return-date=2022-05-31
//COMMENT