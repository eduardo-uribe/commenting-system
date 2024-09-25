'use server';

import { revalidatePath } from 'next/cache';
import turso from '@/app/library/turso';

export async function update(thread_id: number, formData: FormData) {
  try {
    const new_thread_name = formData.get('thread_name') as string;

    // update thread metadata
    await turso.execute({
      sql: `UPDATE thread SET thread_name = ? WHERE thread.thread_id = ?`,
      args: [new_thread_name, thread_id],
    });
  } catch (error) {
    console.log(error);
  }
}

export async function delete_thread(thread_id: number) {
  try {
    await turso.execute({
      sql: `DELETE FROM thread WHERE thread.thread_id = ?`,
      args: [thread_id],
    });
  } catch (error) {
    console.log(error);
  }
}
