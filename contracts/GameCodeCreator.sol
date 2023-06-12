pragma solidity >=0.4.22 <0.9.0;
import "./GameCode.sol";

// Contract to create and manage multiple GameCode contracts
contract GameCodeCreator {
    // Array to store the addresses of all deployed GameCode contracts
    address[] public gameContracts;

    // Function to create a new GameCode contract and store its address
function createGameContract() public {
    GameCode newGameCode = new GameCode(msg.sender);
    gameContracts.push(address(newGameCode));
}


    // Function to get the deployed game contracts
    function getDeployedGameContracts() public view returns (address[] memory) {
        return gameContracts;
    }
}