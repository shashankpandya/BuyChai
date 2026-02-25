const hre = require("hardhat");
// import { ethers } from "ethers";
async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function cosoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp},name ${name},address ${from},message ${message}`,
    );
  }
}
async function main() {
  const signers = await hre.ethers.getSigners();
  const owner = signers[0];
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy(); //instance of contract

  await contract.deployed();
  console.log("Address of contract:", contract.address);

  const addresses = [owner.address];

  // Only run tests with multiple signers on local network
  if (signers.length > 1) {
    addresses.push(signers[1].address);
    addresses.push(signers[2].address);
    addresses.push(signers[3].address);
    addresses.push(signers[4].address);

    console.log("Before buying chai");
    await cosoleBalances(addresses);

    const amount = { value: hre.ethers.utils.parseEther("1") };
    await contract
      .connect(signers[1])
      .buyChai("from1", "Very nice chai", amount);
    await contract
      .connect(signers[2])
      .buyChai("from2", "Very nice course", amount);
    await contract
      .connect(signers[3])
      .buyChai("from3", "Very nice information", amount);
    await contract
      .connect(signers[4])
      .buyChai("from4", "Very nice book", amount);

    console.log("After buying chai");
    await cosoleBalances(addresses);

    const memos = await contract.getMemos();
    await consoleMemos(memos);
  } else {
    console.log(
      "Single signer detected (Sepolia network). Skipping multi-signer tests.",
    );
    console.log("Owner address:", owner.address);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
