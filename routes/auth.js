import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import crypto from 'crypto';
import * as model from '../models/model_PG.js';

passport.use(new LocalStrategy(function verify(username, password, cb) {
  model.findUser(username, function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    //crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return cb(err); }
    if (password != row[0].Password){
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
      // if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
      //   return cb(null, false, { message: 'Incorrect username or password.' });
      // }
      return cb(null, row);
    });
}));

const router = express.Router();

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

// router.get('/sign-in', function(req, res, next) {
//   res.render('signIn');
// });
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.post('/sign-in/password', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

export default router;