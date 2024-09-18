'use client';
import { useRouter } from 'next/navigation';

export default function Select({
  registered_websites,
  site,
}: {
  registered_websites: Record<string, any>[];
  site: string | undefined;
}) {
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const dashboard_id = event.target.value;

    if (dashboard_id) {
      router.push(`/dashboard/${dashboard_id}?view=dashboard`);
    } else {
      router.push('/dashboard/');
    }
  }

  return (
    <select
      name='domains'
      id='domain-select'
      className='mt-4 p-2 border rounded font-sans bg-transparent text-base text-[#8C8C8D]'
      onChange={handleChange}
      defaultValue={site}
    >
      <option value='' className='font-sans bg-transparent'>
        Select a dashboard
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
  );
}
