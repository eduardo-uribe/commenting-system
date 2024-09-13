export default function ReplyButton({
  setShowReplyForm,
  showReplyForm,
}: {
  setShowReplyForm: any;
  showReplyForm: boolean;
}) {
  return (
    <button
      className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'
      onClick={(event) => setShowReplyForm(!showReplyForm)}
      disabled={showReplyForm}
    >
      Reply
    </button>
  );
}
