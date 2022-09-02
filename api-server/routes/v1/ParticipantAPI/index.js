const router = require('express').Router()
const passport = require('passport')

router.use('/Organization', require('./Organization'))
router.use('/Users', passport.authenticate('jwt', { session: false }), require('./User'))

module.exports = router