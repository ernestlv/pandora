'use strict'

const httpS = require('https')

function callPandora(url) {
	return new Promise((resolve, reject) => {
		try{
			console.log('calling Pandora API:', url)
			httpS.get(url, (apiRes) => {
				let data = '';
				apiRes.on('data', (chunk) => {
					console.log('processing pandora data...')
					data += chunk
				});
				apiRes.on('end', () => {
					try {
						console.log('dispatching pandora data...')
						resolve(JSON.parse(data));
					} catch(e) {
						reject('Pandora API response error' + e);
					}
				});
			}).on('error', e => {
				reject('Pandora API error' + e);
			});
		}catch(e){
			reject('error calling pandora ' + e);
		}
		
	});
}

exports.searchAPIArtist = function (artist) {
	const url = `https://api.nextbigsound.com/search/v1/artists/?query=${artist}&limit=1`;
	return callPandora(url).catch(e => { return {error:e} });
}

exports.getAPIEventStats = function (id, start, end) {
	const url = `https://api.nextbigsound.com/events/v1/entity/${id}?start=${start}&end=${end}&access_token=8c089170d31ea3b11f1ea65dbfc8ea46`;
	return callPandora(url).catch(e => { return {error:e} });
}

exports.testAPI = function(){
	const url = 'https://api.nextbigsound.com/events/v1/entity/356?start=17167&end=17256&access_token=8c089170d31ea3b11f1ea65dbfc8ea46';
	return callPandora( url ).catch(e => { return {error:e} });
}