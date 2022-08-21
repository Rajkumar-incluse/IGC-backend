const router = require('express').Router();

router.use('/participantapi', require('./ParticipantAPI'));

module.exports = router;