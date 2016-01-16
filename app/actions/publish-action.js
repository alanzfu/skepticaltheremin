'use strict';


var type = require('../constants').action.type;
var http = require('rest');

var store = require('../store/configureStore');

var CENTER_MAP = require('../constants').action.CENTER_MAP;
var ADD_WAYPOINT = require('../constants').action.ADD_WAYPOINT;
var PUBLISH_RACE = require('../constants').action.PUBLISH_RACE;
var navigateAction = require('./navigate-to-action')

// payload looks like: {latitude, longitude}
function centerMap(payload){
  return {
    type: CENTER_MAP,
    payload: payload
  };
};

function addWayPoint(payload){
  //console.log('waypoint added', payload)
   return {
    type: ADD_WAYPOINT,
    payload: payload
  };
}

function clearForm(){
  return {
    type: CLEAR_FORM
  }
}

// TODO LATER
function publishRace(payload, id){
  // make ajax call to server with Post
  //
  // console.log(payload);
  // var id = store.getState().user.id;
  // var options = {
  //     method: 'POST',
  //     uri: '/users/' + id + '/races',
  //     body: payload,
  //     json: true // Automatically stringifies the body to JSON
  // };


  // http(options)
  //     .then(function (parsedBody) {
  //         dispatch(clearForm());
  //     })
  //     .catch(function (err) {
  //         // POST failed...
  //     });
  // // then,
  //   // on success, extend current state
  //   // on error, leave current state
  return function(dispatch){
    id = '5699c9aa9bfa34981928027a';
     $.ajax({
        url: '/api/users/' + id + '/races',
        type: 'POST',
        data: JSON.stringify(payload),
        contentType: 'application/json',
        success: function (data) {
          dispatch(navigateAction.navigateCreatedRaces());
        },
        error: function (data) {
          console.log('failed', data);
        }
      });
  }
  
}

module.exports = {
  centerMap: centerMap,
  addWayPoint: addWayPoint,
  publishRace: publishRace
};
// add publish actions
