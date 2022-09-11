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

type iotChaincode struct {
}

type iot struct {
	Id          string    `json:"id"`
	DeviceId    string    `json:"deviceId"`
	DprNo       string    `json:"dprNo"`
	Temperature string    `json:"temperature"`
	Timestamp   time.Time `json:"timestamp"`
	Ip          string    `json:"ip"`
	City        string    `json:"city"`
	State       string    `json:"state"`
	Lat         string    `json:"lat"`
	Lon         string    `json:"lon"`
	CreatedOn   time.Time `json:"createdOn"`
	Others      string    `json:"others"`
	OrgId       string    `json:"orgId"`
}

func (cc *iotChaincode) create(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 13 {
		return shim.Error("Incorrect number arguments. Expecting 9")
	}

	timestamp, err1 := time.Parse(time.RFC3339, args[4])

	if err1 != nil {
		return shim.Error("Error converting string to date: " + err1.Error())
	}

	createdOn, err2 := time.Parse(time.RFC3339, args[10])

	if err2 != nil {
		return shim.Error("Error converting string to date: " + err2.Error())
	}

	data := iot{
		Id:          args[0],
		DeviceId:    args[1],
		DprNo:       args[2],
		Temperature: args[3],
		Timestamp:   timestamp,
		Ip:          args[5],
		City:        args[6],
		State:       args[7],
		Lat:         args[8],
		Lon:         args[9],
		CreatedOn:   createdOn,
		Others:      args[11],
		OrgId:       args[12],
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

func (cc *iotChaincode) get(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	stateBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	return shim.Success(stateBytes)
}
func (cc *iotChaincode) update(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 13 {
		return shim.Error("Incorrect number arguments. Expecting 9")
	}

	timestamp, err1 := time.Parse(time.RFC3339, args[4])

	if err1 != nil {
		return shim.Error("Error converting string to date: " + err1.Error())
	}

	createdOn, err2 := time.Parse(time.RFC3339, args[10])

	if err2 != nil {
		return shim.Error("Error converting string to date: " + err2.Error())
	}

	data := iot{
		Id:          args[0],
		DeviceId:    args[1],
		DprNo:       args[2],
		Temperature: args[3],
		Timestamp:   timestamp,
		Ip:          args[5],
		City:        args[6],
		State:       args[7],
		Lat:         args[8],
		Lon:         args[9],
		CreatedOn:   createdOn,
		Others:      args[11],
		OrgId:       args[12],
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
func (cc *iotChaincode) delete(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	dataBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	data := iot{}

	json.Unmarshal(dataBytes, &data)

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

func (cc *iotChaincode) history(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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

func (cc *iotChaincode) querystring(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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
func (cc *iotChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

func (cc *iotChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

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

	err := shim.Start(new(iotChaincode))
	if err != nil {
		fmt.Printf("Error starting BioMetric chaincode: %s", err)
	}
}
