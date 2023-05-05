const Koa = require('koa');
const Router = require('koa-router');
const Web3 = require('web3');
const CashCrowToken = require('CashCrowToken.json');
const WasteManagement = require('WasteManagement.json');


const app = new Koa();
const router = new Router();
const web3 = new Web3('http://127.0.0.1:7545'); // connect to local Ganache instance

const cashCrowToken = new web3.eth.Contract(
  CashCrowToken.abi,
  '0xAd26c2a8d97Ee42aA72e8CcE72a5DbC65d6889f9', // replace with your deployed contract address
);

const wasteManagement = new web3.eth.Contract(
  WasteManagement.abi,
  '0x7f0c598EFF7bb455Aa538AEc5A5A461CB5360BC3', // replace with your deployed contract address
);

router.get('/points', async (ctx) => {
  const balance = await cashCrowToken.methods.balanceOf(ctx.request.query.address).call();
  const points = await wasteManagement.methods.points(ctx.request.query.address).call();
  ctx.response.body = { balance, points };
});

router.post('/dispose/plastic', async (ctx) => {
  await wasteManagement.methods.disposePlasticBottle().send({ from: ctx.request.body.address });
  ctx.response.body = 'OK';
});

router.post('/dispose/other', async (ctx) => {
  await wasteManagement.methods.disposeOtherWaste().send({ from: ctx.request.body.address });
  ctx.response.body = 'OK';
});

router.post('/exchange', async (ctx) => {
  const points = await wasteManagement.methods.points(ctx.request.body.address).call();
  if (points < WasteManagement.pointsPerToken) {
    ctx.response.status = 400;
    ctx.response.body = 'Not enough points to exchange for tokens';
    return;
  }
  const tokensToTransfer = Math.floor(points / WasteManagement.pointsPerToken);
  await wasteManagement.methods.exchangePointsForTokens().send({ from: ctx.request.body.address });
  await cashCrowToken.methods.transfer(ctx.request.body.address, tokensToTransfer).send({ from: ctx.request.body.address });
  ctx.response.body = 'OK';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3004, async () => {
  await web3.eth.net.isListening();
  console.log('Server started on port 3004');
});
