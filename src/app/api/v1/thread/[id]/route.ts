import { neon } from '@neondatabase/serverless';

async function readComments(thread_id: number) {
  const sql = neon(process.env.DATABASE_URL as string);
  const response = await sql(
    `SELECT
      comment_id,
      comment_author,
      comment_parent_id,
      comment_thread_id,
      comment_content,
      TO_CHAR(comment_date_created, 'Day,Month FMDD YYYY') AS comment_date_created,
      TO_CHAR(comment_date_updated, 'Day,Month FMDD YYYY') AS comment_date_updated
    FROM comment 
    WHERE comment_thread_id = ($1)
    ORDER BY comment_date_created ASC`,
    [thread_id]
  );

  return response;
}

type Comment = {
  comment_id: string;
  comment_author: string;
  comment_parent_id: number;
  comment_content: string;
  comment_date_created: string;
  comment_date_updated: string;
  comment_replies: Comment[];
};

function buildNestedComments(comments: Comment[]) {
  const commentMap: any = {};
  const nestedComments: Comment[] = [];

  // Initialize map and attach children array to each comment
  comments.forEach((comment: Comment) => {
    comment.comment_replies = [];
    commentMap[comment.comment_id] = comment;
  });

  // Build the tree
  comments.forEach((comment) => {
    if (comment.comment_parent_id) {
      // If the comment has a parent, attach it to the parent's children array
      const parent = commentMap[comment.comment_parent_id];
      if (parent) {
        parent.comment_replies.push(comment);
      }
    } else {
      // If no parent_id, it's a root comment
      nestedComments.push(comment);
    }
  });

  return nestedComments;
}

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  // return a nested comments data structure that belong to the provided thread id
  const data = await readComments(params.id);
  const comments = buildNestedComments(data as Comment[]);

  return Response.json(comments);
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
