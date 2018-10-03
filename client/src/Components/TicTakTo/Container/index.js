import React, { PureComponent } from 'react'

class TikTakToContainer extends PureComponent {
	state = {
		player1Moves: {},
		player2Moves: {},
		winningPlayer: null,
		/* Component */
		PresentationComponent: null,
		/* Data keys */
		getMovesDataKeys: {},
		isPlayerOneTurnsDataKey: null,
		getGameInProgressDataKey: null,
	}

	componentDidMount() {
		Promise.all([
			this.cacheDataKeys(),
			this.listenToWinnerEvent(),
			this.listenToNewMoveEvent()
		]).then(this.importAndMountComponents())
	}

	cacheDataKeys() {
		const { TicTakTo } = this.props.drizzle.contracts

		const getGameInProgressDataKey = TicTakTo.methods.gameInProgress.cacheCall()
		const isPlayerOneTurnsDataKey = TicTakTo.methods.isPlayerOnesTurn.cacheCall()
		const getMovesDataKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8]
			.reduce((obj, cur) => {
				obj[cur] = TicTakTo.methods.getMove.cacheCall(cur)
				return obj
			}, {})

		this.setState({
			getMovesDataKeys,
			isPlayerOneTurnsDataKey,
			getGameInProgressDataKey
		})
	}

	listenToNewMoveEvent = () => {
		const { TicTakTo } = this.props.drizzle.contracts
		TicTakTo.events.NewMove(
			(res, { returnValues }) => {
				const move = +returnValues.move
				const playerNum = returnValues.player

				this.setState({
					[`player${playerNum}Moves`]: {
						...this.state[`player${playerNum}Moves`],
						[move]: true
					}
				})
			}
		)
	}

	listenToWinnerEvent = () => {
		const { TicTakTo } = this.props.drizzle.contracts
		TicTakTo.events.Winner(
			(res, { returnValues }) => {
				const winningPlayer = +returnValues.player
				this.setState({ winningPlayer })
			}
		)
	}

	importAndMountComponents = () => {
		import(`../Presentation/`)
			.then(res => this.setState({ PresentationComponent: res.default }))
	}

	getPlayerMoves = async () => {
		const { getMovesDataKeys } = this.state
		const { TicTakTo } = this.props.drizzleState.contracts

		const player1Moves = {}
		const player2Moves = {}

		for (const place in getMovesDataKeys) {
			const playerOccupyingSquare = +TicTakTo.getMove[getMovesDataKeys[place]].value

			if (playerOccupyingSquare === 1) {
				player1Moves[place] = true
			} else if (playerOccupyingSquare === 2) {
				player2Moves[place] = true
			}
		}

		this.setState({
			player1Moves,
			player2Moves
		})
	}

	startGame = () => {
		const { TicTakTo } = this.props.drizzle.contracts
		TicTakTo.methods.startGame.cacheSend()

		this.setState({
			player1Moves: {},
			player2Moves: {},
			winningPlayer: null
		})
	}

	render() {
		const {
			player1Moves,
			player2Moves,
			winningPlayer,
			/* Component */
			PresentationComponent,
			/* Data Keys */
			isPlayerOneTurnsDataKey,
			getGameInProgressDataKey,
		} = this.state

		if (!PresentationComponent) {
			return `Loading tic-tak-to`
		}

		const { TicTakTo } = this.props.drizzleState.contracts
		const gameInProgress = TicTakTo.gameInProgress[getGameInProgressDataKey]
		const isPlayerOnesTurn = TicTakTo.isPlayerOnesTurn[isPlayerOneTurnsDataKey]

		/* Takes a moment for isPlayerOnesTurn and gameInProgress to be accessed sometimes */
		if (!isPlayerOnesTurn || !gameInProgress) return null

		const {
			startGame,
			getPlayerMoves
		} = this

		return (
			<PresentationComponent
				{...{
					startGame,
					player1Moves,
					player2Moves,
					winningPlayer,
					getPlayerMoves,
					gameInProgress,
					isPlayerOnesTurn,
					TicTakTo: this.props.drizzle.contracts.TicTakTo,
				}}
			/>
		)
	}
}

export default TikTakToContainer