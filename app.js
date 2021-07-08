const express = require('express')
const app = express()
const port = 3000

const routes = require('./routes')
const exphbs = require('express-handlebars')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')
})
