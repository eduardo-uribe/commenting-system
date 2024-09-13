'use client';

import { reply } from '@/actions/dashboard';

export default function ReplyForm({
  setShowReplyForm,
  showReplyForm,
  firstname,
  comment_parent_id,
  comment_thread_id,
}: {
  setShowReplyForm: any;
  showReplyForm: boolean;
  firstname: string;
  comment_parent_id: number;
  comment_thread_id: number;
}) {
  const replyToComment = reply;
  const replyToParentComment = replyToComment.bind(
    null,
    comment_parent_id,
    comment_thread_id
  );

  return (
    <form
      className='border rounded-[0.1rem] p-[0.5rem] mt-4'
      action={replyToParentComment}
    >
      <label htmlFor='author' className='block font-medium text-[#8C8C8D] mb-1'>
        Author:
      </label>
      <input
        type='text'
        name='author'
        id='author'
        defaultValue={firstname}
        className='block border border-[#eee] rounded w-full p-2 mb-4 text-[#7D7E80]'
      />
      <textarea
        name='comment'
        id='comment'
        className='border border-[#eee] rounded-[0.1rem] block p-[0.25rem] w-full'
        required
        placeholder='Any thoughts or comments, share them here?'
      ></textarea>
      <button
        type='submit'
        className='border-none bg-[#eee] mt-4 py-1 px-3 mr-2'
      >
        Accept and reply
      </button>
      <button
        className='border-none bg-[#eee] mt-4 py-1 px-3'
        onClick={(event) => setShowReplyForm(!showReplyForm)}
      >
        Cancel
      </button>
    </form>
  );
}
