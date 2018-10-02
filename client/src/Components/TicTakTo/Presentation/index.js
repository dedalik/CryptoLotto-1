import React from 'react'
import './Presentation.css'
import Board from './Board'

const TicTakToPresentation = props => {
    const {
        TicTakTo,
        player1Moves,
        player2Moves
    } = props

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    {...{
                        TicTakTo,
                        player1Moves,
                        player2Moves,
                    }}
                />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    )
}

export default TicTakToPresentation