var React = require('react');


var Timer = React.createClass({
	componentDidMount: function(){
		//do nothing?
	},

	componentDidUpdate: function(){
		var currentTime = new Date();
		console.log('datetime timer',currentTime);
		//when the timer is at 0, emit startEvent 
	},
	render: function(){
	}
});


module.exports = Timer;