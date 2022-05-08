const express = require('express');
require('dotenv').config();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router()


const JWT_SECRET = 'AppointmentSecretKey';
// const JWT_SECRET = process.env.JWT_SECRET;


//Route1: Create a User using: Post "/api/auth/createUser". Doesn't require Auth
router.post('/createUser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('designation').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: 'A user with this email is already exist.' })
        }

        const salt = await bycrypt.genSalt(10);
        const secPassword = await bycrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            designation: req.body.designation,
            timeslots: req.body.timeslots
        })
            .then(user => {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(data, JWT_SECRET);
                res.json({ authToken: authToken, userid: user.id });
            })
            .catch(err => {
                res.json({ error: 'Please enter a unique email' })
            });
    } catch (error) {
        console.log(error.message)
        res.status(500).json('some error occured')
    }
});

//Route2: Authenticate a User using: Post "/api/auth/login". Doesn't require Auth
router.post('/login', [
    body('email', 'Enter a valid password').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            res.status(400).json({error: 'Please try to login with valid credentials'});
        }
        const comparePassword = await bycrypt.compare(password, user.password);
        if (!comparePassword) {
            res.status(400).json({error: 'Please try to login with valid credentials'});
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken: authToken, userid: user.id});
    } catch (error) {
        console.log(error.message)
        res.status(500).json('some error occured')
    }

})

//Route3: Get all sellers using: Get "/api/auth/getsellers". Doesn't require Auth

router.get('/getsellers', async (req, res) => {
    try {
        const user = await User.find({})
        res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json('some error occured')
    }
})

module.exports = router