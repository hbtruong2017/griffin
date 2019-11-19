// const HDWalletProvider = require("@truffle/hdwallet-provider");
// const mnemonic = "you infant language snow cake unfold kitten affair wave mad stick beef";
module.exports = {
  networks: {
    // develop: {
    //   host: "127.0.0.1",
    //   port: 8545,
    //   network_id: "*" // Match any network id
    // },
    // develop: {
    //   port: 8545
    // },
    ganache: {
      host: "localhost",
      port: 7545, // By default Ganache runs on this port.
      network_id: "*" // network_id for ganache is 5777. However, by keeping * as value you can run this node on any network
    }
  }
};

// module.exports = {
//   networks: {
//     ropsten: {
//       provider: function() {
//         return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/f12b444facb442189c55fcbe67496e15")
//       },
//       network_id: 3
//     }   
//   }
// };

