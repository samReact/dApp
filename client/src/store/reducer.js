export const initialState = {
  web3: null,
  accounts: null,
  zombies: null,
  levelUpFee: null,
  balance: null,
  etherBalance: null,
  currentAccount: null,
  ownerArmy: null,
  contractAddress: '',
}

export default function appReducer(state = initialState, action) {
  const { payload, type } = action
  switch (type) {
    case 'loadBlockchain': {
      return {
        ...state,
        web3: payload.web3,
        accounts: payload.accounts,
        contract: payload.contract,
        zombies: payload.zombies,
        levelUpFee: payload.levelUpFee,
        balance: payload.balance,
        etherBalance: payload.etherBalance,
        currentAccount: payload.accounts[0],
        contractAddress: payload.contractAddress,
      }
    }
    case 'setZombiesByOwner': {
      return {
        ...state,
        zombies: payload.zombies,
      }
    }

    case 'setOwnerArmy': {
      return {
        ...state,
        ownerArmy: payload.ownerArmy,
      }
    }

    case 'createRandomZombie': {
      return {
        ...state,
        zombies: payload.zombies,
      }
    }

    case 'levelUpZombie': {
      return {
        ...state,
        zombies: payload.zombies,
      }
    }
    default:
      return state
  }
}
