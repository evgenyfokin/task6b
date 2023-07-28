const express = require('express')
const router = express.Router()
const {Message} = require('../models')

router.post('/messages', async (req, res) => {
    const {sender, receiver, subject, message, timestamp} = req.body

    try {
        const newMessage = await Message.create({
            sender,
            receiver,
            subject,
            message,
            timestamp
        })

        res.json(newMessage)
    } catch (err) {
        res.json({
            err: err.message
        })
    }
})
router.get('/messages/:id', async (req,res) => {
    try {
        const message = await Message.findByPk(req.params.id)
        if (message) {
            res.json(message)
        } else {
            res.status(404).json({err: 'Message not found'})
        }
    } catch (err) {
        res.json({err: err.message})
    }
})


router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.findAll()
        res.json(messages)
    } catch (err) {
        res.json({err: err.message})
    }
})

router.get('/')

module.exports = router