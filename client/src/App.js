import { useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

import './App.css'
import NavbarPart from './parts/NavBarPart'
import Tokens from './pages/Tokens'
import Admin from './pages/Admin'
import { useDispatch, useSelector } from 'react-redux'
import { loadBlockchain } from './store/actions'

function App() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const { web3, contract, currentAccount } = state

  useEffect(() => {
    dispatch(loadBlockchain)
  }, [dispatch])

  useEffect(() => {
    if (contract) {
      contract.events
        .NewZombie({ filter: { _to: currentAccount } })
        .on('data', function (event) {
          console.log('zombie created !')
        })
        .on('error', console.error)
    }
  }, [contract, currentAccount])

  return (
    <div>
      <NavbarPart />
      <Container>
        {!web3 ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        )}
      </Container>
    </div>
  )
}

export default App
