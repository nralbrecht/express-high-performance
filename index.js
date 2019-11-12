import express from 'express';
import routes from './routes';

const app = express();
const PORT = 8080;
const MONGO_CONNECTION_STRING = "mongodb://localhost:27127/supermongo";

app.use('/salesmen', routes.salesmen);
app.use('/evaluation-record', routes.evaluationRecord);

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
