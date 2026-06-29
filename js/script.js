(function temaClaroEscuro() {
  const html = document.documentElement;
  const botaoTema = document.getElementById("theme-toggle");

  const temaSalvo = localStorage.getItem("portfolio-tema");
  const prefereTemaEscuro = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const temaInicial = temaSalvo || (prefereTemaEscuro ? "dark" : "light");

  aplicarTema(temaInicial);

  if (botaoTema) {
    botaoTema.addEventListener("click", function () {
      const temaAtual = html.getAttribute("data-theme");
      const novoTema = temaAtual === "dark" ? "light" : "dark";
      aplicarTema(novoTema);
      localStorage.setItem("portfolio-tema", novoTema);
    });
  }

  function aplicarTema(tema) {
    html.setAttribute("data-theme", tema);
    if (botaoTema) {
      botaoTema.textContent = tema === "dark" ? "☀️" : "🌙";
    }
  }
})();

(function menuResponsivo() {
  const botaoMenu = document.getElementById("nav-toggle");
  const listaLinks = document.getElementById("nav-links");

  if (!botaoMenu || !listaLinks) return;

  botaoMenu.addEventListener("click", function () {
    const estaAberto = listaLinks.classList.toggle("open");
    botaoMenu.setAttribute("aria-expanded", estaAberto ? "true" : "false");
  });
  listaLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      listaLinks.classList.remove("open");
      botaoMenu.setAttribute("aria-expanded", "false");
    });
  });
})();

(function formularioContato() {
  const formulario = document.getElementById("contact-form");
  if (!formulario) return;

  const toast = document.getElementById("toast");
  const toastMensagem = document.getElementById("toast-message");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoMensagem = document.getElementById("mensagem");

    const nomeValido = validarCampoObrigatorio(
      campoNome,
      "error-nome",
      "group-nome",
      "Informe seu nome.",
    );
    const emailValido = validarEmail(campoEmail, "error-email", "group-email");
    const mensagemValida = validarCampoObrigatorio(
      campoMensagem,
      "error-mensagem",
      "group-mensagem",
      "Escreva uma mensagem.",
    );

    const formularioValido = nomeValido && emailValido && mensagemValida;

    if (!formularioValido) {
      return;
    }

    formulario.reset();
    exibirConfirmacao("Mensagem enviada com sucesso!");
  });

  function validarCampoObrigatorio(campo, idErro, idGrupo, mensagemErro) {
    const valor = campo.value.trim();
    if (valor === "") {
      mostrarErro(campo, idErro, idGrupo, mensagemErro);
      return false;
    }
    limparErro(campo, idErro, idGrupo);
    return true;
  }

  function validarEmail(campo, idErro, idGrupo) {
    const valor = campo.value.trim();

    if (valor === "") {
      mostrarErro(campo, idErro, idGrupo, "Informe seu e-mail.");
      return false;
    }

    const formatoEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmailValido.test(valor)) {
      mostrarErro(
        campo,
        idErro,
        idGrupo,
        "Informe um e-mail em um formato válido (ex: usuario@dominio.com).",
      );
      return false;
    }

    limparErro(campo, idErro, idGrupo);
    return true;
  }

  function mostrarErro(campo, idErro, idGrupo, mensagem) {
    document.getElementById(idErro).textContent = mensagem;
    document.getElementById(idGrupo).classList.add("invalid");
  }

  function limparErro(campo, idErro, idGrupo) {
    document.getElementById(idErro).textContent = "";
    document.getElementById(idGrupo).classList.remove("invalid");
  }

  function exibirConfirmacao(mensagem) {
    toastMensagem.textContent = mensagem;
    toast.classList.add("show");

    setTimeout(function () {
      toast.classList.remove("show");
    }, 3500);
  }
})();
