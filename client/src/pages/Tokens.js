import { useEffect, useState } from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import {
  feedOnKitty,
  getZombieDetails,
  levelUp,
  setNewName,
} from '../utils/utils'
import zombieImg from '../CryptoZombies.jpeg'

const Tokens = ({ zombies, contract, accounts, web3 }) => {
  const [army, setArmy] = useState([])

  // useEffect(() => {
  //   getDetails()
  // }, [])

  // const getDetails = async () => {
  //   let result = await getZombieDetails(zombies[0], contract)
  //   let newArmy = []
  //   newArmy.push(result)
  //   setArmy(newArmy)
  // }

  const handleFeed = async () => {
    let result = await feedOnKitty(zombies[0], 2, contract, accounts[0])
    console.log(result)
  }

  const handleLevel = async () => {
    let result = await levelUp(zombies[0], contract, accounts[0], web3)
    console.log(result)
  }

  const handleName = async () => {
    let result = await setNewName(zombies[0], 'Francois', contract, accounts[0])
    console.log(result)
  }
  return (
    <>
      <h2>Tokens</h2>
      {zombies.map((zombie) => {
        return (
          <Card key={zombie.name} style={{ width: '18rem' }}>
            <Card.Img
              variant="top"
              src={zombieImg}
              style={{ width: '18rem' }}
            />
            <Card.Body>
              <Card.Title>{zombie.name}</Card.Title>
              <div className="mb-3">
                <Badge bg="info">Level {zombie.level}</Badge>
              </div>
              <div className="mb-3">
                <Badge bg="info">DNA {zombie.dna}</Badge>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleFeed()}
                >
                  Feed Me !
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleLevel()}
                >
                  Level Up !
                </Button>
              </div>
              <div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleName()}
                  disabled={zombie.level < 2}
                >
                  Change Name
                </Button>
              </div>
            </Card.Body>
          </Card>
        )
      })}
    </>
  )
}

export default Tokens
