const router = require('express').Router();

router.use('/participantapi', require('./ParticipantAPI'));
router.use('/asset', require('./asset'));

module.exports = router;