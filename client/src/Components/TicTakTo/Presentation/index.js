import React, { Fragment, PureComponent } from 'react'
import './Presentation.css'
import Board from './Board'

class TicTakToPresentation extends PureComponent {
	executedcheckIfPlayerMoved = false

	componentDidMount() {
		this.checkIfPlayerMoved()
	}

	checkIfPlayerMoved = () => {
		if (!this.props.gameInProgress) return

		if (this.props.gameInProgress.value) {
			setTimeout(this.props.getPlayerMoves, 200)
		}

		this.executedcheckIfPlayerMoved = true
	}

	render() {
		const {
			TicTakTo,
			startGame,
			player1Moves,
			player2Moves,
			winningPlayer,
			gameInProgress,
			isPlayerOnesTurn
		} = this.props

		if (gameInProgress && !this.executedcheckIfPlayerMoved) {
			this.checkIfPlayerMoved()
		}

		return (
			<Fragment>
				<button onClick={startGame}>
					Start Game
				</button>

				<br /><br />

				{
					!gameInProgress.value ?
						<h3>
							<b>
								Start a game
								</b>
						</h3>
						:
						<div className="game">
							<div className="game-board">
								<Board
									{...{
										TicTakTo,
										player1Moves,
										player2Moves,
										winningPlayer,
										isPlayerOnesTurn
									}}
								/>
							</div>
							<div className="game-info">
								<div>{/* status */}</div>
								<ol>{/* TODO */}</ol>
							</div>
						</div>
				}
			</Fragment>
		)
	}
}

export default TicTakToPresentation