import { auth } from '@/auth';
import { IncomingAuthType } from 'payload';

export const userAuth: IncomingAuthType = {
  disableLocalStrategy: true,
  strategies: [
    {
      name: 'next-auth',

      authenticate: async ({ payload }) => {
        const session = await auth();
        if (!session?.user?.email) return { user: null };

        // check if user exists

        const users = await payload.find({
          collection: 'users',
          where: { email: { equals: session.user?.email } },
        });

        if (users.docs.length > 0) {
          const user = users.docs[0];
          return {
            user: {
              collection: 'users',
              id: user.id,
              email: user.email,
            },
          };
        }

        // create user

        const user = await payload.create({
          collection: 'users',
          data: {
            email: session.user.email,
            name: session.user.name ?? '',
          },
        });

        return {
          user: {
            collection: 'users',
            id: user.id,
            email: user.email,
          },
        };
      },
    },
  ],
};
