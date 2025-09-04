// consultaScript.js

async function carregarConsultas() {
  try {
    const res = await fetch("/consultas");
    const consultas = await res.json();
    const tabela = document.getElementById("tabelaConsultas");

    // Cabeçalho da tabela
    tabela.innerHTML = `
      <tr class="row border">
        <th>Data Consulta</th>
        <th>Nome Paciente</th>
        <th>Telefone</th>
        <th>Médico Responsável</th>
      </tr>
    `;

    if (!consultas.length) {
      tabela.innerHTML += `<tr><td colspan="4" style="text-align:center">Nenhuma consulta agendada</td></tr>`;
      return;
    }

    consultas.forEach(c => {
      const tr = document.createElement("tr");
      tr.classList.add("border");

      // Formata data e telefone
      const dataFormatada = new Date(c.data_consulta).toLocaleDateString("pt-BR");
      let telefoneFormatado = c.telefone.replace(/\D/g, "");
      if (telefoneFormatado.length === 11) {
        telefoneFormatado = telefoneFormatado.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      } else if (telefoneFormatado.length === 10) {
        telefoneFormatado = telefoneFormatado.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
      }

      tr.innerHTML = `
        <td>${dataFormatada}</td>
        <td>${c.paciente_nome}</td>
        <td>${telefoneFormatado}</td>
        <td>${c.medico_nome}</td>
      `;
      tabela.appendChild(tr);
    });

  } catch (err) {
    console.error("Erro ao carregar consultas:", err);
  }
}

// Chamar a função ao iniciar a página
carregarConsultas();
