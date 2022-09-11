#!/bin/bash
            
echo "************ Package dpr chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/dpr/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
peer lifecycle chaincode package dpr.tar.gz --path /opt/gopath/src/github.com/chaincode/dpr/ --lang golang --label dpr_1.0

echo "************ Package CCDR chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/CCDR/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
peer lifecycle chaincode package CCDR.tar.gz --path /opt/gopath/src/github.com/chaincode/CCDR/ --lang golang --label CCDR_1.0

echo "************ Package iot chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/iot/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
peer lifecycle chaincode package iot.tar.gz --path /opt/gopath/src/github.com/chaincode/iot/ --lang golang --label iot_1.0

# echo "************ Package activeCCDR chaincode **********" 
# pushd /opt/gopath/src/github.com/chaincode/activeCCDR/
# GO111MODULE=on go mod vendor
# popd

# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode package activeCCDR.tar.gz --path /opt/gopath/src/github.com/chaincode/activeCCDR/ --lang golang --label activeCCDR_1.0

# echo "************ Package passiveCCDR chaincode **********" 
# pushd /opt/gopath/src/github.com/chaincode/passiveCCDR/
# GO111MODULE=on go mod vendor
# popd

# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode package passiveCCDR.tar.gz --path /opt/gopath/src/github.com/chaincode/passiveCCDR/ --lang golang --label passiveCCDR_1.0

# echo "************ Package documents chaincode **********" 
# pushd /opt/gopath/src/github.com/chaincode/documents/
# GO111MODULE=on go mod vendor
# popd

# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode package documents.tar.gz --path /opt/gopath/src/github.com/chaincode/documents/ --lang golang --label documents_1.0

# echo "************ Package DRLDocs chaincode **********" 
# pushd /opt/gopath/src/github.com/chaincode/DRLDocs/
# GO111MODULE=on go mod vendor
# popd

# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode package DRLDocs.tar.gz --path /opt/gopath/src/github.com/chaincode/DRLDocs/ --lang golang --label DRLDocs_1.0

# echo "************ Package IGCAdmin chaincode **********" 
# pushd /opt/gopath/src/github.com/chaincode/IGCAdmin/
# GO111MODULE=on go mod vendor
# popd

# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode package IGCAdmin.tar.gz --path /opt/gopath/src/github.com/chaincode/IGCAdmin/ --lang golang --label IGCAdmin_1.0

# echo "************ Package License chaincode **********" 
# pushd /opt/gopath/src/github.com/chaincode/License/
# GO111MODULE=on go mod vendor
# popd

# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode package License.tar.gz --path /opt/gopath/src/github.com/chaincode/License/ --lang golang --label License_1.0

echo "************ Package Organization chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/Organization/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
peer lifecycle chaincode package Organization.tar.gz --path /opt/gopath/src/github.com/chaincode/Organization/ --lang golang --label Organization_1.0

# echo "************ Package OrgAdmin chaincode **********" 
# pushd /opt/gopath/src/github.com/chaincode/OrgAdmin/
# GO111MODULE=on go mod vendor
# popd

# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode package OrgAdmin.tar.gz --path /opt/gopath/src/github.com/chaincode/OrgAdmin/ --lang golang --label OrgAdmin_1.0

# echo "************ Package Users chaincode **********" 
# pushd /opt/gopath/src/github.com/chaincode/Users/
# GO111MODULE=on go mod vendor
# popd

# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode package Users.tar.gz --path /opt/gopath/src/github.com/chaincode/Users/ --lang golang --label Users_1.0

# echo "************ Package Userprofile chaincode **********" 
# pushd /opt/gopath/src/github.com/chaincode/Userprofile/
# GO111MODULE=on go mod vendor
# popd

# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode package Userprofile.tar.gz --path /opt/gopath/src/github.com/chaincode/Userprofile/ --lang golang --label Userprofile_1.0

echo "***************** Install dpr chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
peer lifecycle chaincode install dpr.tar.gz

echo "***************** Install CCDR chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
peer lifecycle chaincode install CCDR.tar.gz

echo "***************** Install iot chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
peer lifecycle chaincode install iot.tar.gz

# echo "***************** Install activeCCDR chaincode ***************"
# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode install activeCCDR.tar.gz

# echo "***************** Install passiveCCDR chaincode ***************"
# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode install passiveCCDR.tar.gz

# echo "***************** Install documents chaincode ***************"
# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode install documents.tar.gz

# echo "***************** Install DRLDocs chaincode ***************"
# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode install DRLDocs.tar.gz

# echo "***************** Install IGCAdmin chaincode ***************"
# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode install IGCAdmin.tar.gz

# echo "***************** Install License chaincode ***************"
# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode install License.tar.gz

echo "***************** Install Organization chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
peer lifecycle chaincode install Organization.tar.gz

# echo "***************** Install OrgAdmin chaincode ***************"
# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode install OrgAdmin.tar.gz

# echo "***************** Install Users chaincode ***************"
# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode install Users.tar.gz

# echo "***************** Install Userprofile chaincode ***************"
# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/users/Admin@org2.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org2.drlnet.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt 
# peer lifecycle chaincode install Userprofile.tar.gz

