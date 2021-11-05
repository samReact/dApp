import { Form, Button } from 'react-bootstrap'

function TransferMoneyForm({ handleSubmitEther, handleChangeEther }) {
  return (
    <Form onChange={handleChangeEther}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Ether Account</Form.Label>
        <Form.Control type="text" placeholder="Enter Ether Account" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleSubmitEther}>
        Transfer
      </Button>
    </Form>
  )
}

export default TransferMoneyForm
