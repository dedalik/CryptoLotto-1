import React, { Component } from 'react'

class App extends Component {
  state = {
    accounts: [],
    drizzleState: null,
    PresenationComponet: null
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
    import(`./Components/AddressesInLotto/Container`)
      .then(res => this.setState({ PresenationComponet: res.default }))
  }

  render() {
    const {
      accounts,
      drizzleState,
      PresenationComponet
    } = this.state

    if (!PresenationComponet || !drizzleState || !accounts.length) return "Loading..."
    const { drizzle } = this.props

    return (
      <PresenationComponet
        {...{
          drizzle,
          accounts,
          drizzleState
        }}
      />
    )
  }
}

export default App
