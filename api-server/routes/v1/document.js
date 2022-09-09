const { invokeTransactionV2 } = require('../../app/invoke')
const { UploadToDisk } = require('../../config/fileUpload')
const { HandleResponseError, CustomError, ResourceNotFoundError, RequestInputError } = require('../../utils/HandleResponseError')
const { CHAINCODE_CHANNEL, CHAINCODE_NAMES, CHAINCODE_ACTIONS, generateId, getNow, DOCUMENT_STATUS, CCDR_STATUS, DOCUMENT_TYPE } = require('../../utils/helper')

const router = require('express').Router()

/** API to retrieve documents from dpr */
router.get('', async (req, res) => {
    try {
        let { userId, email, msp, orgId } = req.user
        let { dprNo, dprId } = req.query

        let query = { "selector": { "orgId": orgId } }

        if (dprNo && dprNo != '') {
            query.selector["dprNo"] = dprNo
        }
        if (dprId && dprId != '') {
            query.selector["id"] = dprId
        }

        query["fields"] = ['id', 'dprNo', 'ccdrStatus', 'effectiveDate', 'transportMode', 'documents', 'startDate', 'endDate']
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

/**
 * document startdate(tax invoice), enddate(signed lrcopy, signed seal code)
 */
        let { dprNo, dprId, documentType } = req.body
        let { originalname, generatedName } = req.file

        let query = { "selector": { "orgId": orgId } }

        if (dprNo && dprNo != '') {
            query.selector["dprNo"] = dprNo
        }
        if (dprId && dprId != '') {
            query.selector["id"] = dprId
        }
        console.log({query});
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

        console.log(`...........data length : ${data.length}`);
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
        console.log({ documentType });
        /** updating start date on tax invoice upload */
        if(documentType == DOCUMENT_TYPE.TAX_INVOICE){
            console.log("----------- taxinvoice uploaded changing start date");
            data.startDate = getNow()
        }


        /** updating end date when signed lrcopy and sealcode exists */
        let signedLrCopyExists = docs.some(doc => doc.documentType == DOCUMENT_TYPE.SIGNED_LR_COPY)
        let signedSealCodeExists = docs.some(doc => doc.documentType == DOCUMENT_TYPE.SIGNED_SEAL_CODE)
        if(signedLrCopyExists && signedSealCodeExists){
            data.endDate = getNow()
        }

        console.log(data);

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

/** API to approve/reject documents */
router.put('/status', async(req, res)=>{
    try{
        let { userId, email, orgId, msp } = req.user
        let { dprId, documentId, documentStatus } = req.body
        
        if (!dprId && dprId == '') {
            throw RequestInputError({ message: "Not a valid dpr id" })
        }

        let queryString = JSON.stringify({ "selector": { "orgId": orgId, "id": dprId } })

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
            throw new ResourceNotFoundError({ message: `DPR not found for dprId: ${dprId} for your org` })
        }


        data = data[0]
        let docs = JSON.parse(data.documents)
        
        let foundDoc = {}
        docs.map(doc => {
            console.log(doc.id);
            if(doc.id == documentId){
                console.log("found doc with provided id");
                doc.documentStatus = { status: documentStatus, createdOn: getNow(), createdBy: userId }
                foundDoc = doc
            }
        })

        data['documents'] = JSON.stringify(docs)
        data.isDelete = data.isDelete.toString()

        let result = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            channelName: CHAINCODE_CHANNEL,
            chainCodeAction: CHAINCODE_ACTIONS.UPDATE,
            chainCodeName: CHAINCODE_NAMES.DPR,
            chainCodeFunctionName: 'update',
            data: data
        })

        res.status(201).json(foundDoc)

    }catch(err){
        HandleResponseError(err, res)
    }
})

module.exports = router