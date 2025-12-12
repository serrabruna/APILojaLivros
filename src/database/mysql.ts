import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
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

export async function executarComandoSQL(query: string, valores: any[] = []): Promise<any> {
    try {
        const [resultado] = await pool.execute(query, valores);
        return resultado;
    } catch (error) {
        console.error('❌ Erro na query:', query);
        console.error('Detalhe:', error);
        throw error;
    }
}