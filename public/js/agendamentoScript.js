// Máscara para CPF e telefone
const cpfInput = document.getElementById("cpf");
const telefoneInput = document.getElementById("telefone");

cpfInput.addEventListener("input", () => {
  let v = cpfInput.value.replace(/\D/g, "");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  cpfInput.value = v;
});

telefoneInput.addEventListener("input", () => {
  let v = telefoneInput.value.replace(/\D/g, "");
  if (v.length > 10) {
    v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else {
    v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  }
  telefoneInput.value = v;
});

// Envio do formulário
document.getElementById("formAgendamento").addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value,
    cpf: cpfInput.value.replace(/\D/g, ""), // só números
    telefone: telefoneInput.value,
    email: document.getElementById("email").value,
    genero: document.getElementById("genero").value,
    data_de_agendamento: document.getElementById("data").value
  };

  try {
    const res = await fetch("/pacientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    if (res.ok) {
      const result = await res.json();
      alert(result.message || "✅ Agendamento realizado com sucesso!");
      e.target.reset();
      if (typeof carregarConsultas === "function") {
        carregarConsultas();
      }
    } else {
      const erro = await res.json();
      alert("❌ Erro: " + (erro.error || "Verifique os dados."));
    }
  } catch (err) {
    console.error("Erro no servidor:", err);
    alert("⚠️ Erro de conexão com o servidor.");
  }
});

// Função para carregar consultas
async function carregarConsultas() {
  try {
    const res = await fetch("/consultas");
    const consultas = await res.json();
    const tabela = document.getElementById("tabelaConsultas");

    tabela.innerHTML = `
      <tr>
        <th>Data Consulta</th>
        <th>Nome Paciente</th>
        <th>Telefone</th>
        <th>Médico Responsável</th>
      </tr>
    `;

    if (consultas.length === 0) {
      tabela.innerHTML += `<tr><td colspan="4" style="text-align:center">Nenhuma consulta agendada</td></tr>`;
      return;
    }

    consultas.forEach(c => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${new Date(c.data_consulta).toLocaleDateString("pt-BR")}</td>
        <td>${c.paciente_nome}</td>
        <td>${c.telefone}</td>
        <td>${c.medico_nome}</td>
      `;
      tabela.appendChild(tr);
    });

  } catch (err) {
    console.error("Erro ao carregar consultas:", err);
  }
}

// Carregar ao iniciar
carregarConsultas();
