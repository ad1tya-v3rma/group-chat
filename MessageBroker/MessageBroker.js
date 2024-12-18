const express = require('express')
const port = 3000
const app = express()
app.use(express.json())
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
                console.log(data)
                io.to(roomName, message)
                socket.to(roomName).emit('message', message)
                //io.emit(roomName, message)
            }
        )
        socket.on('joinRoom', (room) => {
                socket.join(room);
                console.log(`User joined room: ${room}`);
                socket.to(room).emit('message', 'A new user has joined the room');
            }
        );
    }
)

app.post('/check', (req, res) => {
        let data = req.body
        if (!data) {
            return res.status(400).send('room name is required')
        }

        console.log(data)

        if (!roomList.includes(data.room)) {
            return res.status(404).send('room does not exists')
        }

        return res.status(200).send('found the room')
    }
)

app.post('/create', (req, res) => {
        let data = req.body
        if (!data) {
            return res.status(400).send('room name is required')
        }

        console.log(data)

        if (!roomList.includes(data.room)) {
            roomList.push(data.room)
        } else {
            return res.status(403).send('room already exists')
        }

        return res.status(200).send('room created successfully')
    }
)
app.post('connect', (req, res) => {
        let data = req.body
        if (!data || !data.room || !roomList.includes(data.room)) {
            return res.status(404).send('invalid room id')
        }
    }
)
