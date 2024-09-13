'use client';

import { useState } from 'react';

import ReplyButton from './ReplyButton';
import ReplyForm from './ReplyForm';
import AcceptComment from './AcceptComment';
import DeleteComment from './DeleteComment';

export default function Comment({
  comment,
  firstname,
}: {
  comment: any;
  firstname: string;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <li className='pl-3 [&:not(:first-child)]:mt-12' key={comment.comment_id}>
      <article
        className='comment'
        data-comment-id={comment.comment_id}
        data-thread-id={comment.comment_thread_id}
      >
        <div className='flex'>
          <p className='mr-4'>{comment.comment_author}</p>
          <span className='block self-center mr-4 text-[#c3c3c3]'>&#8226;</span>
          <time className='self-end text-[#c0c0c0]'>
            {comment.comment_date_created}
          </time>
        </div>
        <p className='mt-2 leading-6'>{comment.comment_content}</p>
        <ReplyButton
          setShowReplyForm={setShowReplyForm}
          showReplyForm={showReplyForm}
        />
        <AcceptComment comment_id={comment.comment_id} />
        <DeleteComment comment_id={comment.comment_id} />
      </article>
      {showReplyForm && (
        <ReplyForm
          setShowReplyForm={setShowReplyForm}
          showReplyForm={showReplyForm}
          firstname={firstname}
          comment_parent_id={comment.comment_id}
          comment_thread_id={comment.comment_thread_id}
        />
      )}
    </li>
  );
}
