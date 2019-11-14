import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import start from './models/MongoStarter'

start();

const app = express();
const PORT = 8080;
const MONGO_CONNECTION_STRING = "mongodb://localhost:27127/supermongo";

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json());
app.use('/salesmen', routes.salesmen);
app.use('/evaluation-record', routes.evaluationRecord);

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
