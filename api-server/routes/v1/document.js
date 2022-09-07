const { invokeTransactionV2 } = require('../../app/invoke')
const { UploadToDisk } = require('../../config/fileUpload')
const { HandleResponseError, CustomError, ResourceNotFoundError } = require('../../utils/HandleResponseError')
const { CHAINCODE_CHANNEL, CHAINCODE_NAMES, CHAINCODE_ACTIONS, generateId, getNow, DOCUMENT_STATUS, CCDR_STATUS } = require('../../utils/helper')

const router = require('express').Router()

/** API to retrieve documents from dpr */
router.get('', async (req, res) => {
    try {
        let { userId, email, msp, orgId } = req.user
        let { dprNo, dprId } = req.query

        let query = { "selector": { "orgId": orgId } }

        if (dprNo && dprNo != '') {
            query.selector["dprNo"] = dprNo
        } else if (dprId && dprId != '') {
            query.selector["dprId"] = dprId
        }

        query["fields"] = ['id', 'dprNo', 'ccdrStatus', 'effectiveDate', 'transportMode', 'documents']
        let queryString = JSON.stringify(query)

        let dataString = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            channelName: CHAINCODE_CHANNEL,
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeName: CHAINCODE_NAMES.DPR,
            chainCodeFunctionName: 'querystring',
            data: queryString
        })

        res.status(200).json(JSON.parse(dataString))
    } catch (err) {
        HandleResponseError(err, res)
    }
})

/** API to add documents to dpr */
router.post('', UploadToDisk.single('document'), async (req, res) => {
    try {
        let { userId, email, msp, orgId } = req.user
        /**
documents:[
    {
        id: "", 
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
        let { dprNo, dprId, documentType } = req.body
        let { originalname, generatedName } = req.file

        let query = { "selector": { "orgId": orgId } }

        if (dprNo && dprNo != '') {
            query.selector["dprNo"] = dprNo
        } else if (dprId && dprId != '') {
            query.selector["dprId"] = dprId
        }

        let queryString = JSON.stringify(query)

        let dataString = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            channelName: CHAINCODE_CHANNEL,
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeName: CHAINCODE_NAMES.DPR,
            chainCodeFunctionName: 'querystring',
            data: queryString
        })

        let data = JSON.parse(dataString)
        if(data.length == 0){
            throw ResourceNotFoundError({ message: `DPR not found for dprNo: ${dprNo} or dprId: ${dprId} for your org` })
        }


        data = data[0]
        let docs = JSON.parse(data.documents)

        let doc = {
            id: generateId(),
            documentType,
            orginalName: originalname,
            name: generatedName,
            documentStatus: { status: DOCUMENT_STATUS.UPLOADED, createdOn: getNow(), createdBy: userId },
            createdOn: getNow(),
            createdBy: userId
        }

        docs.push(doc)

        data['documents'] = JSON.stringify(docs)
        data.isDelete = data.isDelete.toString()

        console.log(data);

        // updating the dpr
        let result = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            channelName: CHAINCODE_CHANNEL,
            chainCodeAction: CHAINCODE_ACTIONS.UPDATE,
            chainCodeName: CHAINCODE_NAMES.DPR,
            chainCodeFunctionName: 'update',
            data: data
        })

        res.status(201).json(doc)
    } catch (err) {
        HandleResponseError(err, res)
    }
})

module.exports = router