import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import start from './models/MongoStarter'

start();

const app = express();
const PORT = 8080;

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json());

app.use('/salesmen', routes.order)
app.use('/salesmen', routes.report)
app.use('/salesmen', routes.salesmen)
app.use('/salesmen', routes.socialEvaluation)

app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
);
