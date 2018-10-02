import React, { Component, Fragment } from 'react'

class App extends Component {
  state = {
    accounts: [],
    drizzleState: null,
    TicTakToPresentation: null,
    CryptoLottoPresentation: null
  }

  componentDidMount() {
    Promise.all([
      this.subscribeToDrizzleStore()
    ]).then(this.importAndMountComponents)
  }

  compomentWillUnmount() {
    this.unsubscribe()
  }

  subscribeToDrizzleStore() {
    const { drizzle } = this.props

    /* Subscribe to changes in the store */
    this.unsubscribe = drizzle.store.subscribe(() => {

      /* Every time the store updates, grab the state from drizzle */
      const drizzleState = drizzle.store.getState()

      /* Check to see if it's ready, if so, update local component state */
      if (drizzleState.drizzleStatus.initialized) {
        const promises = [
          this.setState({ drizzleState })
        ]

        if (!this.state.accounts.length) {
          promises.push(this.getAccounts())
        }


        Promise.all(promises)
      }
    })
  }

  getAccounts() {
    this.props.drizzle.web3.eth.getAccounts()
      .then(accounts => this.setState({ accounts }))
  }

  importAndMountComponents = () => {
    Promise.all([
      import(`./Components/TicTakTo/Container/`),
      import(`./Components/AddressesInLotto/Container/`)
    ])
      .then(res =>
        this.setState({
          TicTakToPresentation: res[0].default,
          CryptoLottoPresentation: res[1].default
        })
      )
  }

  render() {
    const {
      accounts,
      drizzleState,
      TicTakToPresentation,
      CryptoLottoPresentation
    } = this.state

    if (!CryptoLottoPresentation || !drizzleState || !accounts.length || !TicTakToPresentation) return "Loading..."
    const { drizzle } = this.props

    return (
      <Fragment>
        <CryptoLottoPresentation
          {...{
            drizzle,
            accounts,
            drizzleState
          }}
        />

        <br /> <br />

        <TicTakToPresentation
          {...{
            drizzle,
            accounts,
            drizzleState
          }}
        />
      </Fragment>
    )
  }
}

export default App
