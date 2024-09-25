import { redirect } from 'next/navigation';
import Link from 'next/link';

import { auth, currentUser } from '@clerk/nextjs/server';
import { read_domains } from '../helper/database';

import Select from '@/app/components/dashboard/Select';
import Navigation from '@/app/components/dashboard/Navigation';

export default async function Page() {
  // logged in customer
  const { userId }: { userId: string | null } = auth();
  if (!userId) redirect('/sign-in');

  // customers domains
  let domains = await read_domains(userId);

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
        {domains && domains.length > 0 && (
          <Select domains={domains} site={undefined} />
        )}
      </section>
    </main>
  );
}
