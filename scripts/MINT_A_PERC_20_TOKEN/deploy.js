const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying PERC20Sample with the account: ${deployer.address}`);
  const perc20 = await ethers.deployContract("PERC20Sample");
  await perc20.waitForDeployment();
  console.log(`PERC20Sample was deployed to ${perc20.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});