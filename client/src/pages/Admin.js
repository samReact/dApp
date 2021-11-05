import { useState } from 'react'
import { Button, Dropdown, InputGroup, FormControl } from 'react-bootstrap'
import { setKittyContractAddress } from '../utils/utils'

const Admin = ({ contract, accounts }) => {
  const [address, setAddress] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let result = await setKittyContractAddress(contract, address, accounts[0])
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setAddress(e.target.value)
  }

  return (
    <>
      <h2>Set KittyContract Address</h2>
      <InputGroup size="sm" className="mb-3" onChange={handleChange}>
        <FormControl
          placeholder="Set KittyContract Address"
          aria-label="Set KittyContract Address"
          aria-describedby="basic-addon2"
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </InputGroup>

      <Dropdown>
        <Dropdown.Toggle
          variant="outline-secondary"
          size="sm"
          id="dropdown-basic"
        >
          Select an account
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {accounts.map((account) => (
            <Dropdown.Item key={account} href="#/action-1">
              {account}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default Admin
