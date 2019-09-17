const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const port = process.env.PORT || 1337;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');

});

app.put('/test',function(req,res){
  res.send(req.body);
  console.log('PUT req received');
 
  io.sockets.emit('broadcast',req.body);
  
});
/////////////////////////////////////////

// Connection Message //
io.on('connection',function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  console.log('A user has connected');
  socket.on('disconnect',function(){
    console.log('A user disconnected');
  });
});
// Port listener //
http.listen(port,function(){
  console.log('Express server listening on port *:' + port);
});


