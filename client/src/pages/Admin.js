import { useState } from 'react'
import {
  Button,
  InputGroup,
  FormControl,
  Col,
  Row,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { setKittyContractAddress } from '../utils/utils'

const Admin = () => {
  const state = useSelector((state) => state)
  const {
    contract,
    etherBalance,
    currentAccount,
    contractAddress,
    accounts,
    web3,
  } = state

  const [address, setAddress] = useState('')
  const [beneficiaryAccount, setBeneficiaryAccount] = useState(accounts[1])
  const [amount, setAmount] = useState(0)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let result = await setKittyContractAddress(
        contract,
        address,
        currentAccount,
      )
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setAddress(e.target.value)
  }

  const handleChangeBeneficary = (account) => {
    setBeneficiaryAccount(account)
  }

  const handleTransfer = async () => {
    const result = await web3.eth.sendTransaction({
      to: beneficiaryAccount,
      from: currentAccount,
      value: web3.utils.toWei(amount, 'ether'),
    })
    console.log(result)
  }
  return (
    <div className="mt-5">
      <Col lg={8}>
        <Row>
          <div className="mt-3">Contract Address: {contractAddress}</div>
        </Row>
        <Row>
          <div className="mt-3">Account: {currentAccount}</div>
        </Row>
        <Row>
          <div className="mt-3">Balance: {etherBalance} ETH</div>
        </Row>
        <Row>
          <InputGroup size="sm" className="mt-3" onChange={handleChange}>
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
        </Row>
        <Row>
          <div className="mt-5 mb-3">Transfer</div>
          <InputGroup className="mb-3" size="sm">
            <InputGroup.Text id="basic-addon1">From</InputGroup.Text>
            <FormControl
              placeholder={currentAccount}
              aria-label="Username"
              aria-describedby="basic-addon1"
              disabled
            />
          </InputGroup>
          <InputGroup className="mb-3" size="sm">
            <DropdownButton
              variant="outline-secondary"
              title="To"
              id="input-group-dropdown-1"
            >
              {accounts.map((account) => (
                <Dropdown.Item
                  key={account}
                  onClick={() => handleChangeBeneficary(account)}
                >
                  {account}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <FormControl
              aria-label="Text input with dropdown button"
              value={beneficiaryAccount}
              readOnly
            />
          </InputGroup>
          <InputGroup
            className="mb-3"
            size="sm"
            onChange={(e) => setAmount(e.target.value)}
          >
            <InputGroup.Text id="basic-addon1">ETH</InputGroup.Text>
            <FormControl
              placeholder={amount}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Button
            variant="outline-danger"
            id="button-addon2"
            onClick={handleTransfer}
          >
            Transfer {amount} ETH
          </Button>
        </Row>
      </Col>
    </div>
  )
}

export default Admin
