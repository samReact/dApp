import { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { feedOnKitty } from '../utils/utils'

import { useDispatch, useSelector } from 'react-redux'
import {
  createRandomZombie,
  levelUpZombie,
  setOwnerArmy,
  setNewName,
} from '../store/actions'
import NewZombieForm from '../parts/NewZombieForm'
import ZombieCard from '../parts/ZombieCard'

const Tokens = () => {
  const state = useSelector((state) => state)
  const ownerArmy = useSelector((state) => state.ownerArmy)
  const [name, setName] = useState('')
  const { contract, currentAccount, zombies } = state
  const dispatch = useDispatch()
  const inputRef = useRef()

  useEffect(() => {
    if (zombies.length) dispatch(setOwnerArmy)
  }, [zombies, dispatch])

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      dispatch((dispatch, getState) =>
        createRandomZombie(dispatch, getState, name),
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleFeed = async () => {
    let result = await feedOnKitty(zombies[0], 2, contract, currentAccount)
    console.log(result)
  }

  const handleLevelUp = async (zombieId) => {
    dispatch((dispatch, getState) =>
      levelUpZombie(dispatch, getState, zombieId),
    )
  }

  const handleSubmitName = async (zombieId) => {
    dispatch((dispatch, getState) =>
      setNewName(dispatch, getState, zombieId, name),
    )
    inputRef.current.value = ''
  }

  return (
    <div className="mt-5">
      {zombies && ownerArmy ? (
        ownerArmy.map((zombie) => {
          return (
            <ZombieCard
              key={zombie.dna}
              zombie={zombie}
              handleFeed={handleFeed}
              handleLevel={handleLevelUp}
              handleChange={handleChange}
              handleSubmitName={handleSubmitName}
              inputRef={inputRef}
            />
          )
        })
      ) : (
        <Col lg={6}>
          <h6>You don't own any Zombie yet...Let's create one !</h6>
          <Row>
            <NewZombieForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
          </Row>
        </Col>
      )}
    </div>
  )
}

export default Tokens
