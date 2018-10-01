const CryptoLotto = artifacts.require(`CryptoLotto`)

module.exports = deployer => {
    deployer.deploy(CryptoLotto)
}