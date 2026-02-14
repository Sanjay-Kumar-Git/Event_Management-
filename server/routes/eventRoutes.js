import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

//Get all events
router.get('/', async (req, res) => {
    try {
        const {search, date, category, location} = req.query;
        let query = {};
        // Search by title
        if (search) {
            query.title = {$regex: search, $options: 'i'};
        }
        // Filter by category
        if (category) {
            query.category = category;
        }
        // Filter by location
        if (location) {
            query.location = location;
        }
        // Filter by date
        if (date) {
            query.date = {$gte: new Date(date)};
        }
        const events = await Event.find(query).sort({date: 1});
        res.json(events);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});
// Get event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({message: 'Event not found'});
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

export default router;
