const express = require('express')
const Account = require('../../models/accounts')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect(`/welcome/${req.user._id}`)
  }
  return res.redirect('/login')
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  return res.redirect(`/welcome/${req.user._id}`)
})

router.get('/welcome/:id', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .lean()
    .then(user => {
      res.render('welcome', { user })
    })
})

module.exports = router
