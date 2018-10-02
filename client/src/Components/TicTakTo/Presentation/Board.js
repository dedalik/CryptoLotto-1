import React, { Fragment } from 'react'
import './Presentation.css'
import Square from './Square'

class Board extends React.Component {
	state = {
		xIsNext: true,
		player1Turn: true,
		squares: Array(9).fill(null)
	}

	renderSquare = i =>
		<Square
			value={this.state.squares[i]}
			onClick={() => this.handleClick(i)}
		/>

	handleClick = async i => {
		const { TicTakTo } = this.props

		const changeState = () =>
			this.setState({
				xIsNext: !this.state.xIsNext,
				player1Turn: !this.state.player1Turn
			})

		TicTakTo.methods.move(i, this.state.player1Turn ? 1 : 2).send()
			.then(changeState)

		// const squares = this.state.squares.slice()
		// if (this.calculateWinner(squares) || squares[i]) {
		// 	return
		// }
		// squares[i] = this.state.xIsNext ? 'X' : 'O'
		// this.setState({
		// 	squares: squares,
		// 	xIsNext: !this.state.xIsNext,
		// })
	}

	calculateWinner = (squares) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i]
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a]
			}
		}
		return null
	}

	render() {
		const winner = this.calculateWinner(this.state.squares)
		let status
		if (winner) {
			status = 'Winner: ' + winner
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
		}

		return (
			<Fragment>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</Fragment>
		)
	}
}

export default Board