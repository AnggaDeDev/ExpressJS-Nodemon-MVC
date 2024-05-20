const knex = require('knex');

// Configure knex with MySQL2
const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',       
    user: 'root',            
    password: '',    
    database: 'undira',
  },
  pool: { min: 0, max: 10 } // Adjust the pool size as needed
});

module.exports = db;
