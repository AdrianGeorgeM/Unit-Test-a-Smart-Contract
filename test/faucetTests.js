/** @format */
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

//describe function called Faucet
//The best way to think of this is just a general function scope that "describes" the suite of test cases enumerated by the "it" functions inside.
describe('Faucet', function () {
	// We define a fixture to reuse the same setup in every test.
	// We use loadFixture to run this setup once, snapshot that state,
	// and reset Hardhat Network to that snapshot in every test.

	// /Inside that describe, I have an it function.
	// These are MY specific unit test targets... just sound it out!: "I want it to x.", "I want it to y.", etc.
	// Inside the it function, I usED the loadFixture functionality
	// I imported in the first line to help bring all the variables we need for each test easily.

	//Inside the deployContractAndSetVariables function,I  used the contractFactory abstraction provided by Ethers.
	async function deployContractAndSetVariables() {
		const Faucet = await ethers.getContractFactory('Faucet');
		const faucet = await Faucet.deploy();

		const [owner] = await ethers.getSigners();

		console.log('Signer 1 address: ', owner.address);
		return { faucet, owner };
	}

	//It includes just one simple unit test checking that owner is set correctly at contract deployment.
	it('should deploy and set the owner correctly', async function () {
		const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

		expect(await faucet.owner()).to.equal(owner.address);
	});
});
