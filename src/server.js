const app = require('./app');
const { initializeDatabase } = require('./db');

const port = process.env.PORT || 3000;

async function startServer() {
  await initializeDatabase();

  app.listen(port, '0.0.0.0', () => {
    console.log(`Tasks API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start the API:', error);
  process.exit(1);
});