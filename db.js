const mysql = require("mysql2/promise");

const conexaoBanco = mysql.createPool({
  host: "localhost",   
  user: "root",        
  password: "",        
  database: "clinica_medica",
});

module.exports = conexaoBanco;
