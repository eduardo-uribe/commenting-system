'use client';
import { useRouter } from 'next/navigation';

export default function Select({
  domains,
  site,
}: {
  domains: any;
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
    <div className='mt-12'>
      <label htmlFor='domains' className='mr-2'>
        Domain:
      </label>
      <select
        name='domains'
        id='domain-select'
        className='p-2 rounded'
        onChange={handleChange}
        defaultValue={site}
      >
        <option value='' className='font-sans'>
          Select a domain
        </option>
        {domains.map((domain: any) => {
          return (
            <option
              value={domain.domain_id}
              key={domain.domain_id}
              className='font-sans'
            >
              {domain.domain_address}
            </option>
          );
        })}
      </select>
    </div>
  );
}
