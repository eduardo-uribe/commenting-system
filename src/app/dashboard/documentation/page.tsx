import Link from 'next/link';
import Navigation from '@/app/components/dashboard/Navigation';

export default function Page() {
  return (
    <main className='max-w-[52ch] m-auto pt-24'>
      <Navigation />

      <p className='mt-6 text-[#8C8C8D]'>
        Encourage your audience to share feedback, ask questions, and
        participate in discussions with a commenting system.
      </p>
    </main>
  );
}
