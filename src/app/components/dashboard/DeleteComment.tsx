'use client';

import { deleteComment } from '@/actions/dashboard';

export default function DeleteComment({ comment_id }: { comment_id: number }) {
  async function deleteCommentFromModerationDashboard(comment_id: number) {
    await deleteComment(comment_id);
  }

  return (
    <button
      className='border-none bg-[#eee] mt-4 py-1 px-3 text-sm'
      onClick={async () => {
        deleteCommentFromModerationDashboard(comment_id);
      }}
    >
      Delete
    </button>
  );
}
