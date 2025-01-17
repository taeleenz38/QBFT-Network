import Web3 from "web3";
import fs from "fs";
import path from "path";
import { Transaction as Tx } from "ethereumjs-tx"; // Correct import
import { fileURLToPath } from "url"; // For working with file paths in ES modules
import { dirname } from "path"; // For getting the directory name

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Web3 connection details
const host = "http://127.0.0.1:8545"; // Replace with your host URL
const web3 = new Web3(host);

// Private key and account setup
const privateKey =
  "0xd26c3216e84cb33889546b471ed4a8639eac044512cd16149798f3688e7849b5"; // Example private key
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// Read the contract ABI and bytecode
const contractJsonPath = path.resolve(
  __dirname,
  "../contracts/SimpleStorage.json"
);
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
const contractAbi = contractJson.abi;
const contractBinPath = path.resolve(
  __dirname,
  "../contracts/SimpleStorage.bin"
);
const contractBin = fs.readFileSync(contractBinPath);

// Initialize the contract constructor with a value `47 = 0x2F` appended to the bytecode
const contractConstructorInit =
  "000000000000000000000000000000000000000000000000000000000000002F"; // Example initialization value

// Get the transaction count (nonce) for the sender's address
const txnCount = await web3.eth.getTransactionCount(account.address);

// Prepare the raw transaction options
const rawTxOptions = {
  nonce: web3.utils.numberToHex(txnCount),
  from: account.address,
  to: null, // Null indicates it's a contract deployment
  value: "0x00",
  data: "0x" + contractBin.toString("hex") + contractConstructorInit, // Contract binary + constructor data
  gasPrice: "0x0", // Gas price set to 0 for local testing
  gasLimit: "0x1000000", // Gas limit for the transaction
};

console.log("Creating transaction...");

// Convert the private key to a Uint8Array (32 bytes)
const privateKeyBuffer = Buffer.from(privateKey.slice(2), "hex"); // Remove "0x" and convert to Buffer
const privateKeyUint8Array = new Uint8Array(privateKeyBuffer);

// Create the transaction using the Tx class from ethereumjs-tx
const tx = new Tx(rawTxOptions);

console.log("Signing transaction...");
tx.sign(privateKeyUint8Array); // Use the Uint8Array private key for signing

console.log("Sending transaction...");
const serializedTx = tx.serialize();

// Send the signed transaction
const pTx = await web3.eth.sendSignedTransaction(
  "0x" + serializedTx.toString("hex")
);

console.log("tx transactionHash: " + pTx.transactionHash);
console.log("tx contractAddress: " + pTx.contractAddress);

// Fetch the transaction receipt for more details on the transaction
const receipt = await web3.eth.getTransactionReceipt(pTx.transactionHash);
console.log("Transaction Receipt: ", receipt);

// If the receipt indicates an error, it might show logs or additional details
if (receipt.status === false) {
  console.error('Transaction failed with status: false');
  console.log('Logs:', receipt.logs); // Check logs for more info
}
