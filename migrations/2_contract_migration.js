const ContractMigration = artifacts.require("./ZombieOwnership.sol");

module.exports = function (deployer) {
  deployer.deploy(ContractMigration);
};
