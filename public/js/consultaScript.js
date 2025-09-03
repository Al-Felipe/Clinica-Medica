async function carregarConsultas() {
  try {
    const res = await fetch("/pacientes");
    const pacientes = await res.json();

    const tabela = document.getElementById("tabelaConsultas");

    pacientes.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${new Date(p.data_de_agendamento).toLocaleDateString()}</td>
        <td>${p.nome}</td>
        <td>${p.cpf}</td>
        <td>${p.telefone}</td>
        <td>${p.email}</td>
        <td>${p.genero}</td>
      `;
      tabela.appendChild(tr);
    });
  } catch (err) {
    console.error("Erro ao carregar consultas:", err);
  }
}

carregarConsultas();
