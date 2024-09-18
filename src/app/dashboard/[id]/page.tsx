import { redirect } from 'next/navigation';
import Link from 'next/link';

import { auth, currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';

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

  let registered_websites = await readRegisteredWebsites(userId);
  let selected_site;
  let comments;
  let threads;
  let websiteId;

  if (params?.id) {
    websiteId = params?.id;

    const websiteHasThreads = await hasThreads(websiteId);
    const websiteHasComments = await hasComments(websiteId);

    if (websiteHasThreads) {
      threads = await readThreads(websiteId);
    }

    if (websiteHasComments) {
      comments = await readComments(websiteId);
    }
  }

  return (
    <main className='max-w-[52ch] m-auto pt-24'>
      <Navigation />

      <section className='border rounded p-2 mt-28'>
        <div className='flex justify-between'>
          <h2 className='font-medium'>Dashboard</h2>
          <Link
            href='/dashboard/create-a-new-dashboard'
            className='text-indigo-800 underline underline-offset-4 text-sm'
          >
            New Dashboard
          </Link>
        </div>
        <Select registered_websites={registered_websites} site={params?.id} />

        {params?.id && <DashboardNavigation />}
        {searchParams.view === 'dashboard' && (
          <ModerationDashboard comments={comments} firstname={firstname} />
        )}
        {searchParams.view === 'threads' && (
          <ThreadDashboard threads={threads} websiteId={websiteId!} />
        )}
      </section>
    </main>
  );
}

// get customers registered websites
async function readRegisteredWebsites(userId: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql(
    `SELECT * FROM website WHERE website_owner_id = $1`,
    [userId]
  );

  return result;
}

// Read all comments that have yet to be approved
async function readComments(websiteId: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql(
    `SELECT
      comment_id,
      comment_author,
      comment_parent_id,
      comment_thread_id,
      comment_content,
      TO_CHAR(comment_date_created, 'Day,Month FMDD YYYY') AS comment_date_created,
      TO_CHAR(comment_date_updated, 'Day,Month FMDD YYYY') AS comment_date_updated
    FROM comment
    WHERE comment_thread_id IN (
      SELECT thread_id
      FROM thread
      WHERE thread_owner_id::int = (
        SELECT website_id
        FROM website
        WHERE website_id = $1
      )
    ) 
    AND comment_accepted = FALSE
    ORDER BY comment_date_created DESC
      ;`,
    [websiteId]
  );

  return result;
}

async function readThreads(websiteId: string) {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const result = await sql(
      `SELECT * FROM thread WHERE thread_owner_id = ($1) ORDER BY thread_date_created DESC`,
      [websiteId]
    );

    return result;
  } catch (error) {
    console.log(error);
  }
}

// first check if any threads exists for the provided website id
async function hasThreads(websiteId: string): Promise<boolean> {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql(
      `SELECT EXISTS (SELECT 1 FROM thread WHERE thread_owner_id = ($1))`,
      [websiteId]
    );

    const boolean = result[0].exists;

    return boolean;
  } catch (error) {
    console.log(error);
  }

  // if the try/catch fails return false by default
  return false;
}

async function hasComments(websiteId: string): Promise<boolean> {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql(
      `SELECT EXISTS (
        SELECT *
        FROM comment
        WHERE comment_thread_id IN (
          SELECT thread_id
          FROM thread
          WHERE thread_owner_id::int = (
            SELECT website_id
            FROM website
            WHERE website.website_id = ($1)
          )
        ) 
        AND comment_accepted = FALSE
        );`,
      [websiteId]
    );

    const boolean = result[0].exists;

    return boolean;
  } catch (error) {
    console.log(error);
  }

  // if the try/catch fails return false by default
  return false;
}
