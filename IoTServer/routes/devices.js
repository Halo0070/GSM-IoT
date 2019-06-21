var express = require('express');
var router = express.Router();

var mqtt=require("mqtt");	// A a=new A();
var client=mqtt.connect("mqtt://192.168.0.15");

/* GET home page. */
router.post('/led/:flag', function(req, res, next) {
	if(req.params.flag=='on'){
		// MQTT -> led : 1
		client.publish("led", '1');
		res.send(JSON.stringify({led:'on'}));
	}else{
		client.publish("led", '2');
		res.send(JSON.stringify({led:'off'}));
	}
});

module.exports = router;
