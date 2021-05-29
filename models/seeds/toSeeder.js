const mongoose = require('mongoose')
const Account = require('../accounts')
const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

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
  users.forEach(user => {
    Account.create({
      firstName : user.firstName,
      email : user.email,
      password : user.password
    })
  })
  console.log('done!')
})