import EditThreadForm from './EditThreadForm';
import Link from 'next/link';

import { read_thread } from '@/app/helper/database';

interface Thread {
  thread_id: number;
  thread_owner_id: number;
  thread_date_created: Date;
  thread_date_updatead: Date;
  thread_name: string;
}

export default async function Page({ params }: { params: { id: string } }) {
  const thread_id = Number(params.id);

  // read thread data
  const thread = await read_thread(thread_id);

  if (thread) {
    return (
      <main className='max-w-[52ch] m-auto pt-24'>
        <div className='flex justify-between mb-4'>
          <h1>Commenting System</h1>
          <Link
            href='../'
            className='text-indigo-800 underline underline-offset-4'
          >
            Back to dashboard
          </Link>
        </div>
        <EditThreadForm thread={thread as Thread} />
      </main>
    );
  } else {
    return (
      <main className='max-w-[52ch] m-auto pt-24'>
        <h1 className='mb-4'>Commenting System</h1>
        <p>
          Something went wrong. We couldn&lsquo;t find the selected threads
          data.
        </p>
      </main>
    );
  }
}
