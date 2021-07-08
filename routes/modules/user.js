const express = require('express')
const Account = require('../../models/accounts')
const router = express.Router()

router.get('/', (req, res) => {
  return res.redirect('/login')
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', (req, res) => {
  return Account.findOne({ email: req.body.email, password: req.body.password })
    .lean()
    .then(user => {
      if (user) {
        res.redirect(`/welcome/${user._id}`)
      } else {
        const alert = 'You might input the wrong email or password'
        res.render('login', { alert })
      }
    })
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
