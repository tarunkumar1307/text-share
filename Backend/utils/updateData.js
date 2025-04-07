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

export const updateData = (client, content, id, res) => {
  const qurey = "UPDATE instance SET data = $1 WHERE id = $2";
  const values = [content, id];
  try {
    const result = client.query(qurey, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No rows updated" });
    } else return res.status(200).json({ message: "Row updated successfully" });
  } catch (err) {
    console.error("Error updating context:", err);
    return res.status(500).json({ error: "Failed to update context" });
  }
};
