const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require('@swisstronik/utils')

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
  const [signer] = await hre.ethers.getSigners();
  console.log("Sending a shielded transaction with the signer...", signer.address);
  const contractAddress = "0x7AB796a322a828371c3c8Efc14E4e98c0E45Eefc";
  const replace_contractFactory = await hre.ethers.getContractFactory("PERC20Sample");
  const contract = replace_contractFactory.attach(contractAddress);
  const replace_functionName = "transfer";
  const replace_functionArgs = ["0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1", hre.ethers.parseEther("0.05")];
  const transaction = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs), 0);
  await transaction.wait();
  console.log("Transaction Response: ", transaction.hash);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});