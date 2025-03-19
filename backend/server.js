const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const db = require('./src/config/database');
const responseRoutes = require('./src/routes/responseRoutes');
const webhookRoutes = require('./src/routes/webhookRoutes');

const app = express();
app.use(bodyParser.json());

db.sync()
  .then(() => console.log("Database connected & synced"))
  .catch((err) => logger.error("Database error: " + err.message));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 30, // Maksimal 30 request per menit per IP
  message: "Terlalu banyak request, coba lagi nanti."
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

app.use(cors());
app.use(helmet());
app.use('/responses', responseRoutes);
app.use('/webhook', limiter, webhookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));