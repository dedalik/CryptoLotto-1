const TicTakTo = artifacts.require(`TicTakTo`)
const CryptoLotto = artifacts.require(`CryptoLotto`)

module.exports = deployer => {
    deployer.deploy(TicTakTo)
    deployer.deploy(CryptoLotto)
}