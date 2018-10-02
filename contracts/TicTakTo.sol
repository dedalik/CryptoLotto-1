pragma solidity ^0.4.24;

contract TicTakTo {
    uint8 playerOne = 1;
    uint8 playerTwo = 2;
    mapping (uint8 => bool) moveMapper;
    mapping (uint8 => uint8[]) public playerMoveMapper;
    
    uint[][] winStates = [
        [0,1,2],[3,4,5],[6,7,8], 
        [0,3,6],[1,4,7],[2,5,8], 
        [0,4,8],[2,4,6]
    ];

    modifier legalMove(uint8 place) {
        require(
            !moveMapper[place],
            "This move has already been made"
        );
        _;
    }

    function move(uint8 place, uint8 player) public legalMove(place) {
        moveMapper[place] = true;
        playerMoveMapper[player].push(place);
    }

    function getPlayersMoveLength() public view returns (uint, uint) {
        return (
            playerMoveMapper[playerOne].length,
            playerMoveMapper[playerTwo].length
        );
    }

    function getPlayerMove(uint8 i, uint8 player) public view returns (uint8) {
        return playerMoveMapper[player][i];
    }
}