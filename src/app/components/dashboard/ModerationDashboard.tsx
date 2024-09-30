import Comment from './Comment';

export default function ModerationDashboard({
  comments,
  firstname,
}: {
  comments: Record<string, any>[] | undefined;
  firstname: string;
}) {
  return (
    <div>
      <p>
        New comments <span className='self-center mx-2'>&#8226;</span>{' '}
        {comments && comments.length}
      </p>

      {comments && comments.length > 0 && (
        <ul className='list-none mt-8 p-0 border-l-[1px] border-[#eee]'>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.comment_id}
                comment={comment}
                firstname={firstname}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
