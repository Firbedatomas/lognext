import React from 'react';
import { useSession } from 'next-auth/react';

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Comenzar a usar Patagonia es muy fácil...</h1>
      <p>Vendé mejor sin pagar comisión</p>
      {session?.user?.email && (
        <div>
          {/* Puedes acceder a cualquier propiedad que hayas incluido en el objeto de usuario en la respuesta de autenticación */}
          <h2>Bienvenido, {session.user.fullName}!</h2>
          <p>Estás autenticado y listo para comenzar.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
