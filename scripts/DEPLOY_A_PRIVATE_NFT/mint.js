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
  const contractAddress = "0xFba20373Af65DD64cc80d1Db4435E3Cd31f029bf";
  const [signer] = await hre.ethers.getSigners();
  console.log("Sending a shielded transaction with the signer...", signer.address);
  const contractFactory = await hre.ethers.getContractFactory("MyToken721");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "safeMint";
  const functionArgs = [signer.address];
  const transaction = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, functionArgs), 0);
  await transaction.wait();
  console.log("Transaction Receipt: ", transaction.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});