import turso from '../library/turso';

type Comment = {
  comment_id: string;
  comment_author: string;
  comment_parent_id: number;
  comment_content: string;
  comment_date_created: string;
  comment_date_updated: string;
  comment_replies: Comment[];
};

type NewComment = {
  comment_author: string;
  comment_parent_id: number | null;
  comment_thread_id: number;
  comment_content: string;
};

export function create_nested_comments_data_structure(comments: Comment[]) {
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

export async function read_threads(domain_id: number) {
  try {
    const { rows } = await turso.execute({
      sql: 'SELECT * FROM thread WHERE thread_owner_id = ? ORDER BY thread_date_created DESC',
      args: [domain_id],
    });

    const threads = rows?.map((row) => {
      const object: any = {};
      for (const [key, value] of Object.entries(row)) {
        object[key] = value;
      }
      return object;
    });

    return threads;
  } catch (error) {
    console.log(error);
  }
}

export async function read_domains(userId: string) {
  try {
    const { rows } = await turso.execute({
      sql: 'SELECT domain_id, domain_address FROM domain WHERE domain_owner_id = ?',
      args: [userId],
    });

    const domains = rows?.map((row) => {
      const object: any = {};
      for (const [key, value] of Object.entries(row)) {
        object[key] = value;
      }
      return object;
    });

    return domains;
  } catch (error) {
    console.log(error);
  }
}

export async function read_comments(userId: number) {
  try {
    const { rows } = await turso.execute({
      sql: `SELECT
      comment_id,
      comment_author,
      comment_parent_id,
      comment_thread_id,
      comment_content,
      strftime('%Y-%m-%e', comment_date_created)AS comment_date_created
      FROM comment
      WHERE comment_thread_id IN (
        SELECT thread_id
        FROM thread
        WHERE thread_owner_id = (
          SELECT domain_id
          FROM domain
          WHERE domain_id = 1
        )
      )
      AND comment_accepted = 'false'
      ORDER BY comment_date_created DESC;`,
      args: [],
    });

    const comments = rows?.map((row) => {
      const object: any = {};
      for (const [key, value] of Object.entries(row)) {
        object[key] = value;
      }
      return object;
    });

    return comments;
  } catch (error) {
    console.log(error);
  }
}

export async function read_thread(thread_id: number) {
  try {
    const { rows } = await turso.execute({
      sql: `SELECT * FROM thread WHERE thread.thread_id = ?`,
      args: [thread_id],
    });

    const threads = rows?.map((row) => {
      const object: any = {};
      for (const [key, value] of Object.entries(row)) {
        object[key] = value;
      }
      return object;
    });

    const thread_metadata = threads[0];

    return thread_metadata;
  } catch (error) {
    console.log(error);
  }
}

export async function create_new_comment(comment: NewComment) {
  try {
    await turso.execute({
      sql: `INSERT INTO comment (comment_author, comment_parent_id, comment_thread_id, comment_content)
      VALUES (?, ?, ?, ?)`,
      args: [
        comment.comment_author,
        comment.comment_parent_id,
        comment.comment_thread_id,
        comment.comment_content,
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

export async function read_thread_comments(thread_id: number) {
  try {
    const { rows } = await turso.execute({
      sql: `SELECT * FROM comment WHERE comment.comment_thread_id = ?`,
      args: [thread_id],
    });

    const comments = rows?.map((row) => {
      const object: any = {};
      for (const [key, value] of Object.entries(row)) {
        object[key] = value;
      }
      return object;
    });

    return comments;
  } catch (error) {
    console.log(error);
  }
}
