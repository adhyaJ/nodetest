const express         = require('express'),
routes = express.Router();
const userController = require('./controller/user-controller');
const eventController = require('./controller/event-controller');
const passport = require('passport');

routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);

routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});

routes.post('/event', eventController.createEvent);
module.exports = routes;
