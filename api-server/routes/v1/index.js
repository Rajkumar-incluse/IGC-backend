const router = require('express').Router();
const passport = require('passport')

router.use('/participantapi', require('./ParticipantAPI'));
router.use('/dpr',passport.authenticate('jwt', { session: false }), require('./dpr'));

module.exports = router;