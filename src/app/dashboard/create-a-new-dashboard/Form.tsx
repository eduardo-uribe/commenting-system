import Link from 'next/link';

export default function Form() {
  return (
    <>
      <Link href='/dashboard' className='underline text-indigo-700'>
        https://eduardouribe.com has been registered. You can now select it in
        your dashboard.
      </Link>
    </>
  );
}
