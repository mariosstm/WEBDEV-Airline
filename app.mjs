import express from 'express';
import {engine} from 'express-handlebars';

const app = express();
const router = express.Router();

app.use(express.static('public'));
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

let flights = [
  {"id": 1, "airline": "Aegean", "depart": "Athens", "arrive": "Berlin", "dptAirport": "ATH", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "15", "price": "90$"},
  {"id": 2, "airline": "Scoot", "depart": "Athens", "arrive": "Berlin", "dptAirport": "ATH", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "15", "price": "82$"},
  {"id": 3, "airline": "RyanAir", "depart": "Athens", "arrive": "Milan", "dptAirport": "ATH", "arrAirport": "MLN", "dptTime":"16:00", "arrTime":"20:00", "date": "17", "price": "101$"},
  {"id": 4, "airline": "Easyjet", "depart": "London", "arrive": "Berlin", "dptAirport": "LDN", "arrAirport": "BRL", "dptTime":"16:00", "arrTime":"20:00", "date": "17", "price": "63$"},
  {"id": 5, "airline": "Wiz", "depart": "London", "arrive": "Milan", "dptAirport": "LDN", "arrAirport": "MLN", "dptTime":"16:00", "arrTime":"20:00", "date": "15", "price": "96$"},
  {"id": 6, "airline": "RyanAir", "depart": "Berlin", "arrive": "Athens", "dptAirport": "BRL", "arrAirport": "ATH", "dptTime":"16:00", "arrTime":"20:00", "date": "27", "price": "82$"},
  {"id": 7, "airline": "Aegean", "depart": "Berlin", "arrive": "Athens", "dptAirport":"BRL", "arrAirport": "ATH", "dptTime":"16:00", "arrTime":"20:00", "date": "27", "price": "80$"},
  {"id": 8, "airline": "Easyjet", "depart": "Berlin", "arrive": "Athens", "dptAirport": "BRL", "arrAirport": "ATH", "dptTime":"16:00", "arrTime":"20:00", "date": "26", "price": "86$"},
  {"id": 9, "airline": "Aegean", "depart": "London", "arrive": "Athens", "dptAirport": "LDN", "arrAirport": "ATH", "dptTime":"16:00", "arrTime":"20:00", "date": "27", "price": "94$"},
];

let renderFlights = function (req, res) {
  //req.query
  const depFlights = flights.filter(flight => flight.depart === req.query.departure && flight.arrive === req.query.arrival && flight.date === req.query["depart-date"].slice(8))
  const retFlights = !req.query['return-value'] ? flights.filter(flight => flight.depart === req.query.arrival && flight.arrive === req.query.departure && flight.date === req.query["return-date"].slice(8)) : null ;

  return res.render('flights', {layout: 'no-nav-main', formData: req.query, departFlights: depFlights, returnFlights: retFlights});
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

let port = process.env.PORT || '3000';
const server = app.listen(port, () => { console.log("Περιμένω αιτήματα στο port " + port) });


//http://localhost:3000/?departure=Athens&arrival=Kos&depart-date=2022-05-27&return-date=2022-05-31