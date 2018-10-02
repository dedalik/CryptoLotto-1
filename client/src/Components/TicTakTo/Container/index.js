import React, { Component } from 'react'

class TikTakToContainer extends Component {
	state = {
		getPlayerMoveDataKey: null,
		getPlayerMovesLengthDataKey: null,
		/* Component */
		PresentationComponent: null
	}

	componentDidMount() {
		Promise.all([
			this.cacheDataKeys()
		]).then(this.importAndMountComponents())
	}

	cacheDataKeys() {
		const { TicTakTo } = this.props.drizzle.contracts
		const getPlayerMovesLengthDataKey = TicTakTo.methods.getPlayersMoveLength.cacheCall()

		this.setState({
			getPlayerMovesLengthDataKey
		})
	}

	importAndMountComponents = () => {
		import(`../Presentation/`)
			.then(res => this.setState({ PresentationComponent: res.default }))
	}

	getPlayerMoves = lengthOfPlayersMaps => {
		if (
			!lengthOfPlayersMaps ||
			(!+lengthOfPlayersMaps.value[0] && !+lengthOfPlayersMaps.value[1])
		) {
			return {
				player1Moves: [],
				player2Moves: []
			}
		}

		const { TicTakTo } = this.props.drizzle.contracts
		const player1MovesLen = +lengthOfPlayersMaps.value[0]
		const player2MovesLen = +lengthOfPlayersMaps.value[1]

		return {
			player1Moves: lengthOfPlayersMaps.value[0],
			player2Moves: lengthOfPlayersMaps.value[1]
		}
	}

	render() {
		const {
			PresentationComponent,
			getPlayerMovesLengthDataKey
		} = this.state

		if (!PresentationComponent) {
			return `Loading tic-tak-to`
		}

		const { TicTakTo } = this.props.drizzleState.contracts
		const lengthOfPlayersMaps = TicTakTo.getPlayersMoveLength[getPlayerMovesLengthDataKey]

		const {
			player1Moves,
			player2Moves
		} = this.getPlayerMoves(lengthOfPlayersMaps)

		console.log({
			player1Moves,
			player2Moves
		})

		return (
			<PresentationComponent
				{...{
					player1Moves,
					player2Moves,
					TicTakTo: this.props.drizzle.contracts.TicTakTo,
				}}
			/>
		)
	}
}

export default TikTakToContainer