require('babel-register');
require('babel-polyfill');
var hdWalletProvider = require('truffle-hdwallet-provider')
var INFURA_API_KEY = 'https://rinkeby.infura.io/v3/e6dc59c671784525b8e292e12f66e068'
module.exports = {
  networks: {
    rinkeby: {

      provider: function () {
        new hdWalletProvider(
          MNEMONIC, INFURA_API_KEY
        )
      },
      gasPrice: 250000000,
      network_id: 3
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/ContractsBSC/',
  contracts_build_directory: './src/abis_bsc/',
  compilers: {
    solc: {
      version: "0.7.0",
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
