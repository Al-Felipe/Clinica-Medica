const express = require("express");
const path = require("path");
const conexaoDB = require("./db"); // sua conexão MySQL

const server = express();
const porta = 3000;

server.use(express.json());
server.use(express.static(path.join(__dirname, "public")));

// Rotas de páginas
server.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
server.get("/home.html", (req, res) => res.sendFile(path.join(__dirname, "public", "home.html")));
server.get("/agendamento.html", (req, res) => res.sendFile(path.join(__dirname, "public", "agendamento.html")));
server.get("/consulta.html", (req, res) => res.sendFile(path.join(__dirname, "public", "consulta.html")));

// Inserir paciente + consulta automática
server.post("/pacientes", async (req, res) => {
  const { nome, cpf, telefone, email, genero, data_de_agendamento } = req.body;

  if (!nome || !cpf || !telefone || !email || !genero || !data_de_agendamento) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  try {
    // Inserir paciente
    const sqlPaciente = `
      INSERT INTO paciente (nome, cpf, telefone, email, genero, data_de_agendamento)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [resultadoPaciente] = await conexaoDB.execute(sqlPaciente, [
      nome, cpf, telefone, email, genero, data_de_agendamento
    ]);

    const idPaciente = resultadoPaciente.insertId;

    // Selecionar médico aleatório
    const [medicos] = await conexaoDB.execute("SELECT * FROM medico");
    const medicoAleatorio = medicos[Math.floor(Math.random() * medicos.length)];

    // Inserir consulta
    const sqlConsulta = `
      INSERT INTO consulta (id_paciente, id_medico, data_consulta)
      VALUES (?, ?, ?)
    `;
    await conexaoDB.execute(sqlConsulta, [idPaciente, medicoAleatorio.id_medico, data_de_agendamento]);

    res.status(201).json({ message: "Paciente cadastrado com consulta atribuída!" });
  } catch (err) {
    console.error("Erro ao salvar paciente e consulta:", err);
    res.status(500).json({ error: "Erro ao salvar paciente e consulta" });
  }
});

// Listar consultas
server.get("/consultas", async (req, res) => {
  try {
    const sql = `
      SELECT 
          c.id_consulta,
          c.data_consulta,
          p.nome AS paciente_nome,
          p.telefone,
          p.email,
          COALESCE(m.nome, 'Aguardando médico') AS medico_nome
      FROM consulta c
      JOIN paciente p ON c.id_paciente = p.id_paciente
      LEFT JOIN medico m ON c.id_medico = m.id_medico
      ORDER BY c.data_consulta ASC
    `;
    const [consultas] = await conexaoDB.execute(sql);
    res.json(consultas);
  } catch (err) {
    console.error("Erro ao buscar consultas:", err);
    res.status(500).json({ error: "Erro ao buscar consultas" });
  }
});


// Iniciar servidor
server.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
