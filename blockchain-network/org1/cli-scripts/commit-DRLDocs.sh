#!/bin/bash
                  echo "***************** Commit DRLDocs Chaincode  ***************"
                  CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.drlnet.com/users/Admin@org1.drlnet.com/msp CORE_PEER_ADDRESS=peer1.org1.drlnet.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.drlnet.com/peers/peer1.org1.drlnet.com/tls/ca.crt 
                  peer lifecycle chaincode commit -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name DRLDocs  --version 1.0 --sequence 1     --peerAddresses peer0.org1.drlnet.com:7051 --peerAddresses peer0.org2.drlnet.com:7051 --peerAddresses peer0.org3.drlnet.com:7051 --peerAddresses peer0.org4.drlnet.com:7051 --peerAddresses peer0.org5.drlnet.com:7051  --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.drlnet.com/peers/peer0.org1.drlnet.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.drlnet.com/peers/peer0.org2.drlnet.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.drlnet.com/peers/peer0.org4.drlnet.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.drlnet.com/peers/peer0.org5.drlnet.com/tls/ca.crt --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                  
