
const express = require('express')
const app = express()
const port = 3000

const Account = require('./models/accounts')

const exphbs = require('express-handlebars')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('login')
})

app.post('/', (req, res) => {
  return Account.find({ email: req.body.email, password: req.body.password })
    .lean()
    .then(data => {
      if (data.length > 0) {
        res.redirect(`/welcome/${data[0]._id}`)
      } else {
        const alert = 'You might input the wrong email or password'
        res.render('login', { alert })
      }
    })
})

app.get('/welcome/:id', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .lean()
    .then(user => {
      res.render('welcome', { user })
    })
})

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')
})
