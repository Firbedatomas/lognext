import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router'; // Importa useRouter
import { signIn } from 'next-auth/react'; // Importa la función signIn

const Registro: React.FC = () => {
    const [businessName, setBusinessName] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ businessName, fullName, phoneNumber, email, password }),
        });
  
      if (res.status === 201) {
        // Inicia sesión después de un registro exitoso
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
  
        if (result?.error) {
          setError(result.error);
        } else {
          // Redirige al usuario a la página principal
          router.push('/');
        }
      } else {
        const data = await res.json();
        setError(data.error || 'Ocurrió un error al registrarse');
      }
    } catch (error) {
      setError('Ocurrió un error al registrarse');
      console.error(error);
    }
  };
  
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre del Negocio</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el nombre del negocio" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tu Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingrese tu nombre" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Número de Teléfono</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su número de teléfono" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Registrarse
          </Button>
    </Form>
  );
};

export default Registro;
