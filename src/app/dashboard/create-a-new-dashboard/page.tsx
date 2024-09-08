import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';
import Link from 'next/link';

// create a unique api key
function generateAPIKey(): string {
  // create a base-36 string that is always 30 characters long
  return [...Array(30)]
    .map(function (element) {
      return ((Math.random() * 36) | 0).toString(36);
    })
    .join('');
}

async function createWebsite(website_owner_id: string, formData: FormData) {
  'use server';

  try {
    const sql = neon(process.env.DATABASE_URL!);

    const raw_form_data = {
      website_url: formData.get('url'),
      website_api_key: formData.get('api-key'),
    };

    await sql(
      `INSERT INTO website (website_url, website_api_key, website_owner_id) VALUES ($1, $2, $3)`,
      [
        raw_form_data.website_url,
        raw_form_data.website_api_key,
        website_owner_id,
      ]
    );

    // mutate data
    // revalidate cache
  } catch (error) {
    console.log(error);
  }
}

export default function Page() {
  let api_key = generateAPIKey();
  const { userId }: { userId: string | null } = auth();

  if (!userId) redirect('/sign-in');
  const register_new_website = createWebsite.bind(null, userId);

  return (
    <main className='max-w-[42ch] m-auto mt-24'>
      <h1>Comment System</h1>
      <p className='mb-4 text-gray-500'>
        In the form below register the website that you will add a commenting
        system too.
      </p>

      {/* <form action={register_new_website} className='border p-2 rounded'>
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

        <button className='border rounded py-1 px-3 mt-4 bg-[#eee]'>
          Save
        </button>
      </form> */}

      <Link href='/dashboard' className='underline text-indigo-700'>
        https://eduardouribe.com has been registered. You can now select it in
        your dashboard.
      </Link>
    </main>
  );
}
