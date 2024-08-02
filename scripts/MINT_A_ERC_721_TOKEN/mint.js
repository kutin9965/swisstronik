// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

// Function to send a shielded transaction using the provided signer, destination, data, and value
const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link from the network configuration
  const rpcLink = hre.network.config.url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpcLink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  // Address of the deployed contract
  const contractAddress = "0x119391C215250096101a9336a2b73F0423A6a497";

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();
  console.log("Sending a shielded transaction with the signer...", signer.address);
  // Create a contract instance
  const contractFactory = await hre.ethers.getContractFactory("MyToken721");
  const contract = contractFactory.attach(contractAddress);

  // Send a shielded transaction to mint 100 tokens in the contract
  const functionName = "safeMint";
  const functionArgs = [signer.address];

  const transaction = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, functionArgs), 0);

  await transaction.wait();

  // It should return a TransactionReceipt object
  console.log("Transaction Receipt: ", transaction.hash);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});