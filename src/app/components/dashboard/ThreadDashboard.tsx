'use client';

import { create_thread } from '@/actions/dashboard';
import Link from 'next/link';

export default function ThreadDashboard({
  threads,
  domain_id,
}: {
  threads: Record<string, any>[] | undefined;
  domain_id: string;
}) {
  return (
    <div>
      <div className='flex justify-between'>
        <p>
          Threads <span className='self-center mx-2'>&#8226;</span>
          {threads && threads.length}
        </p>

        <button
          className='text-sm border rounded py-1 px-2 hover:bg-[#fafafa]'
          onClick={() => create_thread(domain_id)}
        >
          Create new thread
        </button>
      </div>

      {threads && threads.length > 0 && (
        <ul className='list-none mt-8 p-0' id='thread-section'>
          {threads.map((thread) => {
            return (
              <li
                key={thread.thread_id}
                className='border rounded py-1 px-2 mb-2 flex'
              >
                <p className='mr-6 font-medium'>Id# {thread.thread_id}</p>
                <p className='mr-6 font-medium'>{thread.thread_name}</p>
                <Link
                  href={`/dashboard/edit-thread/${thread.thread_id}`}
                  className='underline underline-offset-2 mr-4'
                >
                  Edit
                </Link>
                <Link
                  href={`/dashboard/delete-thread/${thread.thread_id}`}
                  className='underline underline-offset-2'
                >
                  Delete
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
