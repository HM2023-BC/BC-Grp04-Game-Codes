pragma solidity >=0.4.22 <0.9.0;

// Main contract for managing game codes for a single developer
contract GameCode {
    struct GameCodeInfo {
        string code;  
        string metadata; 
        bool redeemed;
    }

    // The developer's address that owns and manages this contract
    address public developer;

    // Mapping to store game codes against their string identifiers
    mapping(string => GameCodeInfo) public codes;

    // Event triggered when a new code is created
    event CodeCreated(string code, string metadata);
    // Event triggered when a code is redeemed
    event CodeRedeemed(string code, address indexed redeemer);

    // Constructor to set the developer's address at contract deployment
    constructor(address creator) {
        developer = creator;
    }

    // Function to create a new game code, only callable by the developer
    function createCode(string memory code, string memory metadata) public {
        require(msg.sender == developer, "Only the developer can create codes");
        require(bytes(codes[code].code).length == 0, "Code already exists");
        
        // Create a new GameCodeInfo struct and store it in the codes mapping
        codes[code] = GameCodeInfo(code, metadata, false);

        // Trigger an event to log the creation of a new code
        emit CodeCreated(code, metadata);
    }

    // Function to redeem a game code
    function redeemCode(string memory code) public {
        // Check that the code exists and has not been redeemed
        require(bytes(codes[code].code).length != 0, "Code does not exist");
        require(codes[code].redeemed == false, "Code already redeemed");

        // Mark the code as redeemed
        codes[code].redeemed = true;

        // Trigger an event to log the code redemption
        emit CodeRedeemed(code, msg.sender);
    }
}
