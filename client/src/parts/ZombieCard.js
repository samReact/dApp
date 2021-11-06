import { Card, Button, Badge, InputGroup, FormControl } from 'react-bootstrap'
import zombieImg from '../CryptoZombies.jpeg'

const ZombieCard = ({
  zombie,
  handleFeed,
  handleLevel,
  handleSubmitName,
  handleChange,
  inputRef,
}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={zombieImg} style={{ width: '18rem' }} />
      <Card.Body>
        <Card.Title>{zombie.name}</Card.Title>
        <div className="mb-3">
          <Badge bg="info">Level {zombie.level}</Badge>
        </div>
        <div className="mb-3">
          <Badge bg="info">DNA {zombie.dna}</Badge>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <Button size="sm" variant="primary" onClick={handleFeed}>
            Feed Me !
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleLevel(zombie.id)}
          >
            Level Up !
          </Button>
        </div>
        <div>
          <InputGroup size="sm" onChange={handleChange}>
            <FormControl
              placeholder="Enter Zombie's name"
              aria-label=""
              aria-describedby="basic-addon2"
              disabled={zombie.level < 2}
              ref={inputRef}
              onFocus={() => (inputRef.current.value = '')}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => handleSubmitName(zombie.id)}
              disabled={zombie.level < 2}
            >
              Change Name
            </Button>
          </InputGroup>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ZombieCard
