const Event = require('../models/event');
const config = require('../config/config');

exports.createEvent = (req, res) => {
    if (!req.body.eventname || !req.body.eventdesc|| !req.body.eventvenue|| !req.body.date|| !req.body.time) {
        return res.status(400).json({ 'msg': 'You need to enter all the details' });
    }

    let newEvent = Event(req.body);
        newEvent.save((err, event) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json(event);
       
    });
};

