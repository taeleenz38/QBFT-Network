const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKey =
  "0xd26c3216e84cb33889546b471ed4a8639eac044512cd16149798f3688e7849b5"; // Replace with your private key (do NOT expose this in production)

module.exports = {
  networks: {
    besu: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [privateKey], // Provide the private key as an array
          providerOrUrl: "http://127.0.0.1:8545", // Besu RPC endpoint
        }),
      network_id: 1337, // Besu's network ID
      gas: 4500000, // Adjust based on your network's gas limit
      gasPrice: 0, // Besu often uses zero gas price
      from: "0x43dc4454bf4714517d0b5f0633bdfbf2484028c6",
    },
  },
  compilers: {
    solc: {
      version: "0.8.21", // Match the version used in your contract
    },
  },
};
