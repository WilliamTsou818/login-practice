const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Account = require('../models/accounts')

module.exports = (app) => {
  // initiate passport.js
  app.use(passport.initialize())
  app.use(passport.session())
  // set passport local strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    Account.findOne({ email })
      .then(user => {
        if (!user) return done(null, false)
        if (user.password !== password) return done(null, false)
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))
  // set serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    Account.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
