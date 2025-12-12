import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';
import path from 'path';
import fs from 'fs';

const swaggerFile = path.join(__dirname, '../swagger.json');
const swaggerSpec = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));

const swaggerOptions = {
    swaggerOptions: {
        url: '/swagger.json', 
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        syntaxHighlight: {
            activate: true,
            theme: 'monokai'
        }
    }
};

export const setupSwagger = (app: Express) => {
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerSpec, swaggerOptions));
    
    console.log('Swagger configurado em /api-docs');
};