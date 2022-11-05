const router = require('express').Router()
const axios = require('axios').default

const { HandleResponseError } = require('../../utils/HandleResponseError')
const { generateId, getNow, CHAINCODE_CHANNEL, CHAINCODE_ACTIONS, CHAINCODE_NAMES, getFormattedNow } = require('../../utils/helper')
const { invokeTransactionV2 } = require('../../app/invoke')
const { getOrgIdForDprNo } = require('../../utils/AppUtils')
const { AlertModel } = require('../../models')

router.post('', async (req, res)=>{
    try{
        let { Temp } = req.query

        let [ temperature, timestamp, ip, dprNo, deviceId, email="admin@gmail.com", msp="org1Msp" ] = Temp.split(',')
        let response = await axios.get(`http://ip-api.com/json/${ip}`)
        let { city, lat, lon, status, regionName } = response.data

        let orgId = "631e30b3108198330d750aa2"// await getOrgIdForDprNo({ dprNo, email, msp })

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
        global.recent[orgId][dprNo] = { id:data.id, temperature, timestamp: getNow() }

        // triggering alert
        let triggerAlert = false;
        let problem = ""
        let tTemp = parseFloat(temperature+"")        
        if(tTemp >= 2.5 && tTemp <= 7.5){
            triggerAlert = true
            problem = `${tTemp}\u00b0 orange alert - ${getFormattedNow()}`
        }

        if(tTemp <= 2 || tTemp >= 8){
            triggerAlert = true
            problem = `${tTemp}\u00b0 red alert - ${getFormattedNow()}`
        }

        if(triggerAlert) AlertModel.create({ dprNo, problem, orgId })
        
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

router.get('', async (req, res)=>{
    try{
        let { userId, email, msp, orgId } = req.user
        let { dprNo } = req.query

        // TODO remove this later
        orgId = "631e30b3108198330d750aa2"

        if (!dprNo || dprNo == '') {
            throw new CustomError({ message: 'Enter a DPR NO' })
        }

        let query = { "selector": { "orgId": orgId, "dprNo": dprNo } }
        query["fields"] = ['id', 'temperature', 'timestamp', 'city', 'state']

        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            channelName: CHAINCODE_CHANNEL,
            data: queryString,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.IOT
        })

        res.status(200).json(JSON.parse(dataStr))

    }catch(err){
        HandleResponseError(err, res)
    }
})

module.exports = router