'use client';

import ThreadDashboard from './ThreadDashboard';
import ModerationDashboard from './ModerationDashboard';

import { useState } from 'react';

export default function DashboardNavigation({
  comments,
  firstname,
  threads,
  websiteId,
}: {
  comments: Record<string, any>[] | undefined;
  firstname: string;
  threads: Record<string, any>[] | undefined;
  websiteId: string | undefined;
}) {
  const [moderationSelected, setModerationSelected] = useState(true);

  return (
    <>
      <section id='comment-system' className='mt-16 border rounded p-2'>
        <button
          className={`border rounded py-1 px-4 mr-4 ${
            moderationSelected ? 'bg-[#eee]' : ''
          }`}
          onClick={() => setModerationSelected(true)}
        >
          Moderation dashboard
        </button>
        <button
          className={`border rounded py-1 px-4 mr-4 ${
            moderationSelected ? '' : 'bg-[#eee]'
          }`}
          onClick={() => setModerationSelected(false)}
        >
          Threads dashboard
        </button>
      </section>

      {moderationSelected ? (
        <ModerationDashboard comments={comments} firstname={firstname} />
      ) : (
        <ThreadDashboard threads={threads} websiteId={websiteId} />
      )}
    </>
  );
}
