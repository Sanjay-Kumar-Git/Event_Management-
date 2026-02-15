import express from 'express';
import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import protect from '../middleware/protect.js';

const router = express.Router();
//Register for an event
router.post('/:eventId', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        //Check capacity
            const totalRegistrations = await Registration.countDocuments({ event: event._id });
            if (totalRegistrations >= event.capacity) {
                return res.status(400).json({ message: 'Event is at full capacity' });
            }
        //Check if user already registered
        const existingRegistration = await Registration.findOne({ event: event._id, user: req.user._id });
        if (existingRegistration) {
            return res.status(400).json({ message: 'You have already registered for this event' });
        }
        //Create registration
        const registration = await Registration.create({
            event: event._id,
            user: req.user._id
        });
        res.status(201).json({ message: 'Registration successful', registration });
    }   catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
//Cancel registration
router.delete('/:eventId', protect, async (req, res) => {
    try {
        const registration = await Registration.findOneAndDelete({ event: req.params.eventId, user: req.user._id });
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        res.status(200).json({ message: 'Registration cancelled' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//Get my registered events
router.get('/my-events', protect, async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user._id }).populate('event');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;  