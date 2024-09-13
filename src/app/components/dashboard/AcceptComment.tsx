'use client';

import { acceptComment } from '@/actions/dashboard';

export default function AcceptComment({ comment_id }: { comment_id: number }) {
  async function acceptCommentFromModerationDashboard(comment_id: number) {
    await acceptComment(comment_id);
  }

  return (
    <button
      className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'
      onClick={async () => {
        acceptCommentFromModerationDashboard(comment_id);
      }}
    >
      Accept
    </button>
  );
}
