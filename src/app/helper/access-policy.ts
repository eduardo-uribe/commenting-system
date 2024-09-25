import turso from '../library/turso';

// authenticate request client
export async function valid_api_key(
  domain: string,
  api_key: string
): Promise<boolean> {
  try {
    // query database for domain metadata
    const { rows } = await turso.execute({
      sql: `SELECT * FROM domain WHERE domain.domain_address = ?`,
      args: [domain],
    });

    if (rows.length > 0) {
      const domain_data = rows[0];
      const domain_api_key = domain_data.domain_api_key;

      if (domain_api_key === api_key) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
}

export async function valid_origin(domain: string): Promise<boolean> {
  try {
    const { rows } = await turso.execute({
      sql: `SELECT * FROM domain WHERE domain.domain_address = ?`,
      args: [domain],
    });

    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
}
