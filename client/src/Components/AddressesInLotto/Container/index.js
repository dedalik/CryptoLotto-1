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
		console.log(CryptoLotto)
		const addressesInLottoLength = await CryptoLotto.methods.getLotteryContestantsLength().call()

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
		const {
			selectedAccount,
			addressesInLotto
		} = this.state

		// if (addressesInLotto.includes(selectedAccount)) {
		// 	return alert(`This address is already included in the lotto. Please select another address`)
		// }

		const { CryptoLotto } = this.props.drizzle.contracts
		console.log(CryptoLotto.methods)
		console.log(CryptoLotto.methods.addLotteryContestant)

		const latestTransactionHash = CryptoLotto.methods.addLotteryContestant.cacheSend({
			from: selectedAccount
		})

		this.setState({
			latestTransactionHash,
			addressesInLotto: [
				...this.state.addressesInLotto,
				selectedAccount
			]
		})
	}

	getTransactionStatus = () => {
		const { transactions, transactionStack } = this.props.drizzleState
		const transactionHash = transactionStack[this.state.latestTransactionHash]
		console.log(transactions[transactionHash])
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