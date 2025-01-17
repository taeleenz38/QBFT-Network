
const Storage = artifacts.require("Storage");

module.exports = async function (deployer) {
  // Estimate gas
  const gasEstimate = await web3.eth.estimateGas({
    data: Storage.bytecode,
  });
  console.log("Gas Estimate:", gasEstimate);

  // Deploy the contract
  await deployer.deploy(Storage, { gas: gasEstimate });
};
