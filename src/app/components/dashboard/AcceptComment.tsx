'use client';

import { accept_comment } from '@/actions/dashboard';

export default function AcceptComment({ comment_id }: { comment_id: number }) {
  return (
    <button
      className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'
      onClick={async () => {
        await accept_comment(comment_id);
      }}
    >
      Accept
    </button>
  );
}
