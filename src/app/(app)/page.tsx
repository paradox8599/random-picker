import { auth, signIn, signOut } from '@/auth';
import { Button } from '@payloadcms/ui';
import { unstable_noStore } from 'next/cache';

export default async function Page() {
  unstable_noStore();
  const session = await auth();

  return (
    <main className="py-2">
      <div>
        <pre className="whitespace-pre-wrap bg-zinc-200 rounded py-1 px-2">
          {JSON.stringify(session?.user, null, 2)}
        </pre>

        {!session && (
          <Button
            onClick={async () => {
              'use server';
              await signIn('discord', { redirectTo: '/admin' });
            }}
          >
            Login
          </Button>
        )}

        {session && (
          <Button
            onClick={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            Logout
          </Button>
        )}
      </div>

      <div>
        <p></p>
      </div>
    </main>
  );
}
