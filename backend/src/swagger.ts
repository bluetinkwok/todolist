import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo List API',
            version: '1.0.0',
            description: 'This is a simple Todo List API',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

export default (app: Express): void => {
    if (process.env.NODE_ENV === 'development') {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        console.log(`Swagger docs available at http://localhost:8080/api-docs`);
    }
};