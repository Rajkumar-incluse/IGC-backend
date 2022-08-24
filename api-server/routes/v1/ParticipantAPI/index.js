const router = require('express').Router()

router.use('/Organization', require('./Organization'))
router.use('/Users', require('./User'))

module.exports = router