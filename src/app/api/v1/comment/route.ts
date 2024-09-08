import { neon } from '@neondatabase/serverless';

async function create(comment: any) {
  const sql = neon(process.env.DATABASE_URL as string);

  const response = await sql(
    `INSERT INTO comment (
        comment_author,
        comment_parent_id,
        comment_thread_id,
        comment_content)
    VALUES ($1, $2, $3, $4)`,
    [
      comment.comment_author,
      comment.comment_parent_id,
      comment.comment_thread_id,
      comment.comment_content,
    ]
  );

  return response;
}

// create a new comment
export async function POST(request: Request) {
  try {
    let comment = await request.json();
    await create(comment);

    // return Response.json({ message: 'comment created' });
    return new Response('comment created', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.log(error);
    return Response.json('error in comment endpoint', { status: 500 });
  }
}

export async function OPTIONS(request: Request) {
  return new Response(JSON.stringify({}), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '7200',
    },
  });
}
