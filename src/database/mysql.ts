import dotenv from "dotenv";
dotenv.config();
import mysql, { Connection, QueryError } from 'mysql2';

const dbConfig = {
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT),
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
};

console.log('🔧 Configurando conexão MySQL...');
console.log('Host:', process.env.MYSQLHOST || 'NÃO DEFINIDO');
console.log('Port:', process.env.MYSQLPORT || 'NÃO DEFINIDO');
console.log('Database:', process.env.MYSQLDATABASE || 'NÃO DEFINIDO');
console.log('User:', process.env.MYSQLUSER || 'NÃO DEFINIDO');

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err) => {
    if (err) {
        console.error('❌ Erro ao conectar ao banco de dados: ', err);
        throw err;
    }

    console.log('✅ Conexao bem-sucedida com o banco de dados MYSQL');
})

export function executarComandoSQL(query: string, valores: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
        mysqlConnection.query<any>(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query.', err);
                reject(err);
                return;
            }

            resolve(resultado);
        });
    });
}