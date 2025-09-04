async function carregarConsultas() {
  try {
    const res = await fetch("/pacientes");
    const pacientes = await res.json();

    const tabela = document.getElementById("tabelaConsultas");

    pacientes.forEach(p => {
      const tr = document.createElement("tr");
      tr.classList.add("border");
      tr.innerHTML = `
        <td>${new Date(p.data_de_agendamento).toLocaleDateString()}</td>
        <td>${p.nome}</td>
        <td>${p.telefone}</td>
        <td>${p.email}</td>
      `;
      tabela.appendChild(tr);
    });
  } catch (err) {
    console.error("Erro ao carregar consultas:", err);
  }
}

carregarConsultas();
