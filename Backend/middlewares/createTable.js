async function createTables(client) {
  try {
    // Use IF NOT EXISTS directly in the CREATE TABLE statement
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Instance (
        id SERIAL PRIMARY KEY,
        data TEXT,
        CHECK (octet_length(data) <= 100000000),
        CHECK (id BETWEEN 1000 AND 9999),
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Function can be created or replaced regardless
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      
      -- Check if trigger exists before creating it
      DO $$
      BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_trigger 
            WHERE tgname = 'set_updated_at' 
            AND tgrelid = 'instance'::regclass
        ) THEN
            CREATE TRIGGER set_updated_at
            BEFORE UPDATE ON Instance
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        END IF;
      END
      $$;
      -- Delete old rows function
      CREATE OR REPLACE FUNCTION instance_delete_old_rows() RETURNS trigger
      LANGUAGE plpgsql
      AS $$
      BEGIN
        DELETE FROM Instance WHERE timestamp < NOW() - INTERVAL '100 days';
        RETURN NEW;
      END;
      $$;

      -- Trigger
      CREATE TRIGGER instance_delete_old_rows_trigger
      AFTER INSERT ON Instance
      FOR EACH ROW
      EXECUTE FUNCTION instance_delete_old_rows();
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
