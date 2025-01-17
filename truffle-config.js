const PrivateKeyProvider = require("@truffle/hdwallet-provider");
const privateKey =
  "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";
const privateKeyProvider = new PrivateKeyProvider(
  privateKey,
  "http://127.0.0.1:8545"
);
module.exports = {
  networks: {
    besu: {
      provider: privateKeyProvider,
      network_id: "*", // Besu's network ID
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Match the version used in your contract
    },
  },
};
