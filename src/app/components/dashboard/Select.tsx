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
      {domains.map((domain: any) => {
        return (
          <option
            value={domain.domain_id}
            key={domain.domain_id}
            className='font-sans bg-transparent'
          >
            {domain.domain_address}
          </option>
        );
      })}
    </select>
  );
}
