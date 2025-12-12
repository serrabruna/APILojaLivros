"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const swaggerFilePath = path_1.default.resolve(process.cwd(), 'swagger.json');
let swaggerSpec;
try {
    if (fs_1.default.existsSync(swaggerFilePath)) {
        swaggerSpec = JSON.parse(fs_1.default.readFileSync(swaggerFilePath, 'utf8'));
    }
    else {
        console.warn('⚠️ Arquivo swagger.json não encontrado em:', swaggerFilePath);
        swaggerSpec = {};
    }
}
catch (error) {
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
const setupSwagger = (app) => {
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    if (Object.keys(swaggerSpec).length > 0) {
        app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, swaggerOptions));
        console.log('✅ Swagger configurado em /api-docs');
    }
    else {
        console.log('⚠️ Swagger não carregado (spec vazia).');
    }
};
exports.setupSwagger = setupSwagger;
