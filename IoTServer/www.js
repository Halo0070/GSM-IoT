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