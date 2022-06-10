import express from 'express';
import * as model from '../models/model_PG.js';


const router = express.Router();



let renderFlights = function (req, res) {

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
  res.render('contactUS',{layout:'main',user:req.user});
}

let renderConfirmation=function(req,res){
  model.createTicketPassengerRelation(req.session.passport.user.id,req.body, function(err,passenger) {
    return res.render('confirmation',{layout:'no-nav-main',user:req.user})
  });
}

let renderBookings=function(req,res){
  model.returnBookings(req.user.id, function(err, bookings){
    // for(let ticket = 0; ticket<bookings.length)
    return res.render('myBookings', {layout:'main', user:req.user, bookings: bookings})
  })

}

router.route('/').get(renderHomePage);
router.route('/destinations').get(renderDest);
router.route('/faq').get(renderFaq);
router.route('/sign-up').get(renderSignUpPage);
router.route('/about-us').get(renderAboutUs);
router.route('/user-info-form').get(renderUserInfoForm);
router.route('/flights').get(renderFlights);
router.route('/flights/passengers').get(renderFlightPassengers);

router.route('/flights/passengers/confirmation').post(renderConfirmation);

router.route('/my-account').get(renderProfile);
router.route('/admin').get(renderAdminMain);
router.route('/admin/ticket').get(renderAdminTicket);
router.route('/admin/helpdesk').get(renderAdminHelp);
router.route('/admin/announcements').get(renderAdminAnnounce);
router.route('/admin/reports').get(renderAdminReports);
router.route('/contact-us').get(renderContactUS);
router.route('/my-bookings').get(renderBookings);
//router.route('/contact-us/posted').post();


export default router;