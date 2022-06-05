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
  // const filtFlights = flights.filter(flight => flight.depart === req.query.departure && flight.arrive === req.query.arrival && flight.date === req.query["depart-date"].slice(8));
  // const retFlights = flights.filter(flight => flight.depart === req.query.arrival && flight.arrive === req.query.departure && flight.date === req.query["return-date"].slice(8));
  model.findJourneyViaCities(req.query.departure, req.query["depart-date"], req.query.arrival, req.query["arrival-date"], function(err, flights){
    // console.log(flights[0])
    // console.log(flights[1])
    return res.render('flights',{layout: 'no-nav-main', user: req.user, formData:req.query, departFlights: flights[0], arriveFlights: flights[1]});
  });
  //return res.render('flights', {layout: 'no-nav-main', user: req.user, formData: req.query, departFlights: filtFlights, returnFlights: retFlights});
}

let renderFlightPassengers = function (req, res) {
  const passengerCount = req.query.passengers.slice(0,1);
  const passengers = [];
  for(let i=0;i<passengerCount;i++){
    passengers.push(i);
  }
  console.log(passengers);
  return res.render('passengerInfo', {layout:'main', user: req.user, formData: req.query, passengerCount: passengers});
}

let renderHomePage = function (req, res) {
  if (!req.user) { 
    return res.render('home', {layout:'main', user: null});
  }

  return res.render('home', {layout:'main', user: req.user});
}

let renderDest = function (req, res) {
  res.render('destinations', {layout:'main', user: req.user});
}

let renderFaq = function (req, res) {
  res.render('faq', {layout:'main', user: req.user});
}

let renderSignUpPage = function (req, res) {
  res.render('signUp', {layout:'main', user: req.user});
}

let renderAboutUs = function (req, res) {
  res.render('aboutOurCo', {layout:'main', user: req.user});
}

let renderUserInfoForm = function (req, res) {
  res.render('customerInfoForm', {layout:'main', user: req.user});
}

let renderProfile = function (req, res) {
  res.render('profilePage', {layout:'main', user: req.user});
}

let renderAdminMain = function (req, res) {
  res.render('adminMain', {layout:'main', user: req.user});
}

let renderAdminTicket = function (req, res) {
  res.render('adminTicketManagement', {layout:'main', user: req.user});
}

let renderAdminHelp = function (req, res) {
  res.render('adminHelpDesk', {layout:'main', user: req.user});
}
let renderAdminAnnounce = function (req, res) {
  res.render('adminAnnouncements', {layout:'main', user: req.user});
}
let renderAdminReports = function (req, res) {
  res.render('adminReports', {layout:'main', user: req.user});
}

let renderContactUS = function(req, res){
  res.render('contactUS',{layout:'main',user:null});
}

router.route('/').get(renderHomePage);
router.route('/destinations').get(renderDest);
router.route('/faq').get(renderFaq);
router.route('/sign-up').get(renderSignUpPage);
router.route('/about-us').get(renderAboutUs);
router.route('/user-info-form').get(renderUserInfoForm);
router.route('/flights').get(renderFlights);
router.route('/flights/passengers').get(renderFlightPassengers);
router.route('/my-account').get(renderProfile);
router.route('/admin').get(renderAdminMain);
router.route('/admin/ticket').get(renderAdminTicket);
router.route('/admin/helpdesk').get(renderAdminHelp);
router.route('/admin/announcements').get(renderAdminAnnounce);
router.route('/admin/reports').get(renderAdminReports);
router.route('/contact-us').get(renderContactUS);


/*

router.route('/').post((req,res)=>{
  const startingPoint=req.body.departure;
  const destination=req.query.arrival;
  model.findJourneyViaCities(startingPoint,destination,(err,row)=>{
      console.log(startingPoint,'EWFHEHFWEOF')

    if(err) return console.error(err.message);
    else res.redirect('/flights');
  })
  // const depDate=req.session.departDate;
  // const returnDate=req.session.returnDate;
  
})

router.route("/flights/passengers").get((req,res)=>{
  const startingPoint=req.body.departure;
  const destination=req.query.arrival;
  console.log(startingPoint,'EWFHEHFWEOF') 
})
*/

export default router;