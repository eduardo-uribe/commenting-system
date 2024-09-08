import { SignOutButton } from '@clerk/nextjs';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';

import { Select } from '../components/dashboard/Select';

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
async function readUnapprovedComments(websiteURL: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql(
    `SELECT *
    FROM comment
    WHERE comment_thread_id IN (
      SELECT thread_id
      FROM thread
      WHERE thread_owner_id = (
        SELECT website_id
        FROM website
        WHERE website_url = $1
      )
    );`,
    [websiteURL]
  );

  return result;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { url?: string };
}) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) redirect('/sign-in');

  let registered_websites = await readRegisteredWebsites(userId);
  let unapproved_comments;

  if (searchParams?.url) {
    unapproved_comments = await readUnapprovedComments(searchParams?.url);
  }

  let selectedModerationDashboard = searchParams?.url || false;

  return (
    <main className='max-w-[62ch] m-auto pt-24'>
      <Navigation />
      <Link
        href='/dashboard/create-a-new-dashboard'
        className='block mt-8 text-indigo-700 underline'
      >
        Create a new dashboard
      </Link>
      <Select registered_websites={registered_websites} />

      {selectedModerationDashboard && (
        <ModerationDashboard comments={unapproved_comments!} />
      )}
    </main>
  );
}

function Navigation() {
  return (
    <nav>
      <p>Comment System</p>
      <ul className='flex mt-2'>
        <li className='mr-4'>
          <Link href='#' className='underline'>
            Documentation
          </Link>
        </li>
        <li>
          <SignOutButton>Sign out</SignOutButton>
        </li>
      </ul>
    </nav>
  );
}

function ModerationDashboard({
  comments,
}: {
  comments: Record<string, any>[];
}) {
  return (
    <section id='comment-system' className='mt-28 border rounded p-2'>
      <h1>Moderation Dashboard</h1>
      <p>
        New comments <span className='self-center mx-2'>&#8226;</span>{' '}
        {comments.length}
      </p>

      <ul className='list-none mt-8 p-0 border-l-[1px] border-[#eee]'>
        {comments.map((comment) => {
          return (
            <li
              className='pl-3 [&:not(:first-child)]:mt-12'
              key={comment.comment_id}
            >
              <article className='comment'>
                <div className='flex'>
                  <p className='mr-4'>{comment.comment_author_id}</p>
                  <span className='block self-center mr-4 text-[#c3c3c3]'>
                    &#8226;
                  </span>
                  <time className='self-end text-[#c0c0c0]'>
                    {/* {comment.comment_date_created} */}
                    Hard coded date.
                  </time>
                </div>
                <p className='mt-2 leading-6'>{comment.comment_content}</p>
                <button className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'>
                  Reply
                </button>
                <button className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'>
                  Accept
                </button>
                <button className='border-none bg-[#eee] mt-4 py-1 px-3 text-sm'>
                  Delete
                </button>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
