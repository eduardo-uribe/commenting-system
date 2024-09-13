import React, { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { auth, currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';

import Link from 'next/link';
import { Select } from '../components/dashboard/Select';
import Navigation from '../components/dashboard/Navigation';
import DashboardNavigation from '../components/dashboard/DashboardNavigation';
import Modal from '../components/dashboard/Modal';

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
async function readComments(websiteId: number) {
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
      WHERE thread_owner_id = (
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

export default async function Page({
  searchParams,
}: {
  searchParams?: { url?: string };
}) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) redirect('/sign-in');

  // persons first name
  const user = await currentUser();
  const firstname = user?.firstName || 'Internet stranger';

  let registered_websites = await readRegisteredWebsites(userId);
  let comments;
  let threads;
  let websiteId;

  if (searchParams?.url) {
    comments = await readComments(Number(searchParams?.url));
    threads = await readThreads(searchParams?.url);
    websiteId = searchParams?.url;
  }

  let selectedModerationDashboard = searchParams?.url || false;

  return (
    <main className='max-w-[52ch] m-auto pt-24'>
      <Navigation />

      <h2 className='mt-28'>Dashboard</h2>
      <Select registered_websites={registered_websites} />

      {selectedModerationDashboard && (
        <DashboardNavigation
          comments={comments!}
          firstname={firstname}
          threads={threads!}
          websiteId={websiteId!}
        />
      )}
    </main>
  );
}
