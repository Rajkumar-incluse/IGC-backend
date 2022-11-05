const { invokeTransactionV2 } = require('../../app/invoke')
const { AlertModel } = require('../../models')
const { HandleResponseError, RequestInputError, ResourceNotFoundError } = require('../../utils/HandleResponseError')
const { CHAINCODE_ACTIONS, CHAINCODE_NAMES, CHAINCODE_CHANNEL, getNow } = require('../../utils/helper')

const router = require('express').Router()

/** API to get data for dashboard */
router.get('', async (req, res) => {
    try {
        let { email, msp, orgId } = req.user

        // TODO remove this later
        orgId = "631e30b3108198330d750aa2"

        // retrive dpr from blockchain - total count
        let query = { selector: { orgId }, fields: ['dprNo', 'startDate', 'endDate'] }

        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.DPR,
            channelName: CHAINCODE_CHANNEL,
            data: queryString
        })

        let data = JSON.parse(dataStr)
        console.log("mission ", data)
        let obj = { total: 0, ongoing: 0, ended: 0, iotDevices: 2 }

        let ongoingDprs = ["123", "124"]

        for(let i=0; i< data.length; i++) {
            let dpr = data[i]
            let start = new Date(dpr.startDate)
            let end = new Date(dpr.endDate)

            if (start > end) {
                console.log("start > end")
                obj.total = obj.total + 1
                obj.ongoing = obj.ongoing + 1
                ongoingDprs.push(dpr.dprNo)
            }

            if (end > start) {
                console.log("end > start")
                obj.total = obj.total + 1
                obj.ended = obj.ended + 1
            }

            if(start == end){
                console.log("start == end")
            }
        }

        // recent dprNo list 
        // sort recent dpr number

        let dprObjs = global.recent[orgId]
        console.log("dprObjs : ", dprObjs);

        let dprs = []

        for(let key in dprObjs){
            let temp = { ...dprObjs[key], dprNo: key }
            dprs.push(temp)
        }


        dprs.sort((a, b)=>{
            let ta = new Date(a.timestamp)
            let tb = new Date(b.timestamp)

            return tb - ta
        })

        // get recent 5 alerts of dprNo
        let recentFiveAlerts = await AlertModel.aggregate(
            [
                { "$match": { dprNo: { $in: ongoingDprs } } },
                { "$sort": { createdAt: -1 } },
                { "$group": {
                        "_id": "$dprNo",
                        "problems": { $push: "$problem" }
                    } 
                },
                { "$project": {
                        _id: "$_id",
                        dprNo: "$_id",
                        problems: { $slice: ["$problems", 0, 5] }            
                    }
                
                }
            ]
        )

        // let [mission, dprList, recentAlert] = Promise.all([missions, dprListObj])

        res.status(200).json({ mission : obj, dprList: dprs, recentAlert: recentFiveAlerts })

    } catch (err) {recentFiveAlerts
        HandleResponseError(err, res)
    }
})

/** API to get data for track screen info */
router.get('/track', async (req, res) => {
    try {
        let { userId, orgId, msp, email } = req.user
        let { dprNo } = req.query

        if (!dprNo || dprNo == '') {
            throw new RequestInputError({ message: "dprNo ir required" })
        }

        let query = { selector: { dprNo } }
        let queryString = JSON.stringify(query)

        let dataStr = await invokeTransactionV2({
            metaInfo: { userName: email, org: msp },
            chainCodeAction: CHAINCODE_ACTIONS.GET,
            chainCodeFunctionName: 'querystring',
            chainCodeName: CHAINCODE_NAMES.IOT,
            channelName: CHAINCODE_CHANNEL,
            data: queryString
        })

        let data = JSON.parse(dataStr)

        if(data.length == 0){
            throw new ResourceNotFoundError({ message: "No record found for the given dprNo" })
        }

        let obj = {
            loc: {},
            highTemp: Number.MIN_VALUE,
            lowTemp: Number.MAX_VALUE,
            above12: 0,
            below2: 0
        }

        for(let j = 0; j<data.length; j++){
            
            let i = data[j]

            let t = parseFloat(i.temperature)
            console.log("parsed temp : ", t)
            // setting high temperature
            if (t > obj.highTemp) {
                obj.highTemp = t
            }

            // setting low temperature
            if (obj.lowTemp > t) {
                obj.lowTemp = t
            }

            // count above 12
            if (t > 12) {
                obj.above12 = obj.above12+1
            }

            // below 2
            if (2 > t) {
                obj.below2 = obj.below2+1
            }


            if (!obj.loc[i.city]) {
                obj.loc[i.city] = 0
            }

            obj.loc[i.city] = obj.loc[i.city]+1

        }

        let mostSpentLocation = ""

        let spentLocationArr = []
        for(let key in obj.loc){
            let te = { times: obj.loc[key], location: key }
            spentLocationArr.push(te)
        }

        mostSpentLocation = spentLocationArr[0]

        for(let i = 0; i<spentLocationArr.length; i++){
            let ob = spentLocationArr[i]
            if(ob.times > mostSpentLocation.times){
                mostSpentLocation = ob
            }
        }

        data.sort((a,b)=>{
            let aD = new Date(a.timestamp)
            let bD = new Date(b.timestamp)

            if(aD > bD) return 1
            if(bD > aD) return -1
            return 0
        })

        let recentData = data[data.length - 1]

        let vehicleTracking = {
            currentLocation: recentData.city,
            mostTimeSpendLocation: mostSpentLocation.location,
            tempAboveTimes: obj.above12,
            tempBelowTimes: obj.below2,
            lastTrackedTime: recentData.timestamp,
            lastTrackedTemp: recentData.temperature,
            highestTemp: obj.highTemp,
            lowestTemp: obj.lowTemp,
            lat: recentData.lat,
            long: recentData.lon,
        }

        res.status(200).json(vehicleTracking)
    } catch (err) {
        HandleResponseError(err, res)
    }
})

module.exports = router