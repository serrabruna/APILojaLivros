"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executarComandoSQL = executarComandoSQL;
exports.toggleForeignKeyChecks = toggleForeignKeyChecks;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    user: process.env.DB_USER || process.env.MYSQLUSER,
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
    database: process.env.DB_NAME || process.env.MYSQLDATABASE,
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    }
});
pool.getConnection()
    .then((connection) => {
    console.log('✅ Pool de conexões MySQL configurado com sucesso!');
    connection.release();
})
    .catch((err) => {
    console.error('❌ Erro ao configurar pool MySQL:', err);
});
async function executarComandoSQL(query, valores = []) {
    try {
        const [resultado] = await pool.execute(query, valores);
        return resultado;
    }
    catch (error) {
        console.error('❌ Erro na query:', query);
        console.error('Detalhe:', error);
        throw error;
    }
}
async function toggleForeignKeyChecks(enable) {
    const valor = enable ? 1 : 0;
    await executarComandoSQL(`SET FOREIGN_KEY_CHECKS = ${valor}`, []);
    console.log(`🔧 Foreign Key Checks definidos para: ${valor}`);
}
