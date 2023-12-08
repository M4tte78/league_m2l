const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10, // ajustez le nombre maximum de connexions selon vos besoins
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Assurez-vous que votre code se connecte correctement à la base de données
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données.');

  // Libérer la connexion après utilisation
  connection.release();
});

module.exports = pool;
