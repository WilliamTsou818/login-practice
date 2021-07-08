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
  return Account.findOne({ email: req.body.email })
    .lean()
    .then(user => {
      if (!user) {
        const alert = '該 email 尚未註冊'
        return res.render('login', { alert })
      }
      if (user.password !== req.body.password) {
        const alert = '您輸入的密碼有誤'
        return res.render('login', { alert })
      }
      return res.redirect(`/welcome/${user._id}`)
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
