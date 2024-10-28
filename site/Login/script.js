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
      confirmacao_senha_input.style.border = 'none'
      span_senha.style.display = 'none'
      span_senha.style.visibility = 'hidden'
    }
  }
  
  function verificar_email(){
    var email = email_input.value
  
    if(!email.includes('@') || !email.includes('.com')){
      email_input.style.border = '1px solid #CC0000'
    }else{
      email_input.style.border = 'none'
    }
  }
  
  // n funciona n sei pq, vou ver com o grandioso jp
  function limpar_cnpj(){
    var cnpj = cnpj_input.value
  
    var cnpj_limpo = cnpj.replaceAll('.', '')
    cnpj_limpo = cnpj_limpo.replaceAll('-', '')
  
    cnpj_input.value = cnpj_limpo
    
  }
  
  
          const cadastro = document.getElementById('cardCad');
          const login = document.getElementById('card');
          document.getElementById('rotateButton').addEventListener('click', function() {
              cadastro.classList.add('rotated'); // Gira para o verso
          });
  
          document.getElementById('backButton').addEventListener('click', function() {
              cadastro.classList.remove('rotated'); // Volta para a frente
          });
  
          document.getElementById('concludeButton').addEventListener('click', function() {
              alert('Tarefa concluída!'); // Ação ao clicar em "Concluir"
          });

          function mudartela(){
          login.classList.add('hidden');
            cadastro.classList.remove('hidden');
          }
          function voltartela(){
            cadastro.classList.add('hidden');
            login.classList.remove('hidden');
          }