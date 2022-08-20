const { buildCCPOrg1, buildCCPOrg2, buildCCPOrg3, buildCCPOrg4, buildCCPOrg5 } = require("./AppUtils");

const path = require('path');

exports.getCCP = (org) => {
    let ccp;
    switch (org) {
        case 1:
            ccp = buildCCPOrg1();
            break;
        case 2:
            ccp = buildCCPOrg2();
            break;
        case 3:
            ccp = buildCCPOrg3();
            break;
        case 4:
            ccp = buildCCPOrg4();
            break;
        case 5:
            ccp = buildCCPOrg5();
            break;
    }
    return ccp;
}

exports.getWallets = (org) => {
    let wallet;
    switch (org) {
        case 1:
            wallet = path.join(__dirname, '../wallets', "org1wallet")
            break;
        case 2:
            wallet = path.join(__dirname, '../wallets', "org2wallet")
            break;
        case 3:
            wallet = path.join(__dirname, '../wallets', "org3wallet")
            break;
        case 4:
            wallet = path.join(__dirname, '../wallets', "org4wallet")
            break;
        case 5:
            wallet = path.join(__dirname, '../wallets', "org5wallet")
            break;
    }
    console.log("wallet value is", wallet)
    return wallet;
}

exports.getCredentials = async (org) => {
    var adminid;
    var adminpwd;
    switch (org) {
        case 1:
            adminid = 'drlnetorg1';
            adminpwd = 'IGCnetqork';
            break;
        case 2:
            adminid = 'drlnetorg2';
            adminpwd = 'IGCnetwwork';
            break;
        case 3:
            adminid = 'drlnetorg3';
            adminpwd = 'IGCnetwork';
            break;
        case 4:
            adminid = 'drlnetorg4';
            adminpwd = 'IGCnetwork';
            break;
        case 5:
            adminid = 'drlnetorg5';
            adminpwd = 'IGCnetwork';
            break;
    }
    console.log("adminid, adminpwd", adminid, adminpwd)
    return [adminid, adminpwd];
}
