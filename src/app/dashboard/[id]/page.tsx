import { redirect } from 'next/navigation';
import Link from 'next/link';

import { auth, currentUser } from '@clerk/nextjs/server';
import turso from '@/app/library/turso';
import {
  read_domains,
  read_threads,
  read_comments,
} from '@/app/helper/database';

import Select from '@/app/components/dashboard/Select';
import Navigation from '@/app/components/dashboard/Navigation';
import DashboardNavigation from '@/app/components/dashboard/DashboardNavigation';
import ModerationDashboard from '@/app/components/dashboard/ModerationDashboard';
import ThreadDashboard from '@/app/components/dashboard/ThreadDashboard';

export default async function Page({
  params,
  searchParams,
}: {
  params?: { id?: string };
  searchParams: { view: string };
}) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) redirect('/sign-in');

  const user = await currentUser();
  const firstname = user?.firstName || 'Internet stranger';

  let domains = await read_domains(userId);
  let selected_site;
  let comments;
  let threads;
  let domain_id;

  if (params?.id) {
    domain_id = params?.id;
    threads = await read_threads(Number(domain_id));
    comments = await read_comments(Number(domain_id));
  }

  return (
    <main className='max-w-[52ch] m-auto pt-24'>
      <Navigation />

      <Select domains={domains} site={params?.id} />

      <details className='mt-6'>
        <summary>Public API Key</summary>
        Public api key:
      </details>

      <section className='mt-10 border rounded p-2'>
        <div className='mb-4'>
          <Link href='?view=moderation' className='mr-2'>
            Moderation
          </Link>
          <span className='mr-2'>&#x2022;</span>
          <Link href='?view=threads'>Threads</Link>
        </div>

        {/* {params?.id && <DashboardNavigation />} */}
        {searchParams.view === 'moderation' && (
          <ModerationDashboard comments={comments} firstname={firstname} />
        )}
        {searchParams.view === 'threads' && (
          <ThreadDashboard threads={threads} domain_id={domain_id!} />
        )}
      </section>
    </main>
  );
}
