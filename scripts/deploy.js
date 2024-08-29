const hre = require("hardhat");

async function main() {
    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();

    // Wait for the contract to be deployed
    await nftMarketplace.waitForDeployment();

    // Output the deployed contract address
    console.log(`deployed contract address ${await nftMarketplace.getAddress()} `);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
