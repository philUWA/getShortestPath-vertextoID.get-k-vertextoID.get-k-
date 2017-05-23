var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String,
      age:Number,
      email:String,
      genderMe:String,
      genderYou:String,
      country:String,
      city:String,
      postcode:Number,
      email:String,
      heightMe:Number,
      ethnicityMe:String,
      childrenMe:String,
      bodyMe:String,
      faithMe:String,
      smokerMe:String,
      hairMe:String,
      educationMe:String,
      drinkerMe:String,
      eyeMe:String,
      maxAgeMe:Number,
      minAgeMe:Number,
      heightYou:Number,
      ethnicityYou:String,
      childrenYou:String,
      bodyYou:String,
      faithYou:String,
      smokerYou:String,
      hairYou:String,
      educationYou:String,
      drinkerYou:String,
      eyeYou:String,
      maxAgeYou:Number,
      minAgeYou:Number,
      potentialMatches:Array
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
