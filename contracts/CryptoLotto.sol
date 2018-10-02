pragma solidity ^0.4.24;

contract CryptoLotto {
    constructor() public {
        owner = msg.sender;
    }

    address owner;
    address[] public lotteryContestantsAddresses;
    mapping (address => uint) lotteryContestantsMap;

    modifier isOwner() {
        require(
            msg.sender == owner,
            "This address is not the owner of this contract. Therefore, this address does not have access to this function"
        );
        _;
    }
    
    modifier onlyNewContestant {
        require(
            lotteryContestantsMap[msg.sender] == 0, 
            "This address is already submitted in the lottery"
        );
        _;
    }
    
    function createLotteryContestant() public onlyNewContestant{
        uint len = lotteryContestantsAddresses.push(msg.sender);
        lotteryContestantsMap[msg.sender] = len;
    }

    function getLotteryContestantsAddressesLength() public view isOwner returns (uint) {
        return lotteryContestantsAddresses.length;
    }

    function getLotteryContestantAddress(uint i) public view isOwner returns (address) {
        return lotteryContestantsAddresses[i];
    }

    function isAddressInLottery() public view returns (bool) {
        if (lotteryContestantsMap[msg.sender] > 0) {
            return true;
        } else {
            return false;
        }
    }
}