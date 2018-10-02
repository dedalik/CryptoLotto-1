import React, { PureComponent } from 'react'

class AddressesInLottoContainer extends PureComponent {
	state = {
		addressesInLotto: [],
		latestTransactionHash: null,
		PresenationComponet: null,
		selectedAccount: this.props.accounts[0]
	}

	componentDidMount() {
		Promise.all([
			this.getAddressesInLotto(),
		]).then(this.importAndMountComponents)
	}

	getAddressesInLotto = async () => {
		const { CryptoLotto } = this.props.drizzle.contracts
		const addressesInLottoLength = await CryptoLotto.methods.getLotteryContestantsAddressesLength().call()

		const addressesInLotto = []

		for (let i = 0; addressesInLottoLength > i; i++) {
			const address = await CryptoLotto.methods.getLotteryContestantAddress(i).call()
			addressesInLotto.push(address)
		}

		this.setState({ addressesInLotto })
	}

	importAndMountComponents = () => {
		import(`../Presentation/`)
			.then(res => this.setState({ PresenationComponet: res.default }))
	}

	handleChange = e => this.setState({ selectedAccount: e.target.value })


	handleClick = () => {
		const { CryptoLotto } = this.props.drizzle.contracts

		const latestTransactionHash = CryptoLotto.methods.createLotteryContestant.cacheSend({
			from: this.state.selectedAccount
		})

		this.setState({
			latestTransactionHash,
			addressesInLotto: [
				...this.state.addressesInLotto,
				this.state.selectedAccount
			]
		})
	}

	getTransactionStatus = () => {
		const { transactions, transactionStack } = this.props.drizzleState
		const transactionHash = transactionStack[this.state.latestTransactionHash]
		return !transactionHash ? null : `Transaction status: ${transactions[transactionHash].status}`
	}

	render() {
		const {
			addressesInLotto,
			PresenationComponet
		} = this.state

		if (!PresenationComponet) return `Loading...`

		const {
			handleClick,
			handleChange,
			getTransactionStatus
		} = this
		const { accounts } = this.props

		return (
			<PresenationComponet
				{...{
					accounts,
					handleClick,
					handleChange,
					addressesInLotto,
					getTransactionStatus
				}}
			/>
		)
	}
}

export default AddressesInLottoContainer