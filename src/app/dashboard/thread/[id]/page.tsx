import { neon } from '@neondatabase/serverless';
import EditThreadForm from './EditThreadForm';

interface Thread {
  thread_id: number;
  thread_owner_id: number;
  thread_date_created: Date;
  thread_date_updatead: Date;
  thread_name: string;
}

export default async function Page({ params }: { params: { id: string } }) {
  const thread_id = Number(params.id);

  // read thread metadata
  const thread = await read_thread(thread_id);

  if (thread) {
    return (
      <main className='max-w-[52ch] m-auto pt-24'>
        <h1 className='mb-4'>Commenting System</h1>
        <EditThreadForm thread={thread as Thread} />
      </main>
    );
  }
}

// read thread metadata
async function read_thread(thread_id: number) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql(
      `SELECT * FROM thread WHERE thread.thread_id = $1`,
      [thread_id]
    );

    const thread_metadata = result[0];

    return thread_metadata;
  } catch (error) {
    console.log(error);
  }
}
