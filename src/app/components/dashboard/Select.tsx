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
    const websiteId = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (websiteId) {
      params.set('url', websiteId);
    } else {
      params.delete('url');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <select
        name='domains'
        id='domain-select'
        className='mt-1 p-2 border rounded font-sans bg-transparent'
        onChange={handleChange}
      >
        <option value='' className='font-sans bg-transparent'>
          Select your website
        </option>
        {registered_websites.map((website) => {
          return (
            <option
              value={website.website_id}
              key={website.website_id}
              className='font-sans bg-transparent'
            >
              {website.website_url}
            </option>
          );
        })}
      </select>
    </>
  );
}
