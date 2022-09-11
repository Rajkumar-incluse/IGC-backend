const router = require('express').Router()

const { AlertModel } = require('../../models')
const { getOrgIdForDprNo } = require('../../utils/AppUtils')
const { HandleResponseError } = require('../../utils/HandleResponseError')

/** API to handle incoming alerts */
router.post('', async (req, res)=>{
    try{
        let { dprNo, problem } = req.body

        let orgId = await getOrgIdForDprNo({ dprNo, email, msp })

        let alertResult = await AlertModel.create({ dprNo, problem })

        res.status(201).json({ ...alertResult._doc })
    }catch(err){
        HandleResponseError(err, res)
    }
})

module.exports = router