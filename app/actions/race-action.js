'use strict';

var START_RACE = require('../constants').action.START_RACE;
var FINISH_RACE = require('../constants').action.FINISH_RACE;
var CANCEL_RACE = require('../constants').action.CANCEL_RACE;
var CHECK_IN = require('../constants').action.CHECK_IN;
var ADD_AVAILABLE_RACES = require('../constants').action.ADD_AVAILABLE_RACES;
var SELECT_RACE = require('../constants').action.SELECT_RACE;

var http = require('rest');
var mime = require('rest/interceptor/mime');
http = http.wrap(mime);

// START_RACE, FINISH_RACE, CANCEL_RACE

var startRace = function () {
	//socket connection should be made here.

	return {
		type: START_RACE
	}
}

var checkIn = function (userId, activeRaceId, racers) {
	//need to get most recent version of the racer value
	var currentUser = userId;
	
	var getOptions = {
		method: 'GET',
		path: '/api/users/' + currentUser + '/races/' + activeRaceId
	}

	http(getOptions)
	.then(function(updatedRace){
		var putOptions = {
			method: 'PUT',
			path: '/api/users/'+currentUser+'/races/' + activeRaceId,
			entity: {
				racers: updatedRace.racers.concat(currentUser)
			}
		}
		return http(putOptions);
	})
	.then(function(checkedInRace){
		
	})

	return {
		type: CHECK_IN
	}
}

var finishRace = function () {
	//user should be pass into results array of activeRace
	//completed should be true
	//should put the most recent version of race model
}

var cancelRace = function () {
	return {
		type: CANCEL_RACE
	}
}

//available races [{Race}]
var addAvailableRaces = function (payload) {
	return {
		type: ADD_AVAILABLE_RACES,
		payload: payload
	}
}

//selected race
var selectRace = function (payload) {
	return {
		type: SELECT_RACE,
		payload: payload
	}
}

module.exports = {
	startRace: startRace,
	finishRace: finishRace,
	cancelRace: cancelRace,
	addAvailableRaces: addAvailableRaces,
	selectRace: selectRace,
	checkIn, checkIn
}