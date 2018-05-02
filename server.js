var express = require('express')
var app = express()
var path = require('path')
var serveStatic = require('serve-static')

// respond with "hello world" when a GET request is made to the homepage
app.use(serveStatic(path.join(__dirname, 'chatbot')))
app.use('*', express.static('chatbot/index.html'))
var port = process.env.PORT || 5000

app.listen(port)

console.log('server started ' + port)
