import express from 'express';
import * as model from '../models/model_PG.js';


const router = express.Router();

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
  return res.render('flights', {layout: 'no-nav-main', formData: req.query, departFlights: filtFlights});
}

let renderHomePage = function (req, res) {
  console.log('user', req.user);
  if (!req.user) { 
    return res.render('home', {layout:'main', user: null});
  }

  return res.render('home', {layout:'main', user: req.user});
}

let renderDest = function (req, res) {
  res.render('destinations', {layout:'main'});
}

let renderFaq = function (req, res) {
  res.render('faq', {layout:'main'});
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

let renderProfile = function (req, res) {
  res.render('profilePage', {layout:'main'});
}

let renderAdminMain = function (req, res) {
  res.render('adminMain', {layout:'main'});
}


router.route('/').get(renderHomePage);
router.route('/destinations').get(renderDest);
router.route('/faq').get(renderFaq);
router.route('/sign-up').get(renderSignUpPage);
router.route('/about-us').get(renderAboutUs);
router.route('/user-info-form').get(renderUserInfoForm);
router.route('/flights').get(renderFlights);
router.route('/my-account').get(renderProfile);
router.route('/admin').get(renderAdminMain);

export default router;