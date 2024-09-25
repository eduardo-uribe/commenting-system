import {
  create_nested_comments_data_structure,
  read_thread_comments,
} from '@/app/helper/database';
import { valid_origin } from '@/app/helper/access-policy';
import { headers } from 'next/headers';

type Comment = {
  comment_id: string;
  comment_author: string;
  comment_parent_id: number;
  comment_content: string;
  comment_date_created: string;
  comment_date_updated: string;
  comment_replies: Comment[];
};

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const origin = headers().get('origin');
    if (!origin) return new Response(null, { status: 403 });

    const valid_request_origin = await valid_origin(origin);

    if (valid_request_origin) {
      // return a nested comments data structure that belong to the provided thread id
      const data = await read_thread_comments(Number(params.id));
      const comments = create_nested_comments_data_structure(data as Comment[]);
      return Response.json(comments);
    } else {
      return new Response(null, { status: 403 });
    }
  } catch (error) {
    console.log(error);
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
