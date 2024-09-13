'use client';

import { createThread } from '@/actions/dashboard';

export default function ThreadDashboard({
  threads,
  websiteId,
}: {
  threads: Record<string, any>[];
  websiteId: string;
}) {
  return (
    <section id='comment-system' className='mt-8 border rounded p-2'>
      <div className='flex justify-between'>
        <h1>Threads dashboard</h1>
        <button
          className='border rounded py-1 px-2 hover:bg-[#fafafa]'
          onClick={() => createThread(websiteId)}
        >
          Add new thread
        </button>
      </div>

      <p>
        Threads <span className='self-center mx-2'>&#8226;</span>
        {threads.length}
      </p>

      {threads.length > 0 && (
        <ul className='list-none mt-8 p-0' id='thread-section'>
          {threads.map((thread) => {
            return (
              <li
                key={thread.thread_id}
                className='border rounded py-1 px-2 mb-2'
              >
                <p className='mr-6'>Id: {thread.thread_id}</p>
                <p className='mr-2'>Name: {thread.thread_name}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
