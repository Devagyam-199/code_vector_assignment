import 'dotenv/config';
import app from './app.js';
import pool from './database/dbConn.js';

const PORT = process.env.PORT || 3000;

pool.query('SELECT 1')
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });