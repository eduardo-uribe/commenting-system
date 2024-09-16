'use client';

import { update, delete_thread } from '@/actions/edit-thread';

interface Thread {
  thread_id: number;
  thread_owner_id: number;
  thread_date_created: Date;
  thread_date_updatead: Date;
  thread_name: string;
}

export default function EditThreadForm({ thread }: { thread: Thread }) {
  return (
    <form action={update} className='border rounded p-2'>
      <h1 className='font-medium mb-1'>Edit this thread</h1>
      <p className='mb-4 text-[#8C8C8D]'>
        Update the thread name or delete the thread entirely.
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

      <label htmlFor='thread_name' className='block font-medium mt-4 text-sm'>
        Name
      </label>
      <input
        type='text'
        name='thread_name'
        id='thread_id'
        className='block mt-1 border rounded p-2 w-full text-sm mb-8'
        defaultValue={thread.thread_name}
      />

      <button className='border rounded py-1 px-4 mr-2 bg-[#eee]' type='submit'>
        Save
      </button>
      <button
        className='border rounded py-1 px-4 hover:bg-[#FCD4D5]'
        onClick={async (event) => {
          await delete_thread();
        }}
        type='button'
      >
        Delete
      </button>
    </form>
  );
}
