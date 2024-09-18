import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';

export default function Navigation() {
  return (
    <nav>
      <p>Comment System</p>
      <ul className='flex mt-2'>
        <li className='mr-4'>
          <Link
            href='/dashboard/documentation'
            className='hover:underline text-[#8C8C8D]'
          >
            Documentation
          </Link>
        </li>
        <li>
          <SignOutButton>
            <a className='text-[#8C8C8D] hover:underline cursor-pointer'>
              Sign out
            </a>
          </SignOutButton>
        </li>
      </ul>
    </nav>
  );
}
