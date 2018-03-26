'use strict'

const { getISOWeek } = require('./time')

function processEventTypes(data) {
	const keys = Object.keys(data);
	let res = [];
	for (let k of keys) {
		const e = data[k];
		const date = e["date_short"];
        const types = Object.keys(e["event_types"]);
		res = [...res, {date, types}]
	}
	return res;
}

exports.countEventTypes = function (data) {
	if (data.error){
		return {error: data.error};
	}
	const eventTypes = processEventTypes(data);
	let counts = {};
	for (const {date, types} of eventTypes) {
		const {year, week} = getISOWeek(new Date(date));
		let isoWeek = `${year}-W${(String(week).padStart(2,"0"))}`;
		let objWeek = counts[isoWeek];
		if (!objWeek){
			objWeek = counts[isoWeek] = {};
		}
		for (const eventType of types) {
			if (eventType in objWeek) {
				objWeek[eventType]++;
			}else{
				objWeek[eventType] = 1;
			}
		}
	}
	return { counts };
}

exports.getArtistID = function (data) {
	if (data.error) {
		return {error: data.error};
	}
	const id = data.artists[0].id
	return { id };
}