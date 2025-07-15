# Text-Share

Website for text/code sharing.

![Screenshot from 2025-04-08 10-30-56](https://github.com/user-attachments/assets/c0c9b0c8-0428-403c-9f6f-4a4ccdf6cb79)

## Introduction

Text-Share is a web application designed to facilitate the sharing of text and code snippets. The platform allows users to quickly share and access text/code snippets via a simple and intuitive interface.

## Techbase:

Frontend is built with React.js, while the backend is powered by Node.js and PostgreSQL.

<img src="https://skillicons.dev/icons?i=react,nodejs,postgres,tailwind,docker,azure&theme=dark" alt="Tech Stack" />

## Frontend

- Frontend is built with React.js.
- UI includes a textbox for inputting text/code snippets, a button to
  share the snippet
- Link can be copied to clipboard or cn be scanner using a QR code.

## Backend

- Backend is built with Node.js and Express.
- It uses PostgreSQL as the database to store the snippets.
- Postgres Trigger are used to automatically delete snippets after a 100 Days

```sql
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
```
