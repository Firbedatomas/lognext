import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { signIn } from 'next-auth/react';

const IniciarSesion: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Redirigir al usuario a la página principal o a la página deseada después de iniciar sesión
        window.location.href = '/';
      }
    } catch (error) {
      setError('Ocurrió un error al iniciar sesión');
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Iniciar Sesión
      </Button>
    </Form>
  );
};

export default IniciarSesion;
