
//const TokenFarm = artifacts.require('TokenFarm')
const BitQueens = artifacts.require('BitQueens')
const ChangeQueenNameToken = artifacts.require('ChangeQueenNameToken')



module.exports = async function(deployer, network, accounts) {

  await deployer.deploy(ChangeQueenNameToken,"ChangeQueenNameToken", "CQNT", 1615103103)
  const changeQueenNameToken = await ChangeQueenNameToken.deployed()

  console.log("The cqnt adrress is : "+ changeQueenNameToken.address)

  // Here in the last parametre it accepts the contact adress of NCT token
  await deployer.deploy(BitQueens,"BitQueens", "BTQ", changeQueenNameToken.address)
  const bitQueens = await BitQueens.deployed()

  console.log("The BTQ adrress is : "+ bitQueens.address)


  // Transfer all tokens to TokenFarm (1 million)
  //await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  //await daiToken.transfer(accounts[1], '100000000000000000000')
}
