const { scripts, ConfigManager } = require("@openzeppelin/cli");
const { add, push, create } = scripts;
const { publicKey } = require("../privatekey");

async function deploy(options) {
  add({
    contractsData: [
      { name: "LidSimplifiedPresaleTimer", alias: "LidSimplifiedPresaleTimer" }
    ]
  });
  options.force = true;
  await push(options);
  await create(
    Object.assign({ contractAlias: "LidSimplifiedPresaleTimer" }, options)
  );
}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
    let account = accounts[0];
    const { network, txParams } = await ConfigManager.initNetworkConfiguration({
      network: networkName,
      from: account
    });
    await deploy({ network, txParams });
  });
};
