pragma solidity ^0.4.24;

contract TicTakTo {
    event Winner(uint8 player);
    event NewMove(uint8 move, uint8 player);

    uint8 playerOne = 1;
    uint8 playerTwo = 2;
    
    bool gameDone;
    bool public gameInProgress;
    bool public isPlayerOnesTurn;
    
    uint[] board = new uint[](9);
    uint[][] winStates = [
        [0,1,2],[3,4,5],[6,7,8], 
        [0,3,6],[1,4,7],[2,5,8], 
        [0,4,8],[2,4,6]
    ];

    modifier legalMove(uint8 place) {
        require(
            !gameDone,
            "The game is complete and no more moves can be played"
        );

        require(
            board[place] == 0,
            "This move has already been made"
        );
        
        _;
    }

    function move(uint8 place) public legalMove(place) {
        uint8 player;
        if (isPlayerOnesTurn) player = playerOne;
        else player = playerTwo;
        
        board[place] = player;
        emit NewMove(place, player);
        isPlayerOnesTurn = !isPlayerOnesTurn;
        _checkWinner(player);
    }

    function _checkWinner(uint8 player) internal {
        for (uint i = 0; i < 8; i++) {
            uint[] memory b = winStates[i];
            
            if (
                board[b[0]] != 0 && 
                board[b[0]] == board[b[1]] && 
                board[b[0]] == board[b[2]]
            ) {
                emit Winner(player);
                gameDone = true;
            } 
        }
    }

    function getMove(uint8 place) public view returns (uint) {
        return board[place];
    }

    function startGame() public {
        gameDone = false;
        gameInProgress = true;
        isPlayerOnesTurn = true;
        board = new uint[](9);
        // for (uint i = 0; i < 9; i++) {

        // }
    }
}