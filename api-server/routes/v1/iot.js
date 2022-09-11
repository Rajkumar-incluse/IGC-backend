const router = require('express').Router()
const axios = require('axios').default

const { HandleResponseError } = require('../../utils/HandleResponseError')
const { generateId, getNow, CHAINCODE_CHANNEL, CHAINCODE_ACTIONS, CHAINCODE_NAMES } = require('../../utils/helper')
const { invokeTransactionV2 } = require('../../app/invoke')
const { getOrgIdForDprNo } = require('../../utils/AppUtils')

router.post('', async (req, res)=>{
    try{
        let { Temp } = req.query

        let [ temperature, timestamp, ip, dprNo, deviceId, email="admin@gmail.com", msp="org1Msp" ] = Temp.split(',')
        let response = await axios.get(`http://ip-api.com/json/${ip}`)
        let { city, lat, lon, status, regionName } = response.data

        let orgId = await getOrgIdForDprNo({ dprNo, email, msp })

        let data = {
            id: generateId(),
            deviceId: ""+deviceId,
            dprNo: ""+dprNo,
            temperature: ""+temperature,
            timestamp: getNow(),
            ip,
            city,
            state: regionName,
            lat,
            lon,
            createdOn: getNow(),
            others: "",
            orgId: orgId
        }

        // create organization
        if(!global.recent[orgId]){
            global.recent[orgId] = {}
        }

        // setting dprNo if not exists
        if(!global.recent[orgId][dprNo]){
            global.recent[orgId][dprNo] = {}
        }

        // caching the recent temperature value of dpr
        global.recent[orgId][dprNo] = { id, temperature, timestamp: getNow() }


        let message = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            chainCodeAction: CHAINCODE_ACTIONS.CREATE,
            channelName: CHAINCODE_CHANNEL,
            data,
            chainCodeFunctionName: 'create',
            chainCodeName: CHAINCODE_NAMES.IOT
        })

        res.status(200).send("200")
    }catch(err){
        HandleResponseError(err, res)
    }
})

module.exports = router