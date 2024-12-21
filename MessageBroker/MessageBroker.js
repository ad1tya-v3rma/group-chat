const express = require('express')
const port = 3000
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const server = app.listen(
    port,
    () => console.log(`server started on localhost:${port}`)
)

let roomList = ['room1', 'room2', 'room3']

const io = require('socket.io')(server,
    {
        cors: {origin: '*'}
    })

const socket = io.on('connection', (socket) => {
        console.log('connected')
        socket.on('disconnect',
            () => console.log('disconnected')
        )
        socket.on('message', (data) => {
                let roomName = data.room
                let message = data.message
                let user = data.user
                let status = data.status
                console.log(data)
                socket.to(roomName).emit('message', {message: message, user: user})
                //io.emit(roomName, message)
            }
        )
        socket.on('joinRoom', (info) => {
                socket.join(info._room);
                console.log(`${info._username} joined room: ${info._room}`);
                socket.to(info._room).emit('message', {message: `${info._username} joined`, status: 'u'});
            }
        );
        socket.on('leaveRoom', (info) => {
            socket.leave(info._room)
            socket.to(info._room).emit('message', {
                message: `${info._username} has disconnected from the room : ${info._room}`,
                status: 'u'
            })
        });
        socket.on('logout', () =>
            socket.disconnect(true)
        )
    }
)

app.post('/check', (req, res) => {
        let data = req.body
        if (!data || data.room === '') {
            return res.status(400).json({success: false, message: 'room name is required'})
        }

        console.log(data)

        if (roomList.includes(data.room)) {
            return res.status(200).json({success: true, message: 'room exists'})
        }
        return res.status(200).json({success: true, message: 'room is available'})
    }
)

app.post('/create', (req, res) => {
        let data = req.body
        if (!data) {
            return res.status(400).json({success: false, message: 'room name is required'})
        }

        console.log(data)

        if (!roomList.includes(data.room)) {
            roomList.push(data.room)
        } else {
            return res.status(403).json({success: false, message: 'room already exists'})
        }

        return res.status(200).json({success: true, message: 'room created successfully'})
    }
)
app.post('/connect', (req, res) => {
        let data = req.body
        if (!data || !data.room || !roomList.includes(data.room)) {
            return res.status(404).send('invalid room id')
        }

        return res.status(200).send(true)
    }
)
