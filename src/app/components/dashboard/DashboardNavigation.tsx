'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardNavigation() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const view = searchParams.get('view');

  function handleChange(view: string) {
    const params = new URLSearchParams(searchParams);

    if (view) {
      params.set('view', view);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section id='comment-system' className='mt-16 border rounded p-2'>
      <button
        className={`text-sm border rounded py-1 px-4 mr-4 ${
          view === 'dashboard' ? 'bg-[#eee]' : ''
        }`}
        onClick={() => handleChange('dashboard')}
      >
        Moderation dashboard
      </button>
      <button
        className={`text-sm border rounded py-1 px-4 mr-4 ${
          view === 'threads' ? 'bg-[#eee]' : ''
        }`}
        onClick={() => handleChange('threads')}
      >
        Threads dashboard
      </button>
    </section>
  );
}
