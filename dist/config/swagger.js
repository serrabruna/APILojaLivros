"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const swaggerFile = path_1.default.join(__dirname, '../swagger.json');
const swaggerSpec = JSON.parse(fs_1.default.readFileSync(swaggerFile, 'utf8'));
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
const setupSwagger = (app) => {
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    app.use('/api-docs', swagger_ui_express_1.default.serve);
    app.get('/api-docs', swagger_ui_express_1.default.setup(swaggerSpec, swaggerOptions));
    console.log('Swagger configurado em /api-docs');
};
exports.setupSwagger = setupSwagger;
