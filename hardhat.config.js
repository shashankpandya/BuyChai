require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const PRIVATE_KEY2 = process.env.PRIVATE_KEY2;

// This is a sample Hardhat config, you can customize it to fit your needs.
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};




// require("@nomiclabs/hardhat-ethers");
// require("dotenv").config(); // Load the environment variables

// module.exports = {
//   defaultNetwork: "sepolia", // You can change this to "mainnet" or other testnets
//   networks: {
//     hardhat: {}, // Local development network (optional)
//     sepolia: {
//       url:
//         process.env.SEPOLIA_URL ||
//         "https://eth-sepolia.alchemyapi.io/v2/your_alchemy_api_key", // Alchemy URL for Sepolia
//       accounts: [`0x${process.env.PRIVATE_KEY}`], // Use the private key from .env
//     },
//     mainnet: {
//       url:
//         process.env.SEPOLIA_API_KEY ||
//         "https://mainnet.infura.io/v3/your_infura_project_id", // Infura URL for Ethereum mainnet
//       accounts: [`0x${process.env.PRIVATE_KEY}`], // Use the private key from .env
//     },
//     // Add other networks like Rinkeby, Goerli, etc., if needed
//   },
//   solidity: {
//     version: "0.8.17", // Ensure this matches your contract version
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },
// };
