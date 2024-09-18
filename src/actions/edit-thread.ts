'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { threadId } from 'worker_threads';

export async function update(threadId: number, formData: FormData) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const new_thread_name = formData.get('thread_name');

    // update thread metadata
    const response = await sql(
      `UPDATE thread SET thread_name = $1 WHERE thread.thread_id = $2`,
      [new_thread_name, threadId]
    );
  } catch (error) {
    console.log(error);
  }
}

export async function delete_thread(threadId: number) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const result = await sql(`DELETE FROM thread WHERE thread.thread_id = $1`, [
      threadId,
    ]);
  } catch (error) {
    console.log(error);
  }
}
