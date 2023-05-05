const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/60caa98622064bbbaf5be8824365af82nod");
module.exports = provider;
