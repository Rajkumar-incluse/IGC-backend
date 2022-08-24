#!/bin/bash




echo "Deleting exisiting container"
docker rm -f $(docker ps -aq)

echo "Deleting existing networks"
docker network prune

echo "Deleting existing volume"
docker volume rm $(docker volume ls)

# Exit on any failure
set -e

echo "Executing orderer"
cd ./orderer
sh ./start_container.sh

cd ../org1
echo "Executing org 1"
sh ./start_container.sh

cd ../org2
echo "Executing org 2"
sh ./start_container.sh

cd ../org3
echo "Executing org 3"
sh ./start_container.sh

cd ../org4
echo "Executing org 4"
sh ./start_container.sh

cd ../org5
echo "Executing org 5"
sh ./start_container.sh

cd ../org1
sh ./packintall_chaincode.sh

cd ../org2
sh ./packintall_chaincode.sh

cd ../org3
sh ./packintall_chaincode.sh

cd ../org4
sh ./packintall_chaincode.sh

cd ../org5
sh ./packintall_chaincode.sh

cd ../org1
sh ./approve_chaincode.sh

sleep 1

cd ../org2
sh ./approve_chaincode.sh

sleep 1

cd ../org3
sh ./approve_chaincode.sh

sleep 1

cd ../org4
sh ./approve_chaincode.sh

sleep 1

cd ../org5
sh ./approve_chaincode.sh

sleep 1

echo "Commiting org 1"
cd ../org1
sh commit_chaincode.sh

echo "Clean exit"
