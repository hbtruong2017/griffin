var Standard = artifacts.require("./StandardPayment.sol");

module.exports = function(deployer) {
  deployer.deploy(Standard);
};
