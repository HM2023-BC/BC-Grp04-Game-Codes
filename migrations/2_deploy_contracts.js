var GameCodeCreator = artifacts.require("./GameCodeCreator");

module.exports = function(deployer) {
  deployer.deploy(GameCodeCreator);
};