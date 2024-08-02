const hre = require("hardhat");


async function main() {
    const [deployer] = await hre.ethers.getSigners();
    
    console.log(`Deploying contracts with the account: ${deployer.address}`);

    const contract = await hre.ethers.deployContract("TestToken");

    await contract.waitForDeployment();

    console.log(`Swisstronik contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});