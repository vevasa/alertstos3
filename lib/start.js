var _ = require('lodash');
var async = require('async');
var aws = require('aws-sdk');
var moment = require('moment');
var C = require('./constants');
var request = require('request');


var config = require('../config.json');
var utils = require('./utils');

function buildTSRequest (callback) {
    var options = { 
    	url : C.THREATSTACK_ALERT_URL + "?organization=" + config.organization,
	headers: {
		"Authorization": config.api_key
	} 
    };

     request(options, function(err, response, body) {
	console.log("inside request"+response.statusCode);
	console.log (body);
	var parsedbody = JSON.parse(body);
	console.log("after parsed body");
	var dateString = moment.utc().format('YYYY-MM-DD');
	var bucketName = config.s3_bucket + "/" + dateString;
	buildS3Request(bucketName, dateString, parsedbody);

     });

}

function buildS3Request(bucket, name, parsedbody){
	var AWS = require('aws-sdk');
	AWS.config.update({region: 'us-east-1'});
	var s3 = new AWS.S3();
	console.log("ins3"+ bucket + name);
	s3.createBucket({Bucket: 'tswebhookjan'}, function(err, data) {
		console.log("createbucket" + err);
	});
	s3.putObject({
		Bucket: 'tswebhookjan',
		Key: name + ".json",
		Body: JSON.stringify(parsedbody)
		}, function(err, data) {
			console.log("putbucket" + err);
		});
}


buildTSRequest ( function (err,ret){

	console.log(ret)

});
