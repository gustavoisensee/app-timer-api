import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import corsOptions from './helpers/cors';

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

export default app;
