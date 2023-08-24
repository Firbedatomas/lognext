import 'next-auth';

declare module 'next-auth' {
  interface User {
    fullName?: string;
  }
  interface Session {
    user: User;
  }
  interface JWT {
    fullName?: string;
  }
}
