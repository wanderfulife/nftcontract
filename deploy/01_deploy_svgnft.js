const fs = require("fs");
let { networkConfig } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chaindId = await getChainId();

  log("-------------------------------");
  const SVGNFT = await deploy("SVGNFT", {
    from: deployer,
    log: true,
  });
  log(`You have deployed an NFT contract to ${SVGNFT.address}`);
  let filepath = "./img/triangle.svg";
  let svg = fs.readFileSync(filepath, { encoding: "utf8" });

  const svgNFTContract = await ethers.getContractFactory("SVGNFT");
  const accounts = await hre.ethers.getSigners();
  const signer = accounts[0];
  const svgNFT = new ethers.Contract(
    SVGNFT.address,
    svgNFTContract.interface,
    signer
  );
  const networkName = networkConfig[chaindId]["name"];
  log(
    `Verify with: \n npx hardhat verify --network ${networkName} ${svgNFT.address}`
  );
};
