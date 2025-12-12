import dotenv from "dotenv";
dotenv.config(); // DEVE estar ANTES de tudo

import mysql, { Connection, QueryError } from 'mysql2';

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

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err) => {
    if (err) {
        console.error('❌ Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('✅ Conexao bem-sucedida com o banco de dados MYSQL');
});

export function executarComandoSQL(query: string, valores: any[]): Promise<any> {
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