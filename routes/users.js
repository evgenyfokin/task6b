const express = require('express')
const router = express.Router()
const {User} = require('../models')

router.post('/users', async (req, res) => {
    const {name} = req.body
    try {
        let user = await User.findOne({where: {name}})

        if (!user) {
            user = await User.create({name})
        }

        res.json(user)
    } catch (err) {
        res.json({
            err:err.message
        })
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (err) {
        res.json({err: err.message})
    }
})

module.exports = router