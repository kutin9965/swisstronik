import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

require('dotenv').config();

module.exports = {
  
  solidity: {
    version: "0.8.20", 
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: [process.env.PRIVATE_KEY_8888 || ""]
    }, 
  },

  etherscan: {
    apiKey:{
      swisstronik:"ANY_STRING_WILL_DO"
    },
    customChains: [
      {
        network: "swisstronik",
        chainId: 1291,
        urls: {
          apiURL: "https://explorer-evm.testnet.swisstronik.com/api",
          browserURL: "https://explorer-evm.testnet.swisstronik.com",
        },
      },
    ],
  },

  sourcify: {
    enabled: false,
  }

};

