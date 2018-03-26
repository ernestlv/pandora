'use strict'

function getFirstISOThursday(year) { //iso weeks are calc counting thu
	const jan1 = new Date( year, 0, 1, 0, 0, 0, 0 );
	switch (jan1.getDay()){
		case 4:
		    return jan1;
		case 5:
		    return jan1.setDate(7);
		case 6:
		    return jan1.setDate(6);
		case 0:
		    return jan1.setDate(5);
		case 1:
		    return jan1.setDate(4);
		case 2:
		    return jan1.setDate(3);
		case 3:
		    return jan1.setDate(2);
	}

}

function getISOMonday(thu) { //iso week starts on mon
	return thu.getTime() - 3 * 24 * 60 * 60 * 1000;
}

function getISOSunday(thu) { //iso week ends on sun
	return thu.getTime() + 3 * 24 * 60 * 60 * 1000;
}

function getNextISOThursday(thu) {
	return (new Date(thu.getTime() + 7 * 24 * 60 * 60 * 1000)).setHours(0); //fix 1 hr gap between EST -> EDT
}

function getISOWeeks(year) {
	const isoWeeks = new Map()
	let count = 0;
	let thu = new Date(getFirstISOThursday(year));
	while (thu.getFullYear() === year) {
		count++
		isoWeeks.set(count, {
			mon: getISOMonday(thu),
			sun: getISOSunday(thu)
		});
		thu = new Date(getNextISOThursday(thu));
	}
	return isoWeeks;
}

exports.getISOWeek = function (date) {
	let week, dates;
	let year = date.getFullYear();
	let isoWeeks = getISOWeeks(year);
	for ([week, dates] of isoWeeks) {
		if (dates.mon <= date && date <= dates.sun) {
			return {year, week};
		}
	}
	if (date.getMonth() === 0) { //sometimes jan 1,2,3 fall in prev year last week
        year--;
		week = getISOWeeks(year).size;
	} else { //sometimes dec 29,30,31 fall in next year first week
		week = 1
		year++;
	}
	return {year, week};
}

exports.getNumDays = function (date) {
	const x = new Date('1970/01/01');

	const y = new Date(date.replace(/-/g, "/")); //normilize date format

	return (y - x) / 1000 / 60 / 60 / 24 | 0;
}