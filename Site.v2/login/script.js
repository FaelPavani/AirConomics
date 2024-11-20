var email_comp = ''
var senha_comp = ''

function aparecer(){
var login = document.getElementById('login');

login.style.opacity = '1';


}

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
        sessionStorage.MASTER = json.master;
        sessionStorage.ID_EMPRESA = json.empresa_id;

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
  setTimeout(() => {
    
    cadastro.style.opacity = '1';
    login.style.opacity = '0';
   }, 1);
  

  

  
}

function retornar() {

  var login = document.getElementById('login');
  var cadastro = document.getElementById('cadastro_user');


  login.classList.remove('hidden')
  setTimeout(() => {
   login.style.opacity = '1';
   cadastro.style.opacity = '0';  
  }, 1);

  cadastro.classList.add('hidden')

}

function proxima_fase(){
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

  var empresa = document.getElementById('empresa');
  var cadastro = document.getElementById('cadastro_user');
  cadastro.classList.add('hidden')
  empresa.classList.remove('hidden')
  setTimeout(() => {
    empresa.style.opacity = '1';
    cadastro.style.opacity = '0';  
   }, 1);

  
}

function cadastrar_usuario() {
  var nome = CadastroNome_input.value
  var telefone = Telefone_input.value
  var senha = CadastroSenha_input.value
  var confSenha = confirmacao_senha_input.value
  var email = email_input.value
  var data_nascimento = input_data.value

  var razao_social = RazãoSocial_input.value
  var nome_fantasia = NomeFantasia_input.value
  var responsavel = responsavel_input.value
  var telefone_emp = telefone_input.value
  var cnpj = cnpj_input.value
  var cep = cep_input.value
  var numero = Numero_input.value
  var complemento = Complemento_input.value
  var rua = rua_input.value
  var cidade = cidade_input.value
  var uf_select = selectcity.value

  if(razao_social == undefined || nome_fantasia == undefined || responsavel == undefined || telefone_emp == undefined
    || cnpj == undefined || cep == undefined || numero == undefined || complemento == undefined || rua == undefined || cidade == undefined || uf_select == undefined
  ){
    alert('Todos os campos devem ser preenchidos')
    return
  }

  if(cep.length != 8){
    alert('CEP com tamanho inválido')
    return
  }

  if(cnpj.length != 14){
    alert('CNPJ com tamanho inválido')
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
      dtNascimento: data_nascimento,
      razao_social: razao_social,
      nome_fantasia: nome_fantasia,
      responsavel: responsavel,
      telefone_emp: telefone_emp,
      cnpj: cnpj,
      cep: cep,
      numero: numero,
      complemento: complemento,
      rua: rua,
      cidade: cidade,
      uf: uf_select
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

  var empresa = document.getElementById('empresa');
  var cadastro = document.getElementById('cadastro_user');
  empresa.classList.add('hidden')
  cadastro.classList.remove('hidden')
  setTimeout(() => {
    empresa.style.opacity = '0';
    cadastro.style.opacity = '1';  
   }, 1);
}