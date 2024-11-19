fetch('http://localhost:3333/empresas/listar', {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      for (var i = 0; i < json.length; i++) {
        var option = document.createElement("option")
        option.value = json[i].id_empresa
        option.textContent = json[i].nome_empresa
        empresa_select.appendChild(option)
        console.log(json[i])
        // empresa_select.innerHTML += `<option value="${json[i].id_empresa}"> ${json[i].nome_empresa} </option>`
      }
    });
  } else {
    alert('Problema ao realizar cadastro')
  }
})

function exibir() {
  var cadastro = document.getElementById('cadastro_user')
  if (cadastro.classList.contains('hidden')) {
    cadastro.classList.remove('hidden')
  } else {
    cadastro.classList.add('hidden')
  }
  // cadastro.classList.toggle('hidden')
}

function cadastrar_usuario() {
  var nome = CadastroNome_input.value
  var telefone = Telefone_input.value
  var senha = CadastroSenha_input.value
  var confSenha = confirmacao_senha_input.value
  var email = email_input.value
  var data_nascimento = input_data.value
  var id_empresa = empresa_select.value

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

  fetch(`http://localhost:3333/usuarios/cadastrar/${id_empresa}`, {
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
    } else {
      alert('Problema ao realizar cadastro')
    }
  })
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