const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./src/config/database');
const responseRoutes = require('./src/routes/responseRoutes');
const webhookRoutes = require('./src/routes/webhookRoutes');

const app = express();
app.use(bodyParser.json());

db.sync()
  .then(() => console.log("Database connected & synced"))
  .catch((err) => console.error("Database sync error:", err));

app.use('/responses', responseRoutes);
app.use('/webhook', webhookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));