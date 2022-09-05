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

type CCDRChaincode struct {
}

type CCDR struct {
	Id            string    `json:"id"`
	DprNo         string    `json:"dprNo"`
	DprId         string    `json:"dprId"`
	OrgId         string    `json:"orgId"`
	TransportMode string    `json:"transportMode"`
	IsDelete      bool      `json:"isDelete"`
	Steps         string    `json:"steps"`
	CreatedOn     time.Time `json:"createdOn"`
	CreatedBy     string    `json:"createdBy"`
	Misc          string    `json:"misc"`
}

func (cc *CCDRChaincode) create(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 10 {
		return shim.Error("Incorrect number arguments. Expecting 18")
	}
	createdOn, err1 := time.Parse(time.RFC3339, args[7])

	if err1 != nil {
		return shim.Error("Error converting string to date: " + err1.Error())
	}
	isDelete, err2 := strconv.ParseBool(args[5])

	if err2 != nil {
		return shim.Error("Error converting string to bool: " + err2.Error())
	}
	data := CCDR{
		Id:            args[0],
		DprNo:         args[1],
		DprId:         args[2],
		OrgId:         args[3],
		TransportMode: args[4],
		IsDelete:      isDelete,
		Steps:         args[6],
		CreatedOn:     createdOn,
		CreatedBy:     args[8],
		Misc:          args[9],
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

func (cc *CCDRChaincode) get(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	stateBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	return shim.Success(stateBytes)
}
func (cc *CCDRChaincode) delete(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number arguments. Expecting 1")
	}

	dataBytes, err := stub.GetState(args[0])

	if err != nil {
		return shim.Error("Error getting the state: " + err.Error())
	}

	data := CCDR{}

	json.Unmarshal(dataBytes, &data)

	data.IsDelete = true

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
func (cc *CCDRChaincode) update(stub shim.ChaincodeStubInterface, arg []string) peer.Response {

	args := strings.Split(arg[0], "^^")

	if len(args) != 10 {
		return shim.Error("Incorrect number arguments. Expecting 18")
	}
	createdOn, err1 := time.Parse(time.RFC3339, args[7])

	if err1 != nil {
		return shim.Error("Error converting string to date: " + err1.Error())
	}
	isDelete, err2 := strconv.ParseBool(args[5])

	if err2 != nil {
		return shim.Error("Error converting string to bool: " + err2.Error())
	}
	data := CCDR{
		Id:            args[0],
		DprNo:         args[1],
		DprId:         args[2],
		OrgId:         args[3],
		TransportMode: args[4],
		IsDelete:      isDelete,
		Steps:         args[6],
		CreatedOn:     createdOn,
		CreatedBy:     args[8],
		Misc:          args[9],
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

func (cc *CCDRChaincode) history(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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

func (cc *CCDRChaincode) querystring(stub shim.ChaincodeStubInterface, args []string) peer.Response {

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
func (cc *CCDRChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

func (cc *CCDRChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

	function, args := stub.GetFunctionAndParameters()

	if function == "create" {
		return cc.create(stub, args)
	} else if function == "get" {
		return cc.get(stub, args)
	} else if function == "delete" {
		return cc.delete(stub, args)
	} else if function == "update" {
		return cc.update(stub, args)
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

	err := shim.Start(new(CCDRChaincode))
	if err != nil {
		fmt.Printf("Error starting BioMetric chaincode: %s", err)
	}
}
