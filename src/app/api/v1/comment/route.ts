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

    // authenticate api key provided by the client request object
    const valid_key = await valid_api_key(origin, api_key);

    if (valid_key) {
      let comment = await request.json();
      await create_new_comment(comment);

      return new Response('comment created', {
        status: 200,
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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '7200',
    },
  });
}
