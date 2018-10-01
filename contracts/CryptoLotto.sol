pragma solidity ^0.4.24;

contract CryptoLotto {
    struct LotteryContestant {
        address lotteryContestantAddress;
        bool doesExist;
    }
    
    LotteryContestant[] public lotteryContestants;
    mapping (address => LotteryContestant) LotteryContestantsMap;
    
    modifier onlyNewContestant {
        require(
            !LotteryContestantsMap[msg.sender].doesExist, 
            "This address is already submitted in the lottery"
        );
        _;
    }
    
    function addLotteryContestant() public {
        address _lotteryContestantAddress = msg.sender;
        bool _doesExist = true;
        uint index = lotteryContestants.push(LotteryContestant(_lotteryContestantAddress, _doesExist)) - 1;
        LotteryContestantsMap[msg.sender] = lotteryContestants[index];
    }

    function getLotteryContestantsLength() public view returns (uint) {
        return lotteryContestants.length;
    }

    function getLotteryContestantAddress(uint i) public view returns (address) {
        return lotteryContestants[i].lotteryContestantAddress;
    }
}