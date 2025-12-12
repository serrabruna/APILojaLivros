import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';
import path from 'path';
import fs from 'fs';

const swaggerFilePath = path.resolve(process.cwd(), 'swagger.json');

let swaggerSpec: any;
try {
    if (fs.existsSync(swaggerFilePath)) {
        swaggerSpec = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));
    } else {
        console.warn('⚠️ Arquivo swagger.json não encontrado em:', swaggerFilePath);
        swaggerSpec = {};
    }
} catch (error) {
    console.error('❌ Erro ao ler swagger.json:', error);
    swaggerSpec = {};
}

const swaggerOptions = {
    swaggerOptions: {
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

    if (Object.keys(swaggerSpec).length > 0) {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
        console.log('✅ Swagger configurado em /api-docs');
    } else {
        console.log('⚠️ Swagger não carregado (spec vazia).');
    }
};