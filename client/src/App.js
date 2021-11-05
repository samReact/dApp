import { useEffect, useState } from 'react'
import ZombieOwnership from './contracts/ZombieOwnership.json'
import Web3 from 'web3'
import { Container, Spinner } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

import './App.css'
import {
  createRandomZombie,
  getLevelUpFees,
  getZombiesByOwner,
} from './utils/utils'
import NavbarPart from './parts/NavBarPart'
import Tokens from './pages/Tokens'
import Admin from './pages/Admin'

function App() {
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [contract, setContract] = useState(null)
  const [balance, setBalance] = useState(0)
  const [name, setName] = useState('')
  const [zombies, setZombies] = useState([])
  const [levelUpFee, setLevelUpFee] = useState('--')

  useEffect(() => {
    loadBlockhain()
  }, [])

  useEffect(() => {
    if (contract) {
      contract.events
        .NewZombie({ filter: { _to: accounts[0] } })
        .on('data', function (event) {
          let data = event.returnValues
          setZombies([...zombies, data])
          // The current user just received a zombie!
          // Do something here to update the UI to show it
        })
        .on('error', console.error)
    }
  }, [contract])

  async function loadBlockhain() {
    try {
      // Get network provider and web3 instance.
      // const web3 = await getWeb3();
      // console.log("web3:", web3)

      // const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
      const provider = new Web3(
        new Web3.providers.WebsocketProvider('ws://localhost:8545'),
      )
      const web3 = new Web3(provider)
      console.log('No web3 instance injected, using Local web3.')

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()
      let balance = await web3.eth.getBalance(accounts[0])
      let etherBalance = web3.utils.fromWei(balance, 'ether')

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = ZombieOwnership.networks[networkId]
      const instance = new web3.eth.Contract(
        ZombieOwnership.abi,
        deployedNetwork && deployedNetwork.address,
      )
      const zombieCount = await getZombiesByOwner(accounts[0], instance)
      const levelUpFee = await getLevelUpFees(instance, web3)

      setAccounts(accounts)
      setContract(instance)
      setZombies(zombieCount)
      setBalance(etherBalance)
      setLevelUpFee(levelUpFee)
      setWeb3(web3)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      )
      console.error(error)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      createRandomZombie(name, contract, accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  return (
    <div>
      <NavbarPart />
      <Container>
        {!web3 ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  accounts={accounts}
                  balance={balance}
                  levelUpFee={levelUpFee}
                  zombies={zombies}
                />
              }
            />
            <Route
              path="/tokens"
              element={
                <Tokens
                  zombies={zombies}
                  contract={contract}
                  accounts={accounts}
                  web3={web3}
                />
              }
            />
            <Route
              path="/admin"
              element={<Admin contract={contract} accounts={accounts} />}
            />
          </Routes>
        )}
      </Container>
    </div>
  )
}

export default App
