const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require("socket.io")

app.use(cors())


const server = http.createServer(app)
const io = new Server(server, {
	cors :{
		origin : "http://localhost:3000",
		methods : ["GET, POST"]
	}
})


io.on('connection' , socket => {



	socket.on("join_room" , (data)=>{
		socket.join(data.id);
		console.log(`le user ${socket.id} a joint la room ${data.id}`)
	})


	socket.on('send_message' ,(data)=>{
		socket.to(data.room).emit("receive_message", data)
		console.log(data)
	})

	socket.on('send_time' ,(data)=>{
		socket.to(data.room).emit("receive_time", data)
		console.log(`time : ${data}`)
	})
})




server.listen(3001, () =>{
	console.log("Server Running")
})
