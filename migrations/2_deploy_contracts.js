const CashCrowToken = artifacts.require("CashCrowToken");
const WasteManagement = artifacts.require("WasteManagement");

module.exports = function(deployer) {
  deployer.deploy(CashCrowToken, 100).then(() => {
    return deployer.deploy(WasteManagement);
  });
};



