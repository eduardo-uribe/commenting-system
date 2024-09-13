import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function VerificationForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState('');
  const router = useRouter();

  // 👉 Handles the verification process once the user has entered the validation code from email
  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();

    console.log('IN HANDLE VERIFICATION FUNCTION');
    if (!isLoaded && !signUp) return null;

    try {
      // 👉 Use the code provided by the user and attempt verification
      const signInAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // 👉 If verification was completed, set the session to active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push('/after-sign-up');
      } else {
        // 👉 If the status is not complete. User may need to complete further steps.
        console.log('STUCK IN THE ELSE CLAUSE.');
        console.log(signInAttempt.status);
      }
    } catch (err) {
      // 👉 Something went wrong...
      console.log('ERROR IN VERIFYING EMAILED CODE.');
      console.log(err);
    }
  }

  return (
    <div className='mt-20 w-[42ch] m-auto'>
      <h1 className='mb-4'>Commenting System</h1>
      <form onSubmit={handleVerification} className='border rounded p-3'>
        <h1 className='text-sm font-medium mb-1'>
          Quickly confirm it&lsquo;s you
        </h1>
        <p className='text-sm mb-6 text-[#8C8C8D]'>
          We emailed you a one-time password to confirm it&lsquo;s you creating
          an account
        </p>
        <label htmlFor='code' className='block text-sm font-medium'>
          Enter your verification code
        </label>
        <input
          type='text'
          name='code'
          id='code'
          required
          value={code}
          onChange={(event) => setCode(event.target.value)}
          className='block border rounded w-full p-2 text-sm mb-2 mt-1'
        />
        <button
          type='submit'
          disabled={!isLoaded}
          className='w-full bg-black text-white p-2 rounded text-sm'
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default VerificationForm;
