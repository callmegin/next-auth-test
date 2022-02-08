import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'u: admin, p: admin',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = {
          id: 1,
          username: 'admin',
          email: 'email@email.email',
          password: 'admin',
        };

        if (!credentials) {
          return null;
        }

        if (credentials.username === user.username && credentials.password === user.password) {
          return user;
        }

        throw new Error('Incorrect Credentials');
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.username as string;
      }

      return token;
    },
  },
  session: {
    maxAge: 60 * 3,
  },
  jwt: {
    secret: 'SECRET_HERE',
  },
});
