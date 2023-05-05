const { ethers } = require('ethers');
const cashCrowTokenABI = require('../CashCrow/build/contracts/CashCrowToken.json').abi;
const wasteManagementABI = require('../CashCrow/build/contracts/WasteManagement.json').abi;

// Initialize the provider with Infura for the Ethereum mainnet
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/60caa98622064bbbaf5be8824365af82");


// Initialize the signer for the contract interactions
const privateKey = "77976d93d94722613eeff3faa02b3e7703ebf4185f173af5a37a7ff71011c83b"; // Replace with your private key
const signer = new ethers.Wallet(privateKey, provider.getSigner());

// Initialize the CashCrowToken and WasteManagement contract instances
const cashCrowTokenAddress = "0xAd26c2a8d97Ee42aA72e8CcE72a5DbC65d6889f9";
const cashCrowToken = new ethers.Contract(cashCrowTokenAddress, cashCrowTokenABI, provider.getSigner());
const wasteManagementAddress = "0x7f0c598EFF7bb455Aa538AEc5A5A461CB5360BC3";
const wasteManagement = new ethers.Contract(wasteManagementAddress, wasteManagementABI, provider.getSigner());

const app = express();
app.use(express.json());

// Endpoint for getting the balance of a specific address


// Endpoint for getting the balance of a specific address in CashCrowToken
app.get('/balance/:address', async (req, res) => {
  const address = req.params.address;
  const balance = await cashCrowToken.balanceOf(address);
  res.send(`Balance of ${address}: ${balance}`);
});

// Endpoint for transferring tokens
app.post('/transfer', async (req, res) => {
  const fromAddress = req.body.fromAddress;
  const toAddress = req.body.toAddress;
  const amount = req.body.amount;
  const tx = await cashCrowToken.transfer(toAddress, amount).then((tx) => tx.wait());
  res.send(`Transaction hash: ${tx.transactionHash}`);
});

// Endpoint for disposing plastic bottles
app.post('/dispose/plastic-bottle', async (req, res) => {
  const fromAddress = req.body.fromAddress;
  const tx = await wasteManagement.disposePlasticBottle().then((tx) => tx.wait());
  res.send(`Transaction hash: ${tx.transactionHash}`);
});

// Endpoint for disposing other waste
app.post('/dispose/other-waste', async (req, res) => {
  const fromAddress = req.body.fromAddress;
  const tx = await wasteManagement.disposeOtherWaste().then((tx) => tx.wait());
  res.send(`Transaction hash: ${tx.transactionHash}`);
});

// Endpoint for exchanging points for tokens
app.post('/exchange-points', async (req, res) => {
  const fromAddress = req.body.fromAddress;
  const tx = await wasteManagement.exchangePointsForTokens().then((tx) => tx.wait());
  res.send(`Transaction hash: ${tx.transactionHash}`);
});

  app.listen(3006, () => {
    console.log('Server running on port 3006');
  });