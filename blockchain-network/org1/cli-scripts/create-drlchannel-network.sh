#!/bin/bash
echo "***************** Create drlchannel Channel ***************"
peer channel create -c drlchannel -o orderer1.orderer.drlnet.com:7050 -f ./channel/drlchannel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem


echo "***************** peer0 - Join drlchannel Channel ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.drlnet.com/users/Admin@org1.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org1.drlnet.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.drlnet.com/peers/peer0.org1.drlnet.com/tls/ca.crt 
peer channel join -b drlchannel.block


echo "***************** Update Anchor Peer ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.drlnet.com/users/Admin@org1.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org1.drlnet.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.drlnet.com/peers/peer0.org1.drlnet.com/tls/ca.crt 
peer channel update -o orderer1.orderer.drlnet.com:7050 -c drlchannel -f ./channel/drlchannelorg1AnchorPeer.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem


echo "***************** peer1 - Join drlchannel Channel ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.drlnet.com/users/Admin@org1.drlnet.com/msp CORE_PEER_ADDRESS=peer1.org1.drlnet.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.drlnet.com/peers/peer1.org1.drlnet.com/tls/ca.crt 
peer channel join -b drlchannel.block


