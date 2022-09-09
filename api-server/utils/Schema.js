const { CustomError } = require("./HandleResponseError")
const { CHAINCODE_NAMES } = require("./helper")

const ORGANIZATION_SCHEMA = [
    { "name": "Id" },
    { "name": "Participant_id" },
    { "name": "CreatedOn" },
    { "name": "CreatedBy" },
    { "name": "IsDelete" },
    { "name": "BusinessEmail" },
    { "name": "LicenseKey" },
    { "name": "FirstName" },
    { "name": "SurName" },
    { "name": "PhoneNumber" },
    { "name": "CompanyName" },
    { "name": "CompanySize" },
    { "name": "Country" },
    { "name": "State" },
    { "name": "Notes" }
]

const DPR_SCHEMA = [
    { name: "id" },
    { name: "dprNo" },
    { name: "shipperNo" },
    { name: "from" },
    { name: "to" },
    { name: "products" },
    { name: "documentNo" },
    { name: "referenceSOPNo" },
    { name: "department" },
    { name: "pickingListNo" },
    { name: "version" },
    { name: "legacyDocNo" },
    { name: "effectiveDate" },
    { name: "ccdrStatus" },
    { name: "transportMode" },
    { name: "orgId" },
    { name: "isDelete" },
    { name: "createdBy" },
    { name: "createdOn" },
    { name: "packingList" },
    { name: "notes" },
    { name: "documents" },
    { name: "startDate" },
    { name: "endDate" }
]

const CCDR_SCHEMA = [
    { name: 'id' },
    { name: 'dprNo' },
    { name: 'dprId' },
    { name: 'orgId' },
    { name: 'transportMode' },
    { name: 'isDelete' },
    { name: 'steps' },
    { name: 'createdOn' },
    { name: 'createdBy' },
    { name: 'misc' },
]

exports.getSchema = (chaincodeName)=>{
    switch(chaincodeName){
        case CHAINCODE_NAMES.ORGANIZATION: return ORGANIZATION_SCHEMA
        case CHAINCODE_NAMES.DPR: return DPR_SCHEMA
        case CHAINCODE_NAMES.CCDR: return CCDR_SCHEMA
        default: 
            throw new CustomError({ code: 404, message: `Schema for chaincodename : ${chaincodeName} does not exists` })
    }
}