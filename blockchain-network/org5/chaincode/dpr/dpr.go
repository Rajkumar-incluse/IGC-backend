package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-protos-go/peer"
)

type dprChaincode struct {
}

type dpr struct {
	id             string    `json:"id"`
	dprNo          string    `json:"dprNo"`
	shipperNo      string    `json:"shipperNo"`
	from           string    `json:"from"`
	to             string    `json:"to"`
	products       string    `json:"products"`
	documentNo     string    `json:"documentNo"`
	referenceSOPNo string    `json:"referenceSOPNo"`
	department     string    `json:"department"`
	pickingListNo  string    `json:"pickingListNo"`
	version        string    `json:"version"`
	legacyDocNo    string    `json:"legacyDocNo"`
	effectiveDate  time.Time `json:"effectiveDate"`
	ccdrStatus     string    `json:"ccdrStatus"`
	transportMode  string    `json:"transportMode"`
	orgId          string    `json:"orgId"`
	isDelete       bool      `json:"isDelete"`
	createdBy      string    `json:"createdBy"`
	createdOn      time.Time `json:"createdOn"`
	packingList    string    `json:"packingList"`
	notes          string    `json:"notes"`
}

func (cc *dprChaincode) create(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 21 {
		return shim.Error("Incorrect number arguments. Expecting 20")
	}
	createdOn1, err1 := time.Parse(time.RFC3339, args[18])

	if err1 != nil {
		return shim.Error("Error converting string to date: " + err1.Error())
	}

	effectiveDate1, err2 := time.Parse(time.RFC3339, args[12])
	if err2 != nil {
		return shim.Error("Error converting string to date: " + err2.Error())
	}

	isDeleteBool, err3 := strconv.ParseBool(args[16])

	if err3 != nil {
		return shim.Error("Error converting string to bool: " + err3.Error())
	}

	data := dpr{
		id:             args[0],
		dprNo:          args[1],
		shipperNo:      args[2],
		from:           args[3],
		to:             args[4],
		products:       args[5],
		documentNo:     args[6],
		referenceSOPNo: args[7],
		department:     args[8],
		pickingListNo:  args[9],
		version:        args[10],
		legacyDocNo:    args[11],
		effectiveDate:  effectiveDate1,
		ccdrStatus:     args[13],
		transportMode:  args[14],
		orgId:          args[15],
		isDelete:       isDeleteBool,
		createdBy:      args[17],
		createdOn:      createdOn1,
		packingList:    args[19],
		notes:          args[20],
	}

	dataBytes, errMarshal := json.Marshal(data)

	if errMarshal != nil {
		return shim.Error("Error converting data as bytes: " + errMarshal.Error())
	}

	errPut := stub.PutState(args[0], dataBytes)

	if errPut != nil {
		return shim.Error("Error putting the state: " + errPut.Error())
	}

	return shim.Success(nil)
}

func (cc *dprChaincode) get(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	stateBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	return shim.Success(stateBytes)
}
func (cc *dprChaincode) update(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 21 {
		return shim.Error("Incorrect number arguments. Expecting 20")
	}
	createdOn, err1 := time.Parse(time.RFC3339, args[18])

	if err1 != nil {
		return shim.Error("Error converting string to date: " + err1.Error())
	}

	effectiveDate, err2 := time.Parse(time.RFC3339, args[12])
	if err2 != nil {
		return shim.Error("Error converting string to date: " + err2.Error())
	}

	isDeleteBool, err3 := strconv.ParseBool(args[16])

	if err3 != nil {
		return shim.Error("Error converting string to bool: " + err3.Error())
	}

	data := dpr{
		id:             args[0],
		dprNo:          args[1],
		shipperNo:      args[2],
		from:           args[3],
		to:             args[4],
		products:       args[5],
		documentNo:     args[6],
		referenceSOPNo: args[7],
		department:     args[8],
		pickingListNo:  args[9],
		version:        args[10],
		legacyDocNo:    args[11],
		effectiveDate:  effectiveDate,
		ccdrStatus:     args[13],
		transportMode:  args[14],
		orgId:          args[15],
		isDelete:       isDeleteBool,
		createdBy:      args[17],
		createdOn:      createdOn,
		packingList:    args[19],
		notes:          args[20],
	}

	dataBytes, errMarshal := json.Marshal(data)

	if errMarshal != nil {
		return shim.Error("Error converting data as bytes: " + errMarshal.Error())
	}

	errPut := stub.PutState(args[0], dataBytes)

	if errPut != nil {
		return shim.Error("Error putting the data state: " + errPut.Error())
	}

	return shim.Success(nil)
}
func (cc *dprChaincode) delete(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	dataBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	data := dpr{}

	json.Unmarshal(dataBytes, &data)

	data.isDelete = true

	updateDataBytes, err1 := json.Marshal(data)

	if err1 != nil {
		return shim.Error("Error converting data as bytes: " + err1.Error())
	}

	err2 := stub.PutState(args[0], updateDataBytes)

	if err2 != nil {
		return shim.Error("Error putting the data state: " + err2.Error())
	}

	return shim.Success(nil)
}

func (cc *dprChaincode) history(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	queryResult, err := stub.GetHistoryForKey(args[0])

	if err != nil {
		return shim.Error("Error getting history results: " + err.Error())
	}

	var buffer bytes.Buffer
	buffer.WriteString("[")

	isDataAdded := false
	for queryResult.HasNext() {
		queryResponse, err1 := queryResult.Next()
		if err1 != nil {
			return shim.Error(err1.Error())
		}

		if isDataAdded == true {
			buffer.WriteString(",")
		}

		buffer.WriteString(string(queryResponse.Value))

		isDataAdded = true
	}
	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}

func (cc *dprChaincode) querystring(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	queryResult, err := stub.GetQueryResult(args[0])

	if err != nil {
		return shim.Error("Error getting query string results: " + err.Error())
	}

	var buffer bytes.Buffer
	buffer.WriteString("[")

	isDataAdded := false
	for queryResult.HasNext() {
		queryResponse, err1 := queryResult.Next()
		if err1 != nil {
			return shim.Error(err1.Error())
		}

		if isDataAdded == true {
			buffer.WriteString(",")
		}

		buffer.WriteString(string(queryResponse.Value))

		isDataAdded = true
	}
	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}
func (cc *dprChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

func (cc *dprChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

	function, args := stub.GetFunctionAndParameters()

	if function == "create" {
		return cc.create(stub, args)
	} else if function == "get" {
		return cc.get(stub, args)
	} else if function == "update" {
		return cc.update(stub, args)
	} else if function == "delete" {
		return cc.delete(stub, args)
	} else if function == "history" {
		return cc.history(stub, args)
	} else if function == "querystring" {
		return cc.querystring(stub, args)
	}

	return shim.Error("Invalid invoke function name")
}

func main() {
	var _ = strconv.FormatInt(1234, 10)
	var _ = time.Now()
	var _ = strings.ToUpper("test")
	var _ = bytes.ToUpper([]byte("test"))

	err := shim.Start(new(dprChaincode))
	if err != nil {
		fmt.Printf("Error starting BioMetric chaincode: %s", err)
	}
}
