import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import routes from './routes';
import swaggerSetup from './swagger';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(routes());

// Setup Swagger
swaggerSetup(app);

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});