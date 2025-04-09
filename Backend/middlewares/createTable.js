async function createTables(client) {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Instance (
        id SERIAL PRIMARY KEY,
        data TEXT,
        CHECK (octet_length(data) <= 100000000),
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      `;

    await client.query(createTableQuery);
    console.log("Tables setup completed successfully");
  } catch (err) {
    console.error("Error setting up tables:", err);
    throw err; // Rethrow to be handled by the middleware
  }
}

export default createTables;

export const createTableMiddleware = (client) => {
  let tablesInitialized = false;

  return async (req, res, next) => {
    try {
      // Only run the table creation on the first request
      if (!tablesInitialized) {
        await createTables(client);
        tablesInitialized = true;
      }
      console.log("Table Middleware resolved");
      next();
    } catch (err) {
      console.error("Error in createTableMiddleware:", err);
      res.status(500).json({ error: "Error setting up database tables" });
    }
  };
};
