const router = require('express').Router();
const passport = require('passport')

router.use('/participantapi', require('./ParticipantAPI'))
router.use('/dpr', passport.authenticate('jwt', { session: false }), require('./dpr'))
router.use('/ccdr', passport.authenticate('jwt', { session: false }), require('./ccdr'))
router.use('/document', passport.authenticate('jwt', { session: false }), require('./document'))
router.use('/iot', passport.authenticate('jwt', { session: false }), require('./iot'))
router.use('/dashboard', passport.authenticate('jwt', { session: false }), require('./dashboard'))
router.use('/alert', require('./alert'))

module.exports = router;