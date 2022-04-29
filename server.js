const express = require('express')
const app = require('./app')
// app = express()
require('dotenv').config();

PORT = process.env.PORT || 5000;

app.listen(
  PORT, () => console.log(`server is listening on port:http://localhost:${PORT}`)
);