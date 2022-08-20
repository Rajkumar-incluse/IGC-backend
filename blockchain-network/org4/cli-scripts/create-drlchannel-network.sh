#!/bin/bash
echo "***************** Fetch Channel Block ***************"
peer channel fetch 0 drlchannel.block -c drlchannel -o orderer1.orderer.drlnet.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem


echo "***************** peer0 - Join drlchannel Channel ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.drlnet.com/users/Admin@org4.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org4.drlnet.com:7051 CORE_PEER_LOCALMSPID="org4MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.drlnet.com/peers/peer0.org4.drlnet.com/tls/ca.crt 
peer channel join -b drlchannel.block


echo "***************** Update Anchor Peer ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.drlnet.com/users/Admin@org4.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org4.drlnet.com:7051 CORE_PEER_LOCALMSPID="org4MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.drlnet.com/peers/peer0.org4.drlnet.com/tls/ca.crt 
peer channel update -o orderer1.orderer.drlnet.com:7050 -c drlchannel -f ./channel/drlchannelorg4AnchorPeer.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem


echo "***************** peer1 - Join drlchannel Channel ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.drlnet.com/users/Admin@org4.drlnet.com/msp CORE_PEER_ADDRESS=peer1.org4.drlnet.com:7051 CORE_PEER_LOCALMSPID="org4MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.drlnet.com/peers/peer1.org4.drlnet.com/tls/ca.crt 
peer channel join -b drlchannel.block


