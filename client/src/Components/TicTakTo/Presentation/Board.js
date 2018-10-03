import React, { Fragment } from 'react'
import './Presentation.css'
import Square from './Square'

const handleClick = ({ i, TicTakTo }) =>
	TicTakTo.methods.move(i).send()

const renderSquare = ({ i, player1Moves, player2Moves, TicTakTo }) => {
	let value
	if (player1Moves[i]) {
		value = `X`
	} else if (player2Moves[i]) {
		value = `O`
	} else {
		value = null
	}

	return (
		<Square
			value={value}
			onClick={() => handleClick({ i, TicTakTo })}
		/>
	)
}

const Board = props => {
	const {
		TicTakTo,
		player1Moves,
		player2Moves,
		winningPlayer,
		isPlayerOnesTurn,
	} = props

	let status
	if (winningPlayer) {
		status = `${winningPlayer === 1 ? `X` : `O`} has won. Please start a new game`
	} else {
		status = 'Next player: ' + (isPlayerOnesTurn.value ? 'X' : 'O')
	}

	return (
		<Fragment>
			<div className="status">{status}</div>
			<div className="board-row">
				{renderSquare({ i: 0, player1Moves, player2Moves, TicTakTo })}
				{renderSquare({ i: 1, player1Moves, player2Moves, TicTakTo })}
				{renderSquare({ i: 2, player1Moves, player2Moves, TicTakTo })}
			</div>
			<div className="board-row">
				{renderSquare({ i: 3, player1Moves, player2Moves, TicTakTo })}
				{renderSquare({ i: 4, player1Moves, player2Moves, TicTakTo })}
				{renderSquare({ i: 5, player1Moves, player2Moves, TicTakTo })}
			</div>
			<div className="board-row">
				{renderSquare({ i: 6, player1Moves, player2Moves, TicTakTo })}
				{renderSquare({ i: 7, player1Moves, player2Moves, TicTakTo })}
				{renderSquare({ i: 8, player1Moves, player2Moves, TicTakTo })}
			</div>
		</Fragment>
	)
}

export default Board