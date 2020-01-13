import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import start from './db/MongoStarter';
import { getAbsoluteFSPath } from 'swagger-ui-dist';
import replace from 'replace';
import path from 'path';
import cors from 'cors';
import config from '../../config'

start();

const app = express();
const swaggerUiAssetPath = getAbsoluteFSPath();

// replace url, see: https://github.com/swagger-api/swagger-ui/issues/3335#issuecomment-377906299
replace({
    regex: 'http.*swagger.json',
    replacement : 'http://localhost:' + config.API_SERVER_PORT + config.API_SWAGGER_BASE_PATH + '/salesmen.json',
    paths: [ path.join(swaggerUiAssetPath, 'index.html') ],
    recursive: false,
    silent: true,
});

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use(function(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    next();
});

app.use(routes.auth);

app.use(config.API_SALESMAN_BASE_PATH, routes.order);
app.use(config.API_SALESMAN_BASE_PATH, routes.report);
app.use(config.API_SALESMAN_BASE_PATH, routes.salesmen);
app.use(config.API_SALESMAN_BASE_PATH, routes.socialEvaluation);

app.use(config.API_SWAGGER_BASE_PATH, express.static(swaggerUiAssetPath));
app.use(config.API_SWAGGER_BASE_PATH, express.static('src/server/swagger'));

app.listen(config.API_SERVER_PORT, () =>
    console.log(`Example app listening on port ${config.API_SERVER_PORT}!`),
);
