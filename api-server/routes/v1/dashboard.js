const { invokeTransactionV2 } = require('../../app/invoke')
const { AlertModel } = require('../../models')
const { HandleResponseError, RequestInputError } = require('../../utils/HandleResponseError')
const { CHAINCODE_ACTIONS, CHAINCODE_NAMES, CHAINCODE_CHANNEL } = require('../../utils/helper')

const router = require('express').Router()

/** API to get data for dashboard */
router.get('', async (req, res) => {
    try {
        let { email, msp, orgId } = req.user

        // to get mission related info
        let missions = (async () => {
            // retrive dpr from blockchain - total count
            let query = { selector: { orgId }, fields: ['startDate', 'endDate'] }

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

            let obj = { total: 0, ongoing: 0, ended: 0, iotDevices: 2 }

            data.forEach(dpr => {
                let start = new Date(dpr.startDate)
                let end = new Date(dpr.endDate)

                if (start > end) {
                    obj.total++
                    obj.ongoing++
                }

                if (end > start) {
                    obj.total++
                    obj.ended++
                }
            })

            return obj
        })()

        // recent dprNo list 
        // TODO sort recent dpr number
        let dprListObj = (async ()=>{
            return global.recent[orgId]
        })()

        // get recent 5 alerts of dprNo
        let recentFiveAlerts = AlertModel.find({ orgId }).distinct('dprNo').sort({ createdAt: -1 }).limit(5)

        let [mission, dprList, recentAlert] = Promise.all([missions, dprListObj, recentFiveAlerts])

        res.status(200).json({ mission, dprList, recentAlert })

    } catch (err) {
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
            chainCodeFunctionName: 'queryString',
            chainCodeName: CHAINCODE_NAMES.IOT,
            channelName: CHAINCODE_CHANNEL,
            data: queryString
        })

        let data = JSON.parse(dataStr)

        let obj = {
            loc: {},
            highTemp: Number.MIN_VALUE,
            lowTemp: Number.MAX_VALUE,
            above12: 0,
            below2: 0
        }

        data.forEach(i => {
            let t = parseFloat(i.temperature)
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
                obj.above12 = obj.above12++
            }

            // below 2
            if (2 > t) {
                obj.below2 = obj.below2++
            }


            if (!obj.loc[i.city]) {
                obj.loc[city] = 0
            }

            obj.loc[city] = obj.loc[city]++

        })

        let recentData = data[data.length - 1]

        let vehicleTracking = {
            currentLocation: recentData.city,
            mostTimeSpendLocation: '',
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