import { redirect } from 'next/navigation';
import Link from 'next/link';

import { auth, currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';

import Select from '@/app/components/dashboard/Select';
import Navigation from '@/app/components/dashboard/Navigation';

export default async function Page() {
  // logged in customer
  const { userId }: { userId: string | null } = auth();
  if (!userId) redirect('/sign-in');

  // customers registered websites
  let registered_websites = await read_registered_websites(userId);

  return (
    <main className='max-w-[52ch] m-auto pt-24'>
      <Navigation />

      <section className='border rounded p-2 mt-28'>
        <div className='flex justify-between'>
          <h2>Dashboard</h2>
          <Link
            href='/dashboard/create-a-new-dashboard'
            className='text-indigo-800 underline underline-offset-4 text-sm'
          >
            New Dashboard
          </Link>
        </div>
        {registered_websites.length > 0 && (
          <Select registered_websites={registered_websites} site={undefined} />
        )}
      </section>
    </main>
  );
}

// read customers registered sites
async function read_registered_websites(userId: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql(
    `SELECT * FROM website WHERE website_owner_id = $1`,
    [userId]
  );

  return result;
}
