const express = require('express');
const cors = require('cors')
const Appointment = require('../models/Appointment')
var fetchUser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');


const router = express.Router()
require('dotenv').config();

const JWT_SECRET = 'AppointmentSecretKey';
// const JWT_SECRET = process.env.JWT_SECRET;

//Route1: Create a new appointment using: Post "/api/appointments/createappointment"
router.post('/createappointment', [
    body('title').isLength({ min: 5 }),
    body('description').isLength({ min: 5 }),
    body('sellerid').isLength({max: 60}),
    body('username').isLength({min: 3}),
    body('atime').isLength({min: 3})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, sellerid, username, atime } = req.body;
        const appointment = new Appointment({ title, description, sellerid, username, atime })
        const saveAppointment = await appointment.save();
        res.json(saveAppointment)
    } catch (error) {
        console.log(error.message)
        res.status(500).json('some error occured')
    }
})

//Route2: Update an appointment(accept|reject) by a specific seller using: Post "/api/appointments/updateappointment" required authentication
router.post('/updateappointment/:id', cors(), fetchUser, [
    body('status').isLength({ max: 10 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { status } = req.body;
        const newAppointment = {}
        if(status) {
            newAppointment.status = status
        }
    
        let appointment = await Appointment.findById(req.params.id)
        if (!appointment) {
            res.status(404).json({error: 'Not found'})
        }
        if (appointment.status === 'Accepted' || appointment.status === 'Rejected') {
            res.status(500).json({error: 'You cannot change the status of this appointment anymore.'})
        }
        if (appointment.sellerid.toString() !== req.user.id) {
            res.status(401).json({error: 'Not allowed'})
        }
        appointment = await Appointment.findByIdAndUpdate(req.params.id, {$set: newAppointment}, {new: true})
        res.status(200).json({appointment})

    } catch (error) {
        console.log(error.message)
        res.status(500).json('some error occured')
    }
})

//Route3: Get all appointments of a specific seller using: Get "/api/appointments/getappointments/sellerid" required authentication

router.get('/getappointments/:id', cors(), fetchUser, async (req, res) => {
    try {
        const appointment = await Appointment.find({ sellerid: req.params.id, status: {$ne : 'Pending'} })
        res.json(appointment)
    } catch (error) {
        console.log(error.message)
        res.status(500).json('some error occured')
    }
})

//Route3: Get all appointments of a specific seller using: Get "/api/appointments/getpendingappointments/sellerid" required authentication
router.get('/getpendingappointments/:id', cors(), fetchUser, async (req, res) => {
    try {
        const appointment = await Appointment.find({ sellerid: req.params.id, status: 'Pending' })
        res.json(appointment)
    } catch (error) {
        console.log(error.message)
        res.status(500).json('some error occured')
    }
})

module.exports = router