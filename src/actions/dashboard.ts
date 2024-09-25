'use server';

import turso from '@/app/library/turso';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function delete_comment(comment_id: number) {
  try {
    await turso.execute({
      sql: 'DELETE FROM comment WHERE comment_id = ?',
      args: [comment_id],
    });

    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);
  }
}

export async function accept_comment(comment_id: number) {
  try {
    await turso.execute({
      sql: `UPDATE comment SET comment_accepted = 'true' WHERE comment_id = ?`,
      args: [comment_id],
    });

    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);
  }
}

export async function reply(
  comment_parent_id: number,
  comment_thread_id: number,
  formData: FormData
) {
  try {
    const comment = {
      comment_author: formData.get('author') as string,
      comment_content: formData.get('comment') as string,
      comment_parent_id,
      comment_thread_id,
      comment_accepted: 'true',
    };

    await turso.execute({
      sql: `INSERT INTO comment (comment_parent_id, comment_author, comment_thread_id, comment_content, comment_accepted)
      VALUES (?, ?, ?, ?, ?)`,
      args: [
        comment.comment_parent_id,
        comment.comment_author,
        comment.comment_thread_id,
        comment.comment_content,
        comment.comment_accepted,
      ],
    });

    // accept parent comment
    await turso.execute({
      sql: `UPDATE comment SET comment_accepted = 'true' WHERE comment_id = ?`,
      args: [comment.comment_parent_id],
    });

    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);
  }
}

export async function create_domain(
  domain_owner_id: string,
  formData: FormData
) {
  try {
    const form_data = {
      domain_address: formData.get('url') as string,
      domain_api_key: formData.get('api-key') as string,
    };

    await turso.execute({
      sql: `INSERT INTO domain (domain_address, domain_api_key, domain_owner_id) VALUES (?, ?, ?)`,
      args: [
        form_data.domain_address,
        form_data.domain_api_key,
        domain_owner_id,
      ],
    });
  } catch (error) {
    console.log(error);
  }

  redirect('/dashboard');
}

export async function create_thread(domain_id: string) {
  try {
    await turso.execute({
      sql: `INSERT INTO thread (thread_owner_id) VALUES (?)`,
      args: [domain_id],
    });

    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);
  }
}
