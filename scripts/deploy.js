// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Assessment = await hre.ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy();

  await assessment.deployed();

  console.log("Assessment deployed to:", assessment.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
