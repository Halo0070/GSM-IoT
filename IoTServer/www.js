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
var io=require('socket.io')(server);
io.on("connection", function(socket){ 
	console.log("web connection...");
	socket.on("socket_evt_mqtt", function(data){ 
		var dht11=dbObj.collection("dht11");
		dht11.find({}).sort({_id:-1}).limit(1).toArray(function(err,results){ //뒤집어서 맨 위에 있는 거 하나 가져오기
			if(!err){	//에러가 아니면
				socket.emit("socket_evt_mqtt", JSON.stringify(results[0]));	//emit로 값 쏘기
			}
		});
	});
	socket.on("socket_evt_led", function(data){
		var obj=JSON.parse(data);
		client.publish("led", obj.led+'');
	});	
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port in to a number, string, of false.

function normalizePort(val) {
	var port = parseInt(val, 10);

	if(isNaN(port)) {
		// named pipe
		return val;
	}

	if(port>=0) {
		// port number
		return port;
	}
	return false;
}

// Event listener for HTTP server "error" event.

function onError(error) {
	if(error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string'
		? 'Pipe' + port
		: 'Port' + port;

	//handle specific listen errors with friendly messages
	switch(error.code) {
		case 'EACCES':
			console.error(bind + 'requires vlevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + 'is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

// Event listener for HTTP server "listening" event.

function Listening() {
	var all = server.address();
	var bin = typeof all === 'string'
		? 'Pipe' + all
		: 'Port' + all.port;
	debug('Listening on' +bin);
}