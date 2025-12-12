"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executarComandoSQL = executarComandoSQL;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // DEVE estar ANTES de tudo
const mysql2_1 = __importDefault(require("mysql2"));
console.log('🔧 Configurando conexão MySQL...');
console.log('Host:', process.env.MYSQLHOST);
console.log('Port:', process.env.MYSQLPORT);
console.log('Database:', process.env.MYSQLDATABASE);
console.log('User:', process.env.MYSQLUSER);
const dbConfig = {
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT),
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
};
const mysqlConnection = mysql2_1.default.createConnection(dbConfig);
mysqlConnection.connect((err) => {
    if (err) {
        console.error('❌ Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('✅ Conexao bem-sucedida com o banco de dados MYSQL');
});
function executarComandoSQL(query, valores) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('❌ Erro ao executar a query:', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}
