'use client';

import Link from 'next/link';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSignUp } from '@clerk/nextjs';
import { useState } from 'react';

type Props = {
  setVerifying: (val: boolean) => void;
};

function SignUpForm({ setVerifying }: Props) {
  const { isLoaded, signUp } = useSignUp();
  const stripe = useStripe();
  const elements = useElements();
  const priceId =
    process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_ESSENTIALS_PRICE_ID;
  const [email, setEmail] = useState('');

  // 👉 Handles the sign-up process, including storing the card token and price id into the users metadata
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!isLoaded && !signUp) return null;

    try {
      if (!elements || !stripe) {
        return;
      }

      let cardToken = '';
      const cardEl = elements?.getElement('card');
      if (cardEl) {
        const res = await stripe?.createToken(cardEl);
        cardToken = res?.token?.id || '';
      }

      await signUp.create({
        emailAddress: email,
        unsafeMetadata: {
          cardToken,
          priceId,
        },
      });

      // 👉 Start the verification - an email will be sent with an OTP code
      await signUp.prepareEmailAddressVerification();

      // 👉 Set verifying to true to display second form and capture the OTP code
      setVerifying(true);
    } catch (err) {
      // 👉 Something went wrong...
      console.log(err);
    }
  }

  return (
    <>
      <h1 className='mb-4'>Commenting System</h1>
      <form onSubmit={onSubmit} className='border rounded p-3'>
        <h2 className='font-medium text-sm mb-1'>Create an account</h2>
        <p className='text-sm mb-4 text-[#8C8C8D]'>
          Encourage your audience to share feedback, ask questions, and
          participate in discussions with a commenting system.
        </p>
        {/* // 👉  Email input */}
        <div>
          <label htmlFor='emailAddress' className='text-sm font-medium'>
            Email address
          </label>
          <input
            type='email'
            name='emailAddress'
            id='emailAddress'
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className='border rounded p-2 text-sm w-full mt-1 mb-4'
          />
        </div>

        {/* // 👉 Product selection radio group */}
        <div>
          {/* <Label>Select tier</Label> */}
          <h3 className='text-sm font-medium'>Select tier</h3>
          <input
            type='radio'
            name='essential'
            id='essential'
            className='mr-1'
            value={priceId}
            readOnly
            checked
          />
          <label htmlFor='essential' className='text-sm'>
            Essentials $10/mo
          </label>
        </div>

        {/* // 👉 Use Stripe Elements to render the card capture form */}
        <h3 className='text-sm font-medium mt-4 mb-2'>Payment details</h3>
        <div className='rounded border p-2 mb-4'>
          <CardElement />
        </div>
        <div>
          <button
            type='submit'
            disabled={!isLoaded}
            className='block bg-black text-white rounded font-normal text-sm py-2 w-full mt-6'
          >
            Sign up for a 14-day free trial
          </button>
          <button className='block text-xs font-medium hover:underline hover:underline-offset-4 w-full mt-4'>
            <Link href='/sign-in'>Already have an account? Sign in</Link>
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
