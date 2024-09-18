import Link from 'next/link';

export default function Page() {
  return (
    <main className='max-w-[52ch] m-auto pt-24 mb-24'>
      <p>Commenting System</p>
      <ul className='pt-2 flex'>
        <li>
          <Link href='/blog' className='mr-4 text-gray-500 text-sm'>
            Blog
          </Link>
        </li>
        <li>
          <Link href='/sign-in' className='mr-4 text-gray-500 text-sm'>
            Sign in
          </Link>
        </li>
        <li>
          <Link href='/sign-up'>
            <button className='py-1 px-2 bg-[#EEE] text-gray-950 rounded text-sm'>
              Start your 14-day free trial
            </button>
          </Link>
        </li>
      </ul>
      <p className='mt-12 text-[#8C8C8D]'>
        Encourage feedback, questions, and discussion with a commenting system.
      </p>

      <Thread />

      <h2 className='font-medium'>Bare and functional moderation dashboard</h2>
      <p className='text-[#8C8C8D]'>
        Accept, delete, and respond to comments from one place.
      </p>
      <section id='comment-system' className='mt-8 border rounded p-2'>
        <h1>Moderation dashboard</h1>
        <p>
          New comments <span className='self-center mx-2'>&#8226;</span> 3
        </p>
        <ul className='list-none mt-8 p-0 border-l-[1px] border-[#eee]'>
          <li className='pl-3 [&:not(:first-child)]:mt-12'>
            <article className='comment'>
              <div className='flex'>
                <p className='mr-4'>Marcus Aurelius</p>
                <span className='block self-center mr-4 text-[#c3c3c3]'>
                  &#8226;
                </span>
                <time className='self-end text-[#c0c0c0]'>3 days ago</time>
              </div>
              <p className='mt-2 leading-6'>
                You have power over your mind - not outside events. Realize
                this, and you will find strength.
              </p>
              <button
                className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'
                disabled
              >
                Reply
              </button>
              <button
                className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'
                disabled
              >
                Accept
              </button>
              <button
                className='border-none bg-[#eee] mt-4 py-1 px-3 text-sm'
                disabled
              >
                Delete
              </button>
            </article>
          </li>
          <li className='pl-3 [&:not(:first-child)]:mt-12'>
            <article className='comment'>
              <div className='flex'>
                <p className='mr-4'>Seneca</p>
                <span className='block self-center mr-4 text-[#c3c3c3]'>
                  &#8226;
                </span>
                <time className='self-end text-[#c0c0c0]'>2 days ago</time>
              </div>
              <p className='mt-2 leading-6'>
                We suffer more often in imagination than in reality.
              </p>
              <button
                className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'
                disabled
              >
                Reply
              </button>
              <button
                className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'
                disabled
              >
                Accept
              </button>
              <button
                className='border-none bg-[#eee] mt-4 py-1 px-3 text-sm'
                disabled
              >
                Delete
              </button>
            </article>
          </li>
          <li className='pl-3 [&:not(:first-child)]:mt-12'>
            <article className='comment'>
              <div className='flex'>
                <p className='mr-4'>Internet stranger</p>
                <span className='block self-center mr-4 text-[#c3c3c3]'>
                  &#8226;
                </span>
                <time className='self-end text-[#c0c0c0]'>Today</time>
              </div>
              <p className='mt-2 leading-6'>
                Non est ad astra mollis e terris via - There is no easy way from
                the earth to the stars.
              </p>
              <button
                className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'
                disabled
              >
                Reply
              </button>
              <button
                className='border-none bg-[#eee] mt-4 mr-4 py-1 px-3 text-sm'
                disabled
              >
                Accept
              </button>
              <button
                className='border-none bg-[#eee] mt-4 py-1 px-3 text-sm'
                disabled
              >
                Delete
              </button>
            </article>
            <form className='border rounded-[0.1rem] p-[0.5rem] mt-4'>
              <label
                htmlFor='author'
                className='block font-medium text-[#8C8C8D] mb-1'
              >
                Author:
              </label>
              <input
                type='text'
                name='author'
                id='author'
                defaultValue='Me'
                readOnly
                className='block border border-[#eee] rounded w-full p-2 mb-4 text-[#7D7E80]'
              />
              <textarea
                name='comment'
                id='comment'
                className='border border-[#eee] rounded-[0.1rem] block p-[0.25rem] w-full'
                required
                // placeholder='Any thoughts or comments, share them here?'
                defaultValue={'What does that even mean?'}
                readOnly
              ></textarea>
              <button
                type='submit'
                className='border-none bg-[#eee] mt-4 py-1 px-3 mr-2 text-sm'
                disabled
              >
                Accept and reply
              </button>
              <button
                className='border-none bg-[#eee] mt-4 py-1 px-3 text-sm'
                disabled
              >
                Cancel
              </button>
            </form>
          </li>
        </ul>
      </section>

      <h2 className='mt-12'>Have questions?</h2>
      <p className='text-[#8C8C8D] inline-block'>
        We might have answers, email us at {''}
        <a
          href='mailto:suppor@commentingsystem.com'
          className='text-indigo-800 underline underline-offset-4'
        >
          support@commentingsystem.com
        </a>
      </p>
    </main>
  );
}

function Thread() {
  return (
    <section
      id='comment-system'
      className='mt-8 border border-[#eee] rounded-sm p-4 mb-12'
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
