import mysql from "mysql2/promise";
import type { Connection } from "mysql2/promise";

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'lectus_db'
};

const mysqlConnection = mysql.createConnection(dbConfig);

mysqlConnection.then(() => {
    console.log('Conexão bem-sucedida com o Banco de Dados MySQL');
}).catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
});

export async function executarComandoSQL(query: string, valores: any[]): Promise<any>{
    try {
        const connection = await mysqlConnection;
        const resultado = await connection.query(query, valores);
        return resultado;
    } catch(err) {
        console.error('Erro ao executar a query. ', err);
        throw err;
    }
}