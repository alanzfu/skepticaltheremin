var React = require('react');
var _ = require('lodash');
var moment = require('moment');

// SEND ME PROPS!
var startTime = "114558";
var getDifferenceInSeconds = function(currentTime, startTime){
	var currentTime = currentTime.split(':');
	var startTime

	var currentSeconds = currentTime[0]*60*60 + currentTime[1]*60 + currentTime[2];
	var startSeconds = startTime[0]*60*60 + startTime[1]*60 + startTime[2]

	if(startSeconds - currentSeconds < 0){
		return 0
	} else {
		return startSeconds - currentSeconds;
	}
};

var currentTime = new Date();
currentTime = moment().format("HH:mm:ss");
var remainingTime = getDifferenceInSeconds(currentTime,startTime);




var Timer = React.createClass({
	getInitialState: function(){
		return {
			timeRemaining: remainingTime
		}
	}, 
	tick: function(){2

		var currentTime = new Date();
		currentTime = moment().format("HH:mm:ss");
		remainingTime = getDifferenceInSeconds(currentTime,startTime);
		this.setState({timeRemaining: remainingTime})
		if(this.state.remainingTime <= 0){
			clearInterval(this.interval);
		}
	},
	componentDidMount: function(){
		this.setState({timeRemaining: remainingTime})
		this.interval = setInterval(this.tick, 1000);
	},
	componentWillUnmount:function(){
		ckearInterval(this.interval);
	},
	render: function(){

		return (
			<div>
			Time until race starts:
			{remainingTime}
			</div>
			)
	}
});


module.exports = Timer;