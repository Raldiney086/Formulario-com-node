document.getElementById('submit-btnF').addEventListener('click', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário
    // Capturando os valores dos inputs


    const nomePessoa= document.getElementById('nome-completo').value;
    
    
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('e-mail').value;
    const numeroContato = document.getElementById('numero-contato').value;
    const cep = document.getElementById('cep').value;
    const estado = document.getElementById('estado').value;
    const cidade = document.getElementById('cidade').value;
    const logradouro = document.getElementById('logradouro').value;
    const numeroResidencia = document.getElementById('numero-residencia').value;
    const complemento = document.getElementById('complemento').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
  
    // Verificação básica: a senha e a confirmação devem ser iguais
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
  
    // Preparando os dados para envio
    const dados = {
       cpf,
       nomePessoa,
      email,
      numeroContato,
      cep,
      estado,
      cidade,
      logradouro,
      numeroResidencia,
      complemento,
      senha,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/empresas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
  
      if (response.ok) {
        const resultado = await response.json();
        alert('Usúario cadastrada com sucesso!');
        console.log('Resposta do servidor:', resultado);
      } else {
        throw new Error('Erro ao cadastrar a Usúario');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Falha ao conectar ao servidor. Tente novamente.');
    }
  });
  