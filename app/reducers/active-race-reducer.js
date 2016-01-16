'use strict';

var _ = require('lodash');

var ACTION_TYPE = require('../constants').action.ACTION_TYPE;
var CHECK_IN = require('../constants').action.CHECK_IN;
var TIMER_FINISH = require('../constants').action.TIMER_FINISH;
var SELECT_RACE = require('../constants').action.SELECT_RACE;

var initial = {
  racers: [],
  raceWaymarks: [],
  checkedIn: false,
  startTime: null,
  ended: false,
  completed: false,
  cancelled: false,
  results: []
};

function activeRaceReducer (state, action) {
  state = state || initial;
  switch(action.type){
    case CHECK_IN:
      return _.extend({}, state, {
        checkedIn: true
      });
    case SELECT_RACE:
      return _.extend({}, state, {
        name: action.payload.name,
        racers: action.payload.racers,
        waymarks: action.payload.waymarks,
        startTime: action.payload.time,
        results: action.payload.results
      });
    case TIMER_FINISH:
      return _.extend({}, state, {
        started: true
      });
    default:
      return state;
  }
}

module.exports = activeRaceReducer;
