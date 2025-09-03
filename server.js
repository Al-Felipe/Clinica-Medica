const express = require("express");
const path = require("path");
const conexaoDB = require("./db");

const server = express();
const porta = 3000;

// Middleware
server.use(express.json());
server.use(express.static(path.join(__dirname, "public")));

// ROTAS

// Home e páginas
server.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
server.get("/home.html", (req, res) => res.sendFile(path.join(__dirname, "public", "home.html")));
server.get("/agendamento.html", (req, res) => res.sendFile(path.join(__dirname, "public", "agendamento.html")));
server.get("/consulta.html", (req, res) => res.sendFile(path.join(__dirname, "public", "consulta.html")));

// LOGIN (somente exemplo local)
server.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  // Aqui você pode validar com banco se quiser
  if (usuario === "admin" && senha === "1234") {
    return res.json({ success: true, redirect: "/home.html" });
  }
  res.status(401).json({ error: "Usuário ou senha inválidos" });
});

// INSERIR PACIENTE
server.post("/pacientes", async (req, res) => {
  const { nome, cpf, telefone, email, genero, data_de_agendamento } = req.body;

  if (!nome || !cpf || !telefone || !email || !genero || !data_de_agendamento) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  try {
    const sql = `
      INSERT INTO paciente (nome, cpf, telefone, email, genero, data_de_agendamento)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await conexaoDB.execute(sql, [nome, cpf, telefone, email, genero, data_de_agendamento]);
    res.status(201).json({ message: "Paciente cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar paciente:", err);
    res.status(500).json({ error: "Erro ao salvar paciente" });
  }
});

// LISTAR PACIENTES
server.get("/pacientes", async (req, res) => {
  try {
    const [rows] = await conexaoDB.execute(
      "SELECT * FROM paciente ORDER BY data_de_agendamento DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar pacientes:", err);
    res.status(500).json({ error: "Erro ao buscar pacientes" });
  }
});

// Iniciar servidor
server.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
