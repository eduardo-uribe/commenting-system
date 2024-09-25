import Link from 'next/link';

import { delete_thread } from '@/actions/edit-thread';
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

  const delete_thread_id = delete_thread.bind(null, thread_id);

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

        <form action={delete_thread_id} className='border rounded p-2'>
          <h1 className='font-medium mb-1'>Delete this thread</h1>
          <p className='mb-4 text-[#8C8C8D]'>
            Quick warning deleting a thread will delete all comments belonging
            to that thread.
          </p>

          <label htmlFor='thread_id' className='block text-sm font-medium mt-4'>
            Identification number
          </label>
          <input
            type='text'
            name='thread_id'
            id='thread_id'
            className='block mt-1 border rounded p-2 w-full text-sm'
            value={thread.thread_id}
            readOnly
          />

          <label
            htmlFor='thread_name'
            className='block font-medium mt-4 text-sm'
          >
            Name
          </label>
          <input
            type='text'
            name='thread_name'
            id='thread_id'
            className='block mt-1 border rounded p-2 w-full text-sm mb-8'
            value={thread.thread_name}
            readOnly
          />

          <button
            className='border rounded py-1 px-4 mr-2 bg-[#eee]'
            type='submit'
          >
            Delete
          </button>
        </form>
      </main>
    );
  } else {
    return (
      <main className='max-w-[52ch] m-auto pt-24'>
        <h1 className='mb-4'>Commenting System</h1>
        <p>
          Something went wrong. We couldn&lsquo;t find the data for the selected
          thread.
        </p>
      </main>
    );
  }
}
