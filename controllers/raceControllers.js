

var mongoose = require('mongoose');

var mongoose = require('mongoose');
var User = require('../models/user.js');
var Pin = require('../models/pin.js');
var Race = require('../models/race.js');
var userController = require('./userControllers.js');


//Add one race
exports.addOne = function(newRace, callback) {
	Race.create(newRace, function (err, race) {
		if (err) {
			callback(err);
			return;
		}

		var user_id = newRace.creator;
		User.findOneAndUpdate({_id:user_id}, {$push:{createdRaces: race}}, function(err, result) {
			if (err) {
				callback(err);
				return;
			}
			callback(null, race);	
		});
	});
};

//Find race by user id || proximity AND TIME AHHHH, which comes in as a string LOL .-.
exports.find = function(searchParams, callback) {

	//look for all races by user
	if (searchParams.lat === undefined) {
		Race.find(searchParams, function (err, usersRaces) {
			if (err) {
				callback(err);
				return;
			}
			callback(null, usersRaces);
		})
	} else {

		var coords = [parseFloat(searchParams.lng),parseFloat(searchParams.lat)];
		var maxDistance = parseInt(searchParams.proximity)*1000;
		var date = searchParams.date; //string
		var time = searchParams.time; //string
		var limit = searchParams.timeLimit; //timeLimit in Minutes


		Race.find({
			start_location:{
				$near: {
					$geometry: {
						type: "Point",
						coordinates: coords
					},
					$maxDistance: maxDistance
				}	
			}
		},
		function (err, closebyRaces) {
			if (err) {
				callback(err);
				return;
			}
			//filter for ones that start the same day
			//filter for ones that start after && within time
			var closebyRacesToday = closebyRaces.filter(function (race) {
				if (race.date === date) {
					return true;
				} else {
					return false;
				}
			});

			
			var convertStringTimeToSeconds = function(string) {
				var timeArray = [];
				string = string.split('');

				for(var i = 0; i < string.length; i++) {
					if (i%2 === 0) {
						timeArray[i/2] = string[i];
					} else {
						timeArray[(i-1)/2] += string[i];
						timeArray[(i-1)/2] = parseInt(timeArray[(i-1)/2]);
					}
				}

				var totalSeconds = 0;
				for (var i = 0; i < timeArray.length; i++) {
					totalSeconds += timeArray[i]*Math.pow(60,(2-i));
				}

				return totalSeconds;
			}
			//returns races occuring in the next 30 minutes // should be specified later by a req.param
			
			time = convertStringTimeToSeconds(time);

			var closebyRacesTodaySoon = closebyRacesToday.filter(function (race) {
				var raceTime = convertStringTimeToSeconds(race.time);
				if((raceTime-time) < limit*60) {
					return true;
				} else {
					return false;
				}
			});
			callback(null, closebyRacesTodaySoon);
		});
	}
}

exports.findOne = function (raceIdObj, callback) {
	Race.find(raceIdObj, function (err, race) {
		if (err) {
			callback(err);
			return;
		}
		callback(null, race);
	})
}

exports.updateRace = function (queryParams, newRace, callback) {
	console.log('before update!',queryParams,newRace);
	Race.findOneAndUpdate(queryParams, {$set:newRace}, function (err, updatedRace) {
		if (err) {
			callback(err);
			return;
		}
		console.log(updatedRace.racers);
		callback(null, updatedRace);
	});
}

