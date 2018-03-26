'use strict'

const http = require('http')
const finalhandler = require('finalhandler')
const { router } = require('./router')

const port = process.env.PORT || 3000

const serverMain = (req, res) => {
	router(req, res, finalhandler(req, res, err => console.error(err)));
}

http.createServer(serverMain).listen(port);

console.log('REST API listen port '+port);