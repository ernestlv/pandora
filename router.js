'use strict'

const Router = require('router')
const url = require('url')
const path = require('path')
const serveStatic = require('serve-static')
const { getNumDays } = require('./time')
const { searchAPIArtist, getAPIEventStats, testAPI } = require('./proxy')
const { countEventTypes, getArtistID } = require('./formatter')

const router = Router({mergeParams: true})
const apiEventsRoute = Router({mergeParams:true})
const apiSearchRoute = Router({mergeParams:true})

function homeRoute(req, res) {
	res.write('REST API is up!');
	res.end();
}

async function testRoute(req, res) {
	try{
		const data = await testAPI();
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(data));
	}catch(e){
		console.error(e)
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify({error: String(e)}));
	}
}

async function eventsRoute(req, res) {
	try{
		const qs = url.parse(req.url, true).query;
		const id = req.params.id
		const start = getNumDays(qs.startDate);
		const end = getNumDays(qs.endDate);
		const data = await getAPIEventStats(id, start, end);
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(countEventTypes(data)));
	}catch(e){
		console.error(e)
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify({error: String(e)}));
	}
}

async function searchRoute(req, res) {
	try{
		const artist = req.params.artist
		const data = await searchAPIArtist(artist);
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(getArtistID(data)));	
	}catch(e){
		console.error(e)
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify({error: String(e)}));
	}
}

router.get('/home', homeRoute)

router.get('/testAPI', testRoute)

router.use('/events/:id/stats', apiEventsRoute)

apiEventsRoute.get('/', eventsRoute)

router.use('/search/:artist', apiSearchRoute)

apiSearchRoute.get('/', searchRoute)

router.use(serveStatic('public'))

exports.router = router;