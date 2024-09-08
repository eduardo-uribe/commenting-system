'use client';

// import { Icons } from '@/components/ui/icons';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function AfterSignUp() {
  const router = useRouter();
  const { user } = useUser();

  // 👉 Poll the user data until a stripeSubscriptionId is available
  useEffect(() => {
    async function init() {
      console.log('INSIDE THE USE EFFECT HOOK'); // development mode
      console.log(user?.publicMetadata.stripeSubscriptionId); // development mode
      while (!user?.publicMetadata?.stripeSubscriptionId) {
        await sleep(2000);
        await user?.reload();
      }
      // 👉 Once available, redirect to /dashboard
      router.push('/dashboard');
    }

    init();
  }, []);

  return (
    <div className='mt-20 flex items-center justify-center'>
      {/* <Icons.spinner className='size-8 animate-spin' /> */}
      <p>Page: /after-sign-up</p>
      <p>Loading</p>
    </div>
  );
}

export default AfterSignUp;
