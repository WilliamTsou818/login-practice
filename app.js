const express = require('express')
const app = express()
const port = 3000

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
  const {email, password} = req.body
  
})

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')
})

