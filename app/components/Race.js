var React = require('react');
var NavBar = require('./NavBar');
var RacerList = require('./RacerList');
var RaceMap = require('./RaceMap');
var Timer = require('./Timer');

var http = require('rest');
var mime = require('rest/interceptor/mime');
http = http.wrap(mime);

var ADD_AVAILABLE_RACES = require('../constants.js').action.ADD_AVAILABLE_RACES;



var Race = React.createClass({
	//gets current location, queries the db for nearby races starting soon and changes the state
	componentDidMount: function () {
		var that = this;
		navigator.geolocation.getCurrentPosition(function(location){
			var dateTime = getCurrentDateTimeInString();
			var dateString = dateTime[0];
			var timeString = dateTime[1];
			var lat = location.coords.latitude.toString();
			var lng = location.coords.longitude.toString();

			var options = {
				method: 'GET',
				//hard coded to one since it is not on state right now
				path: '/api/users/'+ 1 +'/races?lat='+lat+'&lng='+lng+'&proximity=8&time='+timeString+'&date='+dateString+'&timelimit=120'
			};

			http(options)
				.then(function(results){
					var availableRaces = results.entity;
					that.props.raceAction.addAvailableRaces(availableRaces); //race action that maps to user-reducer
				});
		});
	},

	//need to add timer here
	//need to map buttons onClick to actions

	render: function(){
		var checkInRace = function(){
			this.props.raceAction.checkIn(this.props.user._id || "56972c9fda7c03ae0a87b44e", this.props.activeRace._id, this.props.activeRace.racers)
		}.bind(this);

		return (
			<div className="race-view">
				<h1>Race</h1>
				<RaceMap {...this.props} />
				<button className="checkin-race" onClick={checkInRace}>Check In</button>
				<button className="cancel-race" onClick={this.props.raceAction.cancelRace}>Cancel</button>
				<button className="finish-race" onClick={this.props.raceAction.finishRace}>Finish Race</button>
				<h3>Results: {this.props.activeRace.name}</h3>
				<RacerList racers={this.props.activeRace.racers} />
			</div>
		);
	}

});


//--------------------HELPER FUNCTIONS------------------------------


function getCurrentDateTimeInString () {
	var current = new Date();
	var time = current.getTime();
	var day = current.getDate();
	var month = current.getMonth()+1;
	var year = current.getYear()-100+2000;

	if (month<10){
		month = '0'+ month.toString();
	}
	if (day<10) {
		month = '0' + day.toString();
	}
	var dateString = [year, month, day].join('');
    
    current = current.toString().slice(16, 24)
	var timeString = current.split(':').join('');
	
	return [dateString, timeString];
}








module.exports = Race;
