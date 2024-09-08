'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function Select({
  registered_websites,
}: {
  registered_websites: Record<string, any>[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const website_url = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (website_url) {
      params.set('url', website_url);
    } else {
      params.delete('url');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <label htmlFor='domain-select' className='block mt-4 mr-4'>
        Select a dashboard:
      </label>
      <select
        name='domains'
        id='domain-select'
        className='mt-1 py-1 px-2 rounded-sm font-sans'
        onChange={handleChange}
      >
        <option value=''>Select a dashboard</option>
        {registered_websites.map((website) => {
          return (
            <option
              value={website.website_url}
              key={website.website_id}
              className='font-sans'
            >
              {website.website_url}
            </option>
          );
        })}
      </select>
    </>
  );
}
