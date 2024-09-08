import Link from 'next/link';

export default function Page() {
  return (
    <main className='max-w-[52ch] m-auto pt-24'>
      <p>Commenting System</p>
      {/* <ul className='pt-2 flex'>
        <li>
          <Link href='/sign-in' className='mr-4 text-gray-500 text-sm'>
            Sign in
          </Link>
        </li>
        <li>
          <Link href='/sign-up'>
            <button className='py-1 px-2 bg-[#EEE] text-gray-950 rounded text-sm'>
              Sign up
            </button>
          </Link>
        </li>
      </ul> */}
      <p className='mt-1 text-[#8C8C8D]'>
        Allow your audience to share feedback, ask questions, and participate in
        discussions with a commenting system.
      </p>

      <Thread />

      {/* <h2 className='font-medium'>Bare and functional moderation dashboard</h2> */}
    </main>
  );
}

function Thread() {
  return (
    <section
      id='comment-system'
      className='mt-12 border border-[#eee] rounded-sm p-4 mb-12'
    >
      <h1 className='mb-4'>
        Comments <span className='self-center mx-2'>&#8226;</span> 17
      </h1>

      {/* <form className='border rounded-[0.1rem] p-[0.5rem]'>
        <textarea
          name='comment'
          id='comment'
          className='border border-[#eee] rounded-[0.1rem] block p-[0.25rem] w-full'
          required
          disabled
          placeholder='Any thoughts or comments, share them here?'
        ></textarea>
        <button className='border-none bg-[#eee] mt-4 py-1 px-3' disabled>
          Submit
        </button>
      </form> */}

      <ul className='list-none mt-4 p-0'>
        <li className='border-l-[1px] border-[#eee] pl-3 [&:not(:first-child)]:mt-24'>
          <article className='comment'>
            <div className='flex text-sm'>
              <p className='mr-4'>Marcus Aurelius</p>
              <span className='block self-center mr-4 text-[#c3c3c3]'>
                &#8226;
              </span>
              <time className='self-end text-[#c0c0c0]'>3 days ago</time>
            </div>
            <p className='mt-4 leading-6'>
              You have power over your mind - not outside events. Realize this,
              and you will find strength.
            </p>
            <button
              className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'
              disabled
            >
              Reply
            </button>
          </article>
          <ul className='list-none mt-8 p-0'>
            <li className='border-l-[1px] border-[#eee] pl-3 [&:not(:first-child)]:mt-24'>
              <article className='comment'>
                <div className='flex text-sm'>
                  <p className='mr-4'>Seneca</p>
                  <span className='block self-center mr-4 text-[#c3c3c3]'>
                    &#8226;
                  </span>
                  <time className='self-end text-[#c0c0c0]'>2 days ago</time>
                </div>
                <p className='mt-4 leading-6'>
                  We suffer more often in imagination than in reality.
                </p>
                <button
                  className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'
                  disabled
                >
                  Reply
                </button>
              </article>
              <form className='border rounded-[0.1rem] p-[0.5rem] mt-4'>
                <textarea
                  name='comment'
                  id='comment'
                  className='border border-[#eee] rounded-[0.1rem] block p-1 w-full placeholder:text-black'
                  required
                  disabled
                  placeholder='Non est ad astra mollis e terris via" - "There is no easy way from the earth to the stars'
                ></textarea>
                <button
                  className='border-none bg-[#eee] mt-4 py-1 px-3 mr-2'
                  disabled
                >
                  Submit
                </button>
                <button
                  className='border-none bg-[#eee] mt-4 py-1 px-3'
                  disabled
                >
                  Cancel
                </button>
              </form>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  );
}
