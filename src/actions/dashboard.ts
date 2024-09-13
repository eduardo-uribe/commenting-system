'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteComment(comment_id: number) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    await sql(`DELETE FROM comment WHERE comment_id = ($1)`, [comment_id]);

    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);
  }
}

export async function acceptComment(comment_id: number) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    await sql(
      `UPDATE comment SET comment_accepted = TRUE WHERE comment_id = ($1)`,
      [comment_id]
    );

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
    const sql = neon(process.env.DATABASE_URL!);

    const comment = {
      comment_author: formData.get('author'),
      comment_content: formData.get('comment'),
      comment_parent_id,
      comment_thread_id,
      comment_accepted: true,
    };

    // insert reply comment
    await sql(
      `INSERT INTO comment (comment_parent_id, comment_author, comment_thread_id, comment_content, comment_accepted)
      VALUES ($1, $2, $3, $4, $5)`,
      [
        comment.comment_parent_id,
        comment.comment_author,
        comment.comment_thread_id,
        comment.comment_content,
        comment.comment_accepted,
      ]
    );

    // accept parent comment
    await sql(
      `UPDATE comment SET comment_accepted = TRUE WHERE comment_id = ($1)`,
      [comment.comment_parent_id]
    );

    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);
  }
}

export async function createWebsite(
  website_owner_id: string,
  formData: FormData
) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const raw_form_data = {
      website_url: formData.get('url'),
      website_api_key: formData.get('api-key'),
    };

    await sql(
      `INSERT INTO website (website_url, website_api_key, website_owner_id) VALUES ($1, $2, $3)`,
      [
        raw_form_data.website_url,
        raw_form_data.website_api_key,
        website_owner_id,
      ]
    );
  } catch (error) {
    console.log(error);
  }

  redirect('/dashboard');
}

export async function createThread(websiteId: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    await sql(`INSERT INTO thread (thread_owner_id) VALUES ($1)`, [websiteId]);

    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);
  }
}
