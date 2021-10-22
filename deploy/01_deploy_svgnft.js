const { ENGINE_METHOD_CIPHERS } = require("constants");
const fs = require("fs");
const { ethers } = require("hardhat");
const { hrtime } = require("process");

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
  const networkName = networkConfig;
};
