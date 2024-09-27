import { create_new_comment } from '@/app/helper/database';
import { valid_api_key } from '@/app/helper/access-policy';
import { headers } from 'next/headers';

// create a new comment
export async function POST(request: Request) {
  try {
    const origin = headers().get('origin');
    if (!origin) return new Response(null, { status: 403 });

    const api_key = headers().get('x-api-key');
    if (!api_key) return new Response(null, { status: 403 });

    // confirm required data is included in the payload
    const new_comment_data = await request.json();

    if (
      !new_comment_data.comment_author ||
      !new_comment_data.comment_thread_id ||
      !new_comment_data.comment_content
    ) {
      return new Response('Missing required comment data', {
        status: 400,
      });
    }

    // authenticate api key provided by the client request object
    const valid_key = await valid_api_key(origin, api_key);

    if (valid_key) {
      await create_new_comment(new_comment_data);

      return new Response('comment created', {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers':
            'Content-Type, Authorization, x-api-key',
          'Access-Control-Max-Age': '7200',
        },
      });
    } else {
      return new Response(null, { status: 403 });
    }
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function OPTIONS(request: Request) {
  return new Response(JSON.stringify({}), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
      'Access-Control-Max-Age': '7200',
    },
  });
}
