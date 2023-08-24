import { useSession, signOut } from 'next-auth/react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Spinner } from 'react-bootstrap';

function CollapsibleExample() {
  const { data: session, status } = useSession();

  // Mientras la sesión se está cargando, muestra un spinner
  if (status === 'loading') {
    return (
      <Navbar>
        <Container className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </Container>
      </Navbar>
    );
  }

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signOut();
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Patagonia</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="funcionabilidades">Funcionabilidades</Nav.Link>
            <Nav.Link href="precios">Precios</Nav.Link>
          </Nav>
          <Nav>
            {session ? (
              <>
                <Nav.Link href="perfil">Perfil</Nav.Link>
                <Nav.Link href="#" onClick={handleSignOut}>Cerrar Sesión</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="signIn">Iniciar Sesión</Nav.Link>
                <Nav.Link href="registro">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default CollapsibleExample;
