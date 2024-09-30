'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignOutButton } from '@clerk/nextjs';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <p>Commenting System</p>

      <ul className='flex'>
        <li>
          <Link
            href='/dashboard/register-domain'
            className={`mr-4 ${
              pathname === '/register-domain' ? 'font-semibold underline' : ''
            }`}
          >
            Register domain
          </Link>
        </li>
        <li>
          <Link
            href='/dashboard/documentation'
            className={`mr-4 ${
              pathname === '/dashboard/documentation'
                ? 'font-semibold underline'
                : ''
            }`}
          >
            Documentation
          </Link>
        </li>
        <li>
          <Link
            href='/dashboard'
            className={`mr-4 ${
              pathname === '/dashboard' ? 'font-semibold underline' : ''
            }`}
          >
            Dashboard
          </Link>
        </li>

        <li>
          <SignOutButton>
            <a className='cursor-pointer'>Sign out</a>
          </SignOutButton>
        </li>
      </ul>
    </nav>
  );
}
