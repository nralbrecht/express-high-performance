import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import start from './db/MongoStarter';
import { getAbsoluteFSPath } from 'swagger-ui-dist';
import replace from 'replace';
import path from 'path';
import { updateBonusGehalt } from "./adapters/OrangeHRMAdapter";

start();
updateBonusGehalt(90123, 301);

const app = express();
const PORT = 8080;
const swaggerUiAssetPath = getAbsoluteFSPath();

// replace url, see: https://github.com/swagger-api/swagger-ui/issues/3335#issuecomment-377906299
replace({
    regex: 'http.*swagger.json',
    replacement : 'http://localhost:' + PORT + '/swagger-ui/salesmen.json',
    paths: [ path.join(swaggerUiAssetPath, 'index.html') ],
    recursive: false,
    silent: true,
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use('/salesmen', routes.order);
app.use('/salesmen', routes.report);
app.use('/salesmen', routes.salesmen);
app.use('/salesmen', routes.socialEvaluation);

app.use('/swagger-ui', express.static(swaggerUiAssetPath))
app.use('/swagger-ui', express.static('swagger'))

app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
);
