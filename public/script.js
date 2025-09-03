// Abrir e fechar modal de login
const loginModal = document.getElementById("loginModal");
const btnLogin = document.getElementById("btnLogin");
const closeLoginModal = document.getElementById("closeModal");

btnLogin.addEventListener("click", () => {
  loginModal.classList.add("open");
});
closeLoginModal.addEventListener("click", () => {
  loginModal.classList.remove("open");
});

// Abrir e fechar modal de cadastro
const cadastroModal = document.getElementById("cadastroModal");
const btnCadastro = document.getElementById("btnCadastro");
const closeCadastroModal = document.getElementById("closeCadastroModal");

btnCadastro.addEventListener("click", () => {
  cadastroModal.classList.add("open");
});
closeCadastroModal.addEventListener("click", () => {
  cadastroModal.classList.remove("open");
});

// Salvar dados do cadastro no localStorage
document.getElementById("formCadastro").addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nomeCadastro").value.trim();
  const email = document.getElementById("emailCadastro").value.trim();
  const senha = document.getElementById("senhaCadastro").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos para cadastro.");
    return;
  }

  const usuario = { nome, email, senha };

  localStorage.setItem("usuarioCadastrado", JSON.stringify(usuario));

  const msgCadastro = document.getElementById("msgCadastro");
  msgCadastro.textContent = "Cadastro realizado com sucesso! Agora faça login.";
  msgCadastro.style.color = "green";

  // Limpa formulário e fecha modal após 2 segundos
  e.target.reset();
  setTimeout(() => {
    cadastroModal.classList.remove("open");
    msgCadastro.textContent = "";
  }, 2000);
});

// Login usando dados do localStorage
document.getElementById("formLogin").addEventListener("submit", e => {
  e.preventDefault();

  const emailLogin = document.getElementById("emailLogin").value.trim();
  const senhaLogin = document.getElementById("senha").value;

  const msgLogin = document.getElementById("msgLogin");

  const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioCadastrado"));

  if (!usuarioSalvo) {
    msgLogin.textContent = "Nenhum usuário cadastrado. Por favor, cadastre-se.";
    msgLogin.style.color = "red";
    return;
  }

  if (emailLogin === usuarioSalvo.email && senhaLogin === usuarioSalvo.senha) {
    msgLogin.textContent = `Bem-vindo, ${usuarioSalvo.nome}! Login realizado com sucesso.`;
    msgLogin.style.color = "green";

    // Fecha modal após 2 segundos
    setTimeout(() => {
      loginModal.classList.remove("open");
      msgLogin.textContent = "";
      document.getElementById("formLogin").reset();
    }, 2000);
  } else {
    msgLogin.textContent = "Email ou senha incorretos.";
    msgLogin.style.color = "red";
  }
});

// Formulário de contato (mantido)
document.getElementById("formContato").addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById("nomeContato").value;
  const msgContato = document.getElementById("msgContato");

  msgContato.textContent = `Obrigado pelo contato, ${nome}! Em breve retornaremos.`;
  msgContato.style.color = "green";

  e.target.reset();
});
