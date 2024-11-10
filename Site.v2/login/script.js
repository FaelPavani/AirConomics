var email_comp = ''
var senha_comp = ''

function verificar_requisitos(){
  var senha = CadastroSenha_input.value

  if(senha.length >= 8){
    req_char.style.color = '#228B22'
    req_char.innerHTML = `<i class='bx bxs-like'></i>8 caracteres`
  }else{
    req_char.style.color = '#CC0000'
    req_char.innerHTML = `<i class='bx bxs-dislike'></i>8 caracteres`
  }

  if(senha != senha.toUpperCase()){
    req_min.style.color = '#228B22'
    req_min.innerHTML = `<i class='bx bxs-like'></i>Letras minúsculas`
  }else{
    req_min.style.color = '#CC0000'
    req_min.innerHTML = `<i class='bx bxs-dislike'></i>Letras minúsculas`
  }

  if(senha != senha.toLowerCase()){
    req_mai.style.color = '#228B22'
    req_mai.innerHTML = `<i class='bx bxs-like'></i>Letras maiúsculas`
  }else{
    req_mai.style.color = '#CC0000'
    req_mai.innerHTML = `<i class='bx bxs-dislike'></i>Letras maiúsculas`
  }

  if(senha.includes('@') || senha.includes('#') || senha.includes('$') || senha.includes('%') || senha.includes('&') || senha.includes('_')){
    req_esp.style.color = '#228B22'
    req_esp.innerHTML = `<i class='bx bxs-like'></i>Caractere especial`
  }else{
    req_esp.style.color = '#CC0000'
    req_esp.innerHTML = `<i class='bx bxs-dislike'></i>Caractere especial`
  }
}

function verificar_senha(){
  var senha = CadastroSenha_input.value
  var conf_senha = confirmacao_senha_input.value
  
  if(senha != conf_senha){
    confirmacao_senha_input.style.border = '1px solid #CC0000'
    span_senha.style.display = 'block'
    span_senha.style.visibility = 'visible'
  }else{
    confirmacao_senha_input.style.border = '1px solid #DDD'
    span_senha.style.display = 'none'
    span_senha.style.visibility = 'hidden'
  }
}
function verificar_email(){
  var email = email_input.value

  if(!email.includes('@') || !email.includes('.')){
    email_input.style.border = '1px solid #CC0000'
   
  }else{
    email_input.style.border = '1px solid #DDD'
  }
}


function limpar_cnpj(){
  var cnpj = cnpj_input.value

  var cnpj_limpo = cnpj.replaceAll('.', '')
  cnpj_limpo = cnpj_limpo.replaceAll('-', '')

  cnpj_input.value = cnpj_limpo

  
}


 
  const login = document.getElementById('card');
  document.getElementById('rotateButton').addEventListener('click', function(){ 
    var senha = CadastroSenha_input.value
    var conf_senha = confirmacao_senha_input.value
    var email = email_input.value
if(
  (CadastroNome_input.value != "" &&
  Telefone_input.value != ""&&
  CadastroSenha_input.value != ""&&
  email_input.value != ""&&
  input_data.value!= ""&&
  confirmacao_senha_input.value!= "")&&(senha == conf_senha)&&(email.includes('@') && email.includes('.') )
)
{

  valcad.classList.add('valcad');
}
else {
  valcad.classList.remove('valcad');
}

  });

  document.getElementById('backButton').addEventListener('click', function() {
      cadastro.classList.remove('rotated'); 
  });

  

  document.getElementById('concludeButton').addEventListener('click', function() {

    email_comp = email_input.value
    senha_comp = CadastroSenha_input.value
    const box = document.getElementById('messageBox');
    const progress = document.getElementById('progress');
    box.classList.remove('hidden');
    box.style.display = 'block'; 
     
    progress.style.width = '100%'; 
    setTimeout(() => {
        progress.style.width = '0%'; 
    }, 10); 

    setTimeout(() => {
        box.style.display = 'none'; 
    }, 1500); 

    setTimeout(() => {
        cadastro.classList.add('hidden');
        login.classList.remove('hidden');
        cadastro.classList.remove('rotated');
    }, 1500); 
  
});

function logar(){
  var senha_login = LoginSenha_input.value
  var email_login = LoginNome_input.value

  if(senha_login == senha_comp && email_login == email_comp){
    window.location.href = '../dashboard/dashboard_estatico.html'
  }else{
    error_login.style.display = 'block'
    error_login.style.visibility = 'visible'  
  }
}

function cadastrar_button(){

  var login = document.getElementById('login');
  var cadastro = document.getElementById('cadastro_user');
  
  login.classList.add('hidden')
  cadastro.classList.remove('hidden')
  }
  
  function retornar(){
  
    var login = document.getElementById('login');
    var cadastro = document.getElementById('cadastro_user');
    
    login.classList.remove('hidden')
    cadastro.classList.add('hidden')
  
  }