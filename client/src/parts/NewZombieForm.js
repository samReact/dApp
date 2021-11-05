import { Form, Button } from 'react-bootstrap'

function NewZombieForm({ handleSubmit, handleChange }) {
  return (
    <Form onChange={handleChange}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Zombie's name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default NewZombieForm
