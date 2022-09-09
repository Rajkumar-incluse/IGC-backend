const router = require('express').Router()

const { invokeTransactionV2 } = require('../../app/invoke')
const { HandleResponseError } = require('../../utils/HandleResponseError')
const { CCDR_STATUS, CHAINCODE_ACTIONS, CHAINCODE_CHANNEL, generateId, getNow, CHAINCODE_NAMES } = require('../../utils/helper')

/** function to update CCDR status */
const updateCCDRStatus = async ({ userId, email, orgId, msp, dprNo, dprId, ccdrStatus})=>{
    let query = { "selector": { "orgId": orgId, dprNo, id: dprId } }
        
    let queryString = JSON.stringify(query)
    
    let dprStr = await invokeTransactionV2({
        metaInfo: { userName: email, org: msp },
        chainCodeAction: CHAINCODE_ACTIONS.GET,
        channelName: CHAINCODE_CHANNEL,
        data: queryString,
        chainCodeFunctionName: 'querystring',
        chainCodeName: CHAINCODE_NAMES.DPR
    })

    let dprObj = JSON.parse(dprStr)[0]

    console.log(dprObj)

    dprObj['ccdrStatus'] = JSON.stringify({ status: ccdrStatus, createdBy: userId, createdOn: getNow() })
    dprObj.isDelete = dprObj.isDelete.toString()

    let updateMessage = await invokeTransactionV2({
        metaInfo: { userName: email, org: msp },
        chainCodeAction: CHAINCODE_ACTIONS.CREATE,
        channelName: CHAINCODE_CHANNEL,
        data: dprObj,
        chainCodeFunctionName: 'update',
        chainCodeName: CHAINCODE_NAMES.DPR
    })

    return dprObj
}

/** API to get CCDR by dpr no/id */
router.get('', async (req, res)=>{
    try{
        let { userId, email, msp, orgId } = req.user
        let { dprNo, dprId } = req.query

        let query = { "selector": { "orgId": orgId } }

        if (dprNo && dprNo != '') {
            query.selector["dprNo"] = dprNo
        }
        if (dprId && dprId != '') {
            query.selector["dprId"] = dprId
        }

        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            channelName: CHAINCODE_CHANNEL,
            data: queryString,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.CCDR
        })

        res.status(200).json(JSON.parse(dataStr))

    }catch(err){
        HandleResponseError(err, res)
    }
})

/** API to create CCDR */
router.post('', async (req, res) => {
    try {
        let { userId, email, msp, orgId } = req.user
        let { dprNo, dprId, transportMode, steps } = req.body

        let ccdrObj = {
            id: generateId(),
            dprNo,
            dprId,
            orgId,
            transportMode,
            isDelete: 'false',
            steps: JSON.stringify(steps),
            createdOn: getNow(),
            createdBy: userId,
            misc: ''
        }

        let result = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            chainCodeAction: CHAINCODE_ACTIONS.CREATE,
            chainCodeFunctionName: 'create',
            channelName: CHAINCODE_CHANNEL,
            chainCodeName: CHAINCODE_NAMES.CCDR,
            data: ccdrObj,
        })

        console.log("Updating ccdr status")

        let dprObj = await updateCCDRStatus({ userId, email, orgId, msp, dprNo, dprId, ccdrStatus: CCDR_STATUS.IN_PROGRESS })

        res.status(200).json(ccdrObj)

    } catch (err) {
        HandleResponseError(err, res)
    }
})

/** API to update ccdr status */
router.put('/status', async (req, res)=>{
    try{
        let { userId, email, orgId, msp } = req.user
        let { ccdrStatus, dprNo, dprId } = req.body
        
        let dprObj = await updateCCDRStatus({ userId, email, orgId, msp, dprNo, dprId, ccdrStatus })

        res.status(200).json(dprObj)
    }catch(err){
        HandleResponseError(err, res)
    }
})

module.exports = router

/**
 * 
ccdr: ""
dprNo: ""
dprId: ""
orgId: ""
transportMode: "active"
createdOn: ""
createdBy: ""
isDelete: false
steps: [
    {
        name: "generalInstruction",
        data: [
            { key: "properCleaning", val: true },
            { key: "calibration", val: "" },
            { key: "gelpackPacking", val: true }
        ]
    },
    {
        name: "packingOperation",
        data: [
            { key: "" }
        ]
    }
]
misc: ""



*/