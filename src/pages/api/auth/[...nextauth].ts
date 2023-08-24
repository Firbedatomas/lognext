import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: 'myverystrongandrandomsecretvalue',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/auth", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          return { ...user }; // Devolvemos el objeto de usuario completo
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Agrega el campo 'fullName' al token si está presente en el objeto 'user'
      if (user?.fullName) {
        token.fullName = user.fullName;
      }
      return token;
    },
    async session({ session, token }) {
        // Agrega el campo 'fullName' a la sesión
        if (typeof token.fullName === 'string') {
          session.user.fullName = token.fullName;
        }
        return session;
      },
  },
  
});
