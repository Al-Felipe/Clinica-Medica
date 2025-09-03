// -------------------- MODAIS --------------------
const loginModal = document.getElementById("loginModal");
const btnLogin = document.getElementById("btnLogin");
const closeLoginModal = document.getElementById("closeModal");

const cadastroModal = document.getElementById("cadastroModal");
const btnCadastro = document.getElementById("btnCadastro");
const closeCadastroModal = document.getElementById("closeCadastroModal");

// Abrir e fechar modal de login
btnLogin.addEventListener("click", () => loginModal.classList.add("open"));
closeLoginModal.addEventListener("click", () => loginModal.classList.remove("open"));

// Abrir e fechar modal de cadastro
btnCadastro.addEventListener("click", () => cadastroModal.classList.add("open"));
closeCadastroModal.addEventListener("click", () => cadastroModal.classList.remove("open"));

// -------------------- CADASTRO --------------------
document.getElementById("formCadastro").addEventListener("submit", (e) => {
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

  e.target.reset();

  setTimeout(() => {
    cadastroModal.classList.remove("open");
    msgCadastro.textContent = "";
  }, 2000);
});

// -------------------- LOGIN --------------------
document.getElementById("formLogin").addEventListener("submit", (e) => {
  e.preventDefault();

  const emailLogin = e.target.usuario.value.trim();
  const senhaLogin = e.target.senha.value;
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

    setTimeout(() => {
      loginModal.classList.remove("open");
      msgLogin.textContent = "";
      e.target.reset();
      window.location.href = "home.html"; // redireciona
    }, 2000);
  } else {
    msgLogin.textContent = "Email ou senha incorretos.";
    msgLogin.style.color = "red";
  }
});

// -------------------- FORMULÁRIO DE CONTATO --------------------
document.getElementById("formContato").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nomeContato").value;
  const msgContato = document.getElementById("msgContato");

  msgContato.textContent = `Obrigado pelo contato, ${nome}! Em breve retornaremos.`;
  msgContato.style.color = "green";

  e.target.reset();
});
