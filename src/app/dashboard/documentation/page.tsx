import Link from 'next/link';

export default function Page() {
  return (
    <main className='max-w-[52ch] m-auto pt-24'>
      <div className='flex justify-between'>
        <div>
          <h1>Comment System</h1>
          <h2>Documentation</h2>
        </div>

        <Link
          href='/dashboard'
          className='block border rounded py-1 px-2 bg-[#eee] text-sm h-min'
        >
          <span className='mr-1'>&larr;</span> Back to dashboard
        </Link>
      </div>
      <p className='mt-6 text-[#8C8C8D]'>
        Encourage your audience to share feedback, ask questions, and
        participate in discussions with a commenting system.
      </p>
    </main>
  );
}
