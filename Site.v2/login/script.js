var email_comp = ''
var senha_comp = ''

function verificar_requisitos() {
  var senha = CadastroSenha_input.value

  if (senha.length >= 8) {
    req_char.style.color = '#228B22'
    req_char.innerHTML = `<i class='bx bxs-like'></i>8 caracteres`
  } else {
    req_char.style.color = '#CC0000'
    req_char.innerHTML = `<i class='bx bxs-dislike'></i>8 caracteres`
  }

  if (senha != senha.toUpperCase()) {
    req_min.style.color = '#228B22'
    req_min.innerHTML = `<i class='bx bxs-like'></i>Letras minúsculas`
  } else {
    req_min.style.color = '#CC0000'
    req_min.innerHTML = `<i class='bx bxs-dislike'></i>Letras minúsculas`
  }

  if (senha != senha.toLowerCase()) {
    req_mai.style.color = '#228B22'
    req_mai.innerHTML = `<i class='bx bxs-like'></i>Letras maiúsculas`
  } else {
    req_mai.style.color = '#CC0000'
    req_mai.innerHTML = `<i class='bx bxs-dislike'></i>Letras maiúsculas`
  }

  if (senha.includes('@') || senha.includes('#') || senha.includes('$') || senha.includes('%') || senha.includes('&') || senha.includes('_')) {
    req_esp.style.color = '#228B22'
    req_esp.innerHTML = `<i class='bx bxs-like'></i>Caractere especial`
  } else {
    req_esp.style.color = '#CC0000'
    req_esp.innerHTML = `<i class='bx bxs-dislike'></i>Caractere especial`
  }
}

function verificar_senha() {
  var senha = CadastroSenha_input.value
  var conf_senha = confirmacao_senha_input.value

  if (senha != conf_senha) {
    confirmacao_senha_input.style.border = '1px solid #CC0000'
    span_senha.style.display = 'block'
    span_senha.style.visibility = 'visible'
  } else {
    confirmacao_senha_input.style.border = '1px solid #DDD'
    span_senha.style.display = 'none'
    span_senha.style.visibility = 'hidden'
  }
}
function verificar_email() {
  var email = email_input.value

  if (!email.includes('@') || !email.includes('.')) {
    email_input.style.border = '1px solid #CC0000'

  } else {
    email_input.style.border = '1px solid #DDD'
  }
}


function limpar_cnpj() {
  var cnpj = cnpj_input.value

  var cnpj_limpo = cnpj.replaceAll('.', '')
  cnpj_limpo = cnpj_limpo.replaceAll('-', '')

  cnpj_input.value = cnpj_limpo


}



const login = document.getElementById('card');
document.getElementById('rotateButton').addEventListener('click', function () {
  var senha = CadastroSenha_input.value
  var conf_senha = confirmacao_senha_input.value
  var email = email_input.value
  if (
    (CadastroNome_input.value != "" &&
      Telefone_input.value != "" &&
      CadastroSenha_input.value != "" &&
      email_input.value != "" &&
      input_data.value != "" &&
      confirmacao_senha_input.value != "") && (senha == conf_senha) && (email.includes('@') && email.includes('.'))
  ) {

    valcad.classList.add('valcad');
  }
  else {
    valcad.classList.remove('valcad');
  }

});

function logar() {
  var senha_login = LoginSenha_input.value
  var email_login = LoginNome_input.value

  if (senha_login == undefined || email_login == undefined) {
    alert("Por favor, preenchas as informações")
    return
  }

  fetch('http://localhost:3333/usuarios/autenticar', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      senha: senha_login,
      email: email_login,
    }),
  }).then((resposta) => {
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json);
        console.log(JSON.stringify(json));
        sessionStorage.EMAIL_USUARIO = json.email;
        sessionStorage.NOME_USUARIO = json.nome;
        sessionStorage.ID_USUARIO = json.id;
        setTimeout(function () {
          if(json.tecnico){
            window.location.href = "../suporte/index.html";
          }else{
            window.location.href = "../../Site.v2/dashboard/dashboard_estatico.html";
          }
            
        }, 1000); // apenas para exibir o loading
      });

    } else {
      alert('Problema ao realizar cadastro')
      error_login.style.display = 'block'
      error_login.style.visibility = 'visible'

      resposta.text().then(msg => {
        console.error(msg);
        finalizarAguardar(msg);
      });
    }
  })
}

function cadastrar_button() {

  var login = document.getElementById('login');
  var cadastro = document.getElementById('cadastro_user');

  login.classList.add('hidden')
  cadastro.classList.remove('hidden')
}

function retornar() {

  var login = document.getElementById('login');
  var cadastro = document.getElementById('cadastro_user');

  login.classList.remove('hidden')
  cadastro.classList.add('hidden')

}

function cadastrar_usuario() {
  cadastro_user.classList.add('hidden')
  empresa.classList.remove('hidden')
  var nome = CadastroNome_input.value
  var telefone = Telefone_input.value
  var senha = CadastroSenha_input.value
  var confSenha = confirmacao_senha_input.value
  var email = email_input.value
  var data_nascimento = input_data.value

  if (nome == undefined || telefone == undefined || senha == undefined || confSenha == undefined || email == undefined) {
    alert('Todos os campos devem ser preenchidos')
    return
  }

  if (senha !== confSenha) {
    alert('As senhas devem ser iguais')
    return
  }

  if (!(email.includes('@') && email.includes('.com'))) {
    alert('Email inválido')
    return
  }

  fetch('http://localhost:3333/usuarios/cadastrar', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome,
      telefone: telefone,
      senha: senha,
      email: email,
      dtNascimento: data_nascimento
    }),
  }).then(function (resposta) {
    if (resposta.ok) {
      alert('Cadastro realizado com sucesso!')
      window.location.href = 'index.html'
    } else {
      alert('Problema ao realizar cadastro')
    }
  })

}

function returnlog(){
  cadastro_user.classList.remove('hidden')
  empresa.classList.add('hidden')
}