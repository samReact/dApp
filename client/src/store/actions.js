import ZombieOwnership from '../contracts/ZombieOwnership.json'
import getWeb3 from '../getWeb3'
import {
  getLevelUpFees,
  getZombieDetails,
  getZombiesByOwner,
} from '../utils/utils'

export async function loadBlockchain(dispatch, getState) {
  try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3()

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts()
    let balance = await web3.eth.getBalance(accounts[0])
    let etherBalance = web3.utils.fromWei(balance, 'ether')

    // Get the contract instance.
    const networkId = await web3.eth.net.getId()
    const deployedNetwork = ZombieOwnership.networks[networkId]
    const contractAddress = deployedNetwork.address
    const contract = new web3.eth.Contract(
      ZombieOwnership.abi,
      deployedNetwork && contractAddress,
    )
    const zombies = await getZombiesByOwner(accounts[0], contract)
    const levelUpFee = await getLevelUpFees(contract, web3)

    dispatch({
      type: 'loadBlockchain',
      payload: {
        accounts,
        contract,
        zombies,
        levelUpFee,
        balance,
        etherBalance,
        web3,
        contractAddress,
      },
    })
  } catch (error) {
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    )
    console.error(error)
  }
}

export async function setZombiesByOwner(dispatch, getState) {
  const { contract, currentAccount } = getState()
  const zombies = await getZombiesByOwner(currentAccount, contract)
  console.log(zombies)
  dispatch({ type: 'setZombiesByOwner', payload: { zombies } })
}

export async function setOwnerArmy(dispatch, getState) {
  let ownerArmy = []
  const { zombies, contract } = getState()

  for (let i = 0; i < zombies.length; i++) {
    // wait for the promise to resolve before advancing the for loop
    let result = await getZombieDetails(zombies[i], contract)
    ownerArmy.push({ id: zombies[i], ...result })
  }

  dispatch({
    type: 'setOwnerArmy',
    payload: { ownerArmy },
  })
}

export async function createRandomZombie(dispatch, getState, name) {
  const { contract, currentAccount } = getState()

  try {
    await contract.methods
      .createRandomZombie(name)
      .send({ from: currentAccount, gas: 560285 })
    const zombies = await getZombiesByOwner(currentAccount, contract)

    dispatch({
      type: 'createRandomZombie',
      payload: { zombies },
    })
  } catch (error) {
    console.log(error)
  }
}

export async function levelUpZombie(dispatch, getState, zombieId) {
  const { contract, currentAccount, web3 } = getState()
  try {
    await contract.methods.levelUp(zombieId).send({
      from: currentAccount,
      gas: 360285,
      value: web3.utils.toWei('0.001', 'ether'),
    })
    const zombies = await getZombiesByOwner(currentAccount, contract)
    dispatch({
      type: 'levelUpZombie',
      payload: { zombies },
    })
  } catch (error) {
    console.log(error)
  }
}

export const setNewName = async (dispatch, getState, zombieId, newName) => {
  const { contract, currentAccount } = getState()
  try {
    await contract.methods
      .changeName(zombieId, newName)
      .send({ from: currentAccount, gas: 360285 })
    const zombies = await getZombiesByOwner(currentAccount, contract)
    dispatch({
      type: 'levelUpZombie',
      payload: { zombies },
    })
  } catch (error) {
    console.log(error)
  }
}
