'use client';

import { delete_comment } from '@/actions/dashboard';

export default function DeleteComment({ comment_id }: { comment_id: number }) {
  return (
    <button
      className='border-none bg-[#eee] mt-4 py-1 px-3 text-sm'
      onClick={async () => {
        await delete_comment(comment_id);
      }}
    >
      Delete
    </button>
  );
}
