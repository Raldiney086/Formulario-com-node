document.getElementById('submit-btnE').addEventListener('click', async (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  const nomeEmpresa = document.getElementById('nome-empresa');
  const cnpj = document.getElementById('cnpj');
  const email = document.getElementById('e-mail');
  const numeroContato = document.getElementById('numero-contato');
  const cep = document.getElementById('cep');
  const estado = document.getElementById('estado');
  const cidade = document.getElementById('cidade');
  const logradouro = document.getElementById('logradouro');
  const numeroResidencia = document.getElementById('numero-residencia');
  const complemento = document.getElementById('complemento');
  const senha = document.getElementById('senha');
  const confirmarSenha = document.getElementById('confirmar-senha');

  if (!nomeEmpresa || !cnpj || !email || !numeroContato || !cep || !estado || !cidade || !logradouro || !numeroResidencia || !complemento || !senha || !confirmarSenha) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Capturando os valores dos inputs
  const dados = {
    nomeEmpresa: nomeEmpresa.value,
    cnpj: cnpj.value,
    email: email.value,
    numeroContato: numeroContato.value,
    cep: cep.value,
    estado: estado.value,
    cidade: cidade.value,
    logradouro: logradouro.value,
    numeroResidencia: numeroResidencia.value,
    complemento: complemento.value,
    senha: senha.value,
  };

  if (numeroContato.value.trim().length > 11 || numeroContato.value.trim().length <11) {
    alert('Digite seu telefone com código da região');
    return;
}

  if (!/^[a-zA-Z]+$/.test(nomeEmpresa.value.trim())) {
    alert('O nome deve conter apenas letras.');
    return;
}

  if (nomeEmpresa.value.trim().length < 4 || nomeEmpresa.value.trim().length > 20) {
    alert('O nome deve ter entre 4 e 20 caracteres.');
    return;
}

  
  if (email.value === '') {
    alert('email invalido');
    return;
  }

  if (senha.value.trim().length < 4 || senha.value.trim().length > 10) {
    alert('a senha deve ter entre 4 e 10 caracteres.');
    return;
}
  // Verificação básica: a senha e a confirmação devem ser iguais
  if (senha.value !== confirmarSenha.value) {
    alert('As senhas não coincidem!');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/empresas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (response.ok) {
      const resultado = await response.json();
      alert('Empresa cadastrada com sucesso!');
      console.log('Resposta do servidor:', resultado);
    } else {
      const erro = await response.text(); // Captura o erro retornado pelo servidor
      console.error('Erro no servidor:', erro);
      alert('Erro ao cadastrar a empresa: ' + erro);
    }
  } catch (error) {
    console.error('Erro de conexão:', error);
    alert('Falha ao conectar ao servidor. Tente novamente.');
  }
});
