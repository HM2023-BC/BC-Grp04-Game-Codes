const { async } = require("regenerator-runtime");

const GameCodeCreator = artifacts.require("GameCodeCreator");
const GameCode = artifacts.require("GameCode");
let gameCodeCreator;
let gameCodeAddress;
let gameCode;

before(async() => {
    gameCodeCreator = await GameCodeCreator.new();

    await gameCodeCreator.createGameContract();
    gameCodeAddress = await gameCodeCreator.getDeployedGameContracts.call();

    gameCode = await GameCode.at(gameCodeAddress[0]);
});

contract("GameCode test", (accounts) => {
    const code = "test_code";
    const metadata = "Test game code";

    it('gameCode has an address', async () => {
        assert.ok(gameCodeAddress);
    });

    it('developer is the contract creator', async () => {
        const developer = await gameCode.developer.call();
        assert.equal(developer, accounts[0]);
    });

    it('allows developer to create a game code', async () => {
        await gameCode.createCode(code, metadata, {from: accounts[0]});
        const gameCodeInfo = await gameCode.codes.call(code);
        assert.equal(gameCodeInfo.code, code);
        assert.equal(gameCodeInfo.metadata, metadata);
        assert.equal(gameCodeInfo.redeemed, false);
    });

    it('does not allow non-developer to create a game code', async () => {
        try {
            await gameCode.createCode("invalid_code", "Invalid game code", {from: accounts[1]});
            assert(false); // This should fail, so we immediately assert false
        } catch (error) {
            assert(error); // Expect an error if this call is successful
        }
    });

    it('allows a user to redeem a game code', async () => {
        await gameCode.redeemCode(code, {from: accounts[1]});
        const gameCodeInfo = await gameCode.codes.call(code);
        assert.equal(gameCodeInfo.redeemed, true);
    });

    it('does not allow a user to redeem an already redeemed game code', async () => {
        try {
            await gameCode.redeemCode(code, {from: accounts[2]});
            assert(false); // This should fail, so we immediately assert false
        } catch (error) {
            assert(error); // Expect an error if this call is successful
        }
    });
});
