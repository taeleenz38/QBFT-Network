const Storage = artifacts.require("Storage");

module.exports = async function (deployer) {
  console.log("Starting deployment...");
  await deployer.deploy(Storage);
  console.log("Storage deployed!");
};
