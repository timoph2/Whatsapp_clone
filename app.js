const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http')
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server, { cors: { origin: "http://localhost:8080" }})


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('_.ejs')
  });
   
  
io.on('connection', (socket) => {
console.log('a user connected');


socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
});


socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
});

socket.on('disconnect', () => {
    console.log('user disconnected');

});
});

// const indexRouter = require('./routes/index')  
// app.use('/', indexRouter)


server.listen(3000, ()=>{
    console.log('running on port 3000!')
})
// sockets io need switch to server.listen instead of app.listen...