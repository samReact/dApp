import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import logo from '../etherum.png'

const NavbarPart = () => {
  const navigate = useNavigate()
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand onClick={() => navigate('./')}>
          <img
            alt=""
            src={logo}
            width="60"
            className="d-inline-block align-top"
          />{' '}
          Smart Contract
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('./tokens')}>Tokens</Nav.Link>
          <Nav.Link onClick={() => navigate('./admin')}>Admin</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavbarPart
