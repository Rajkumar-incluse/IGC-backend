const router = require('express').Router()

const { AlertModel } = require('../../models')
const { getOrgIdForDprNo } = require('../../utils/AppUtils')
const { HandleResponseError } = require('../../utils/HandleResponseError')

/** API to handle incoming alerts */
router.post('', async (req, res)=>{
    try{
        let { dprNo, problem } = req.body
        let email = "admin@gmail.com"
        let msp = "org1Msp"
        let orgId = "631e30b3108198330d750aa2" // await getOrgIdForDprNo({ dprNo, email, msp })

        let alertResult = await AlertModel.create({ dprNo, problem, orgId })

        res.status(201).json({ ...alertResult._doc })
    }catch(err){
        HandleResponseError(err, res)
    }
})

module.exports = router