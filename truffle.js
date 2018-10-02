// const HDWalletProvider = require(`truffle-hdwallet-provider`)

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
    // ropsten: {
    //   provider: () => {
    //     return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/d142b386ef664db48c54eef8b5f2d624`)
    //   },
    //   network_id: 3,
    //   gas: 100500,
    //   gasPrice: 200000000000,
    //   from: `0x97b1f9bb0e667df623e9783b57b274030326e8e5`
    //   network_id: 3,
    //   host: "localhost",
    //   port:  8545,
    //   gas:   4698712,
    //   gasPrice:   65000000000,
    //   from: '0x97b1f9bb0e667df623e9783b57b274030326e8e5'
    // }
  }
}