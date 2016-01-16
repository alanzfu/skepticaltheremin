'use strict';

var http = require('rest');
var createdRacesAction = require('./created-races-action');

var NAV_CREATE_RACE = require('../constants').action.NAV_CREATE_RACE;
var NAV_CREATED_RACES = require('../constants').action.NAV_CREATED_RACES;
var NAV_RACE = require('../constants').action.NAV_RACE;
var NAV_SUMMARY = require('../constants').action.NAV_SUMMARY;

var store = require('../store/configureStore');

  //NAV_CREATE_RACE, NAV_CREATED_RACES,
  //NAV_SUMMARY, NAV_RACE

var navigateCreateRace = function () {
	return {
		type: NAV_CREATE_RACE
	}
}

var navigateCreatedRaces = function (userId) {
	return function (dispatch) {
		var options = {
			method: 'GET',
			uri: '/users/' + userId + '/races'
		}

		http(options)
			.then(function (parsedBody) {
				dispatch(createdRacesAction.createdRacesSuccess(parsedBody));
				dispatch({
					type: NAV_CREATED_RACES
				});
			})
			.catch(function(error){
				console.log('error getting created races || navigate-to-action.js',error);
				return error;
			})

		
	}
}

var navigateRace = function () {
	return {
		type: NAV_RACE
	}
}

var navSummary = function () {
	return {
		type: NAV_SUMMARY
	}
}

module.exports = {
	navigateCreateRace: navigateCreateRace,
	navigateCreatedRaces: navigateCreatedRaces,
	navigateRace: navigateRace,
	navSummary: navSummary
}
