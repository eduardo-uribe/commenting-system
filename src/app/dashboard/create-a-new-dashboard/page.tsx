import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';

import Link from 'next/link';
import Form from './Form';
import { createWebsite } from '@/actions/dashboard';

export default function Page() {
  // api key
  const api_key = generateAPIKey();

  // page authentication
  const { userId }: { userId: string | null } = auth();
  if (!userId) redirect('/sign-in');

  // server action to register a new website
  const register = createWebsite.bind(null, userId);

  return (
    <main className='max-w-[42ch] m-auto mt-24'>
      <h1>Commenting System</h1>
      <p className='mb-4 text-gray-500'>
        In the form below register the website that you will add a commenting
        system too.
      </p>

      <form action={register} className='border p-2 rounded'>
        <label htmlFor='url'>Enter your websites url</label>
        <input
          type='url'
          name='url'
          id='url'
          className='block border p-1 rounded w-full mt-1'
          placeholder='https://example.com'
          required
        />

        <label htmlFor='api-key' className='block mt-4'>
          Your websites unique API key
        </label>
        <input
          type='text'
          name='api-key'
          id='api-key'
          value={api_key}
          className='block border p-1 rounded w-full mt-1'
          readOnly
        />

        <button className='border rounded py-1 px-3 mt-4 mr-2 bg-[#eee]'>
          Save
        </button>

        <Link href='/dashboard'>
          <button className='border rounded py-1 px-3 mt-4 bg-[#eee]'>
            Cancel
          </button>
        </Link>
      </form>
    </main>
  );
}

// create a unique api key
function generateAPIKey(): string {
  // create a base-36 string that is always 30 characters long
  return [...Array(30)]
    .map(function (element) {
      return ((Math.random() * 36) | 0).toString(36);
    })
    .join('');
}
