export const feedOnKitty = async (zombieId, kittyId, contract, account) => {
  try {
    const result = await contract.methods
      .feedOnKitty(zombieId, kittyId)
      .estimateGas(account)
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

export const setKittyContractAddress = async (contract, address, account) => {
  try {
    const result = await contract.methods
      .setKittyContractAddress(address)
      .send({
        from: account,
        gas: 360285,
      })
    return result
  } catch (error) {
    console.log(error)
  }
}

export const getLevelUpFees = async (contract, web3) => {
  try {
    const result = await contract.methods.getLevelUpFee().call()
    const etherResult = web3.utils.fromWei(result, 'ether')
    return etherResult
  } catch (error) {
    console.log(error)
  }
}

export const getZombieDetails = async (id, contract) => {
  try {
    const result = await contract.methods.zombies(id).call()
    return result
  } catch (error) {
    console.log(error)
  }
}

export const getZombieToOwner = async (id, contract) => {
  try {
    const result = await contract.methods.zombieToOwner(id).call()
    return result
  } catch (error) {
    console.log(error)
  }
}

export const getZombiesByOwner = async (owner, contract) => {
  try {
    const result = await contract.methods.getZombiesByOwner(owner).call()
    return result
  } catch (error) {
    console.log(error)
  }
}

export const transferToken = async (from, to, tokenId, contract, account) => {
  try {
    const result = await contract.methods
      .transferFrom(from, to, tokenId)
      .send({ from: account, gas: 360285 })
    return result
  } catch (error) {
    console.log(error)
  }
}

export const getZombies = async (contract) => {
  try {
    const result = await contract.methods.zombies(0)
    return result
  } catch (error) {
    console.log(error)
  }
}
