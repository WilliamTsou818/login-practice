
const express = require('express')
const app = express()
const port = 3000

const Account = require('./models/accounts')

const exphbs = require('express-handlebars')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/account', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  return Account.find({email : req.body.email, password : req.body.password})
  .lean()
  .then(data => {
    if (data.length > 0) {
      res.redirect(`/welcome/${data[0]._id}`)
    } else {
      const alert = 'You might input the wrong email or password'
      res.render('index', { alert })
    }
  })
})

app.get('/welcome/:id', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .lean()
    .then(user => {
      res.render('welcome', {user})
    })
})

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')
})

