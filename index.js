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
	})

	socket.on('send_message' ,(data)=>{
		socket.to(data.room).emit("receive_message", data)
	})

	socket.on('change_resto' ,(data)=>{
		socket.to(data.room).emit("receive_new_resto", data)
	})

	socket.on('add_user' ,(data)=>{
		socket.to(data.room).emit("receive_new_user", data)
	})

	socket.on('send_time' ,(data)=>{
		socket.to(data.room).emit("receive_time", data)
		console.log(`time : ${data}`)
	})

	socket.on('update_final_point' ,(data)=>{
		console.log(data)
		socket.to(data.room).emit("receive_new_location", data)
	})

})




server.listen(3001, () =>{
	console.log("Server Running")
})
