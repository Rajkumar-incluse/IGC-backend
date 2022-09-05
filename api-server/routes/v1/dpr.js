const router = require('express').Router()
const { v4: uuid } = require('uuid')
const moment = require('moment')

const { HandleResponseError, CustomError, ResourceNotFoundError } = require('../../utils/HandleResponseError')
const { CCDR_STATUS, CHAINCODE_ACTIONS, CHAINCODE_CHANNEL, CHAINCODE_NAMES } = require('../../utils/helper')
const { MOCK_DPR_DATA } = require('../../utils/mockdata')
const { invokeTransactionV2 } = require('../../app/invoke')

/**
documents:[
    {
        name: "",
        documentStatus: {
            status: "",
            createdBy: "",
            createdOn: ""
        },
        createdBy: "",
        createdOn: ""
    },    
]
 */
/** 
 * API to check whether entered DPR no exist in the SAP backend system info
 */
router.get('/search', async (req, res) => {
    try {
        let { dprno } = req.query

        if (!dprno || dprno == '') {
            throw new CustomError({ message: 'Enter a DPR number' })
        }

        let dprInfo = MOCK_DPR_DATA.filter(dpr => dpr.DPR == dprno + "")

        if (!dprInfo || dprInfo.length == 0) {
            throw new ResourceNotFoundError({ message: 'Entered DPR number not found' })
        }

        res.status(200).json(dprInfo[0])

    } catch (err) {
        HandleResponseError(err, res)
    }
})

/**  API to created new dpr */
router.post('', async (req, res) => {
    try {
        let { userId, email, orgId, msp } = req.user
        let { dprNo, shipperNo, from, to, products, documentNo, referenceSOPNo,
            department, pickingListNo, version, legacyDocNo, effectiveDate,
            transportMode, packingList } = req.body

        let dprObj = {
            id: uuid(),
            dprNo,
            shipperNo,
            from,
            to,
            products: JSON.stringify(products),
            documentNo,
            referenceSOPNo,
            department,
            pickingListNo,
            version,
            legacyDocNo,
            effectiveDate: moment(new Date()).format(),
            ccdrStatus: CCDR_STATUS.NOT_STARTED,
            transportMode,
            orgId,
            isDelete: 'false',
            createdBy: userId,
            createdOn: moment(new Date()).format(),
            packingList: JSON.stringify(packingList),
            notes: ''
        }

        let message = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            chainCodeAction: CHAINCODE_ACTIONS.CREATE,
            channelName: CHAINCODE_CHANNEL,
            data: dprObj,
            chainCodeFunctionName: 'create',
            chainCodeName: CHAINCODE_NAMES.DPR
        })

        console.log(message);

        res.status(201).json(dprObj)

    } catch (err) {
        HandleResponseError(err, res)
    }
})

/** API to get all dpr | by dprNo | by id */
router.get('', async (req, res) => {
    try {
        let { userId, email, msp, orgId } = req.user
        let { dprNo, id } = req.query

        let query = { "selector": { "orgId": orgId } }

        if (dprNo && dprNo != '') {
            query.selector["dprNo"] = dprNo
        } else if (id && id != '') {
            query.selector["id"] = id
        } else {
            query["fields"] = ['id', 'dprNo', 'ccdrStatus', 'effectiveDate', 'transportMode']
        }

        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            channelName: CHAINCODE_CHANNEL,
            data: queryString,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.DPR
        })

        res.status(200).json(JSON.parse(dataStr))

    } catch (err) {
        HandleResponseError(err, res)
    }
})

module.exports = router;