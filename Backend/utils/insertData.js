export const insetData = (client, content, res) => {
  const query = `INSERT INTO Instance (data) VALUES ($1) RETURNING id`;
  client.query(query, [content], (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      const insertedId = result.rows[0].id;
      console.log(`Data inserted successfully with ID: ${insertedId}`);
      res.status(200).json({ id: insertedId });
    }
  });
};
