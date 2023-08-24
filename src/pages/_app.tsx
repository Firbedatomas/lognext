import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/../components/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react'; // Importar SessionProvider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}> {/* Envolver en SessionProvider */}
      <Navbar />
      <Container>
        <Row>
          <Col>
            <Component {...pageProps} />
          </Col>
        </Row>
      </Container>
    </SessionProvider> 
  );
}
