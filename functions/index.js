const functions = require('firebase-functions')
const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send('hello world!')
})
exports.app = functions.https.onRequest(app)