import { Button, InputGroup, FormControl } from 'react-bootstrap'

function NewZombieForm({ handleSubmit, handleChange }) {
  return (
    <InputGroup size="sm" className="mb-3" onChange={handleChange}>
      <FormControl
        placeholder="Enter Zombie's name"
        aria-label=""
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
  )
}

export default NewZombieForm
