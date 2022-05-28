import express from 'express';
import {engine} from 'express-handlebars';

const app = express();
const router = express.Router();

app.use(express.static('public'));
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

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

let port = process.env.PORT || '3000';
const server = app.listen(port, () => { console.log("Περιμένω αιτήματα στο port " + port) });