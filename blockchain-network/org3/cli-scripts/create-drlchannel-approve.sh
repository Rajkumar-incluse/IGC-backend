#!/bin/bash
            
echo "***************** queryinstalled dpr chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/dpr_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg dpr chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name dpr --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
echo "***************** checkCommitReadiness dpr chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name dpr --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"

echo "***************** queryinstalled CCDR chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/CCDR_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg CCDR chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name CCDR --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
echo "***************** checkCommitReadiness CCDR chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name CCDR --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"

# echo "***************** queryinstalled activeCCDR chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode queryinstalled >&log.txt
#                     { set +x; } 2>/dev/null
#                     cat log.txt
#                     PACKAGE_ID=$(sed -n "/activeCCDR_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
# echo "***************** ApproveforMyOrg activeCCDR chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name activeCCDR --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** checkCommitReadiness activeCCDR chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name activeCCDR --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** queryinstalled passiveCCDR chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode queryinstalled >&log.txt
#                     { set +x; } 2>/dev/null
#                     cat log.txt
#                     PACKAGE_ID=$(sed -n "/passiveCCDR_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
# echo "***************** ApproveforMyOrg passiveCCDR chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name passiveCCDR --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** checkCommitReadiness passiveCCDR chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name passiveCCDR --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** queryinstalled documents chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode queryinstalled >&log.txt
#                     { set +x; } 2>/dev/null
#                     cat log.txt
#                     PACKAGE_ID=$(sed -n "/documents_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
# echo "***************** ApproveforMyOrg documents chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name documents --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** checkCommitReadiness documents chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name documents --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** queryinstalled DRLDocs chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode queryinstalled >&log.txt
#                     { set +x; } 2>/dev/null
#                     cat log.txt
#                     PACKAGE_ID=$(sed -n "/DRLDocs_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
# echo "***************** ApproveforMyOrg DRLDocs chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name DRLDocs --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** checkCommitReadiness DRLDocs chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name DRLDocs --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** queryinstalled IGCAdmin chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode queryinstalled >&log.txt
#                     { set +x; } 2>/dev/null
#                     cat log.txt
#                     PACKAGE_ID=$(sed -n "/IGCAdmin_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
# echo "***************** ApproveforMyOrg IGCAdmin chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name IGCAdmin --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** checkCommitReadiness IGCAdmin chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name IGCAdmin --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** queryinstalled License chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode queryinstalled >&log.txt
#                     { set +x; } 2>/dev/null
#                     cat log.txt
#                     PACKAGE_ID=$(sed -n "/License_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
# echo "***************** ApproveforMyOrg License chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name License --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** checkCommitReadiness License chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name License --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
echo "***************** queryinstalled Organization chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/Organization_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg Organization chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name Organization --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
echo "***************** checkCommitReadiness Organization chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name Organization --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** queryinstalled OrgAdmin chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode queryinstalled >&log.txt
#                     { set +x; } 2>/dev/null
#                     cat log.txt
#                     PACKAGE_ID=$(sed -n "/OrgAdmin_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
# echo "***************** ApproveforMyOrg OrgAdmin chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name OrgAdmin --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** checkCommitReadiness OrgAdmin chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name OrgAdmin --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** queryinstalled Users chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode queryinstalled >&log.txt
#                     { set +x; } 2>/dev/null
#                     cat log.txt
#                     PACKAGE_ID=$(sed -n "/Users_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
# echo "***************** ApproveforMyOrg Users chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name Users --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** checkCommitReadiness Users chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name Users --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** queryinstalled Userprofile chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode queryinstalled >&log.txt
#                     { set +x; } 2>/dev/null
#                     cat log.txt
#                     PACKAGE_ID=$(sed -n "/Userprofile_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
# echo "***************** ApproveforMyOrg Userprofile chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode approveformyorg -o orderer1.orderer.drlnet.com:7050 --ordererTLSHostnameOverride orderer1.orderer.drlnet.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.drlnet.com-cert.pem --channelID drlchannel --name Userprofile --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
# echo "***************** checkCommitReadiness Userprofile chaincode ***************"
#                     CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/users/Admin@org3.drlnet.com/msp CORE_PEER_ADDRESS=peer0.org3.drlnet.com:7051 CORE_PEER_LOCALMSPID="org3MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.drlnet.com/peers/peer0.org3.drlnet.com/tls/ca.crt 
#                     peer lifecycle chaincode checkcommitreadiness --channelID drlchannel --name Userprofile --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
