document.getElementById("formAgendamento").addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    telefone: document.getElementById("telefone").value,
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
      alert("Agendamento realizado com sucesso!");
      e.target.reset();
    } else {
      const erro = await res.json();
      alert(erro.error || "Erro ao cadastrar paciente");
    }
  } catch (err) {
    console.error(err);
    alert("Erro no servidor");
  }
});
