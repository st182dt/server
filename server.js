const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
http.listen(2000);

var SOCKETS = [];

io.on('connection', function (socket){
	var id = Math.random();
	SOCKETS[id] = socket;
	console.log("hello");
	
	socket.on('drawing',function(data){
		console.log(data);
		for(var i in SOCKETS){
			if (i != id){
				var s = SOCKETS[i];
				s.emit('drawing',{x:data.x,y:data.y,x2:data.x2,y2:data.y2,color:data.color});
			}
		}
	});
	
	socket.on('disconnect',function(){
		delete SOCKETS[id];
	});
});
