const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const cookiesPaser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookiesPaser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// import router 
const msgRT = require('./router/message_Router');
const userRT = require('./router/user_Router')
// Authen
app.use('/api/msg', msgRT);
app.use('/api/user', userRT);

app.get('/', (request, response) => {
    // The string we want to display on http://localhost:3000
    console.log("This is '/' site!")
    response.send('Welcome on the firt API with nodejs express and mongodb! \n Take a breath and start using it!')
  });

module.exports = app;

