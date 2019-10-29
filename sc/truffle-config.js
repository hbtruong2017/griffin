module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    // development: {
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
