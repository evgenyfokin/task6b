const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})
const PORT = process.env.PORT || 3000
const messagesRoutes = require('./routes/messages')
const usersRoutes = require('./routes/users')
const cors = require('cors')
const {Message} = require('./models')
const {User} = require('./models')

app.use(cors())
app.use(express.json())
app.use(messagesRoutes)
app.use(usersRoutes)


io.on('connection', socket => {
    console.log('User connected')

    socket.on('new_user', async data => {
        try {
            const {name} = data
            let user = await User.findOne({where: {name}})

            if (!user) {
                user = await User.create({name})
            }
            io.emit('new_user', user)
        } catch (err) {
            console.error(err)
        }
    })

    socket.on('new_message', async data => {
        try {
            const {sender, receiver, subject, message} = data
            const timestamp = new Date()

            let user = await User.findOne({where: {name: receiver}})

            if (!user) {
                user = await User.create({name: receiver})
            }
            const newMessage = await Message.create({sender, receiver, subject, message, timestamp})

            // socket.to(receiver).emit('new_message', newMessage)
            io.emit('new_message', newMessage)
        } catch (err) {
            console.error(err)
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

http.listen(PORT, () => {
    console.log('Server running on port 3000')
})