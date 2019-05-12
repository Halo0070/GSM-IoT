#!/usr/bin/env node

// Module dependencies.

var app=require('../app');
var debug=require('debug')('iotserver:server');
var http=require('http');

// Get port from environment and store in Express.

var port=normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP server.

var server=http.createServer(app);
//MongoDB 연결
var mongoDB=require('mongodb').MongoClient;
var url="mongodb://127.0.0.1:27017/gsmiot";
var dbObj=null;
mongoDB.connect(url, function(err, db) {
    dbObj=db;
    console.log("DB Connect....");
});

// Listen on provided port, on all network interfaces.

var mqtt=require("mqtt");	// A a=new A();
var client=mqtt.connect("mqtt://192.168.0.15");
client.on("connect", function(){
	console.log("mqtt server connection...");
	client.subscribe("iot");
});

client.on("message", function(topic, message){
	if(topic=='iot'){
		console.log(message.toString());
		//db insert
		var obj=JSON.parse(message);	//txt->object
		obj.created_at=new Date();	// hum, tmp, created_at
		console.log(obj);
		var dht11=dbObj.collection("dht11");	//DB table 만들기
		dht11.save(obj, function(err, result){
			console.log(JSON.stringify(result));	//{ok : 1}
		});
	}
});

//--MongoDB--->Node.js--->HTML(javascript)|<---IE,Android(모니터링)