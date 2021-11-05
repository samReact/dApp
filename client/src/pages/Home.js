import { Container } from 'react-bootstrap'

import NewZombieForm from '../parts/NewZombieForm'

const Home = ({
  accounts,
  balance,
  levelUpFee,
  zombies,
  handleChange,
  handleSubmit,
}) => {
  return (
    <>
      <h2>Smart Contract Example</h2>
      <div>Account: {accounts[0]}</div>
      <div>Balance: {balance} ETH</div>
      <div>LevelUp Fee: {levelUpFee} ETH</div>
      <Container>
        {zombies.length === 0 && (
          <NewZombieForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        )}
      </Container>
    </>
  )
}

export default Home
