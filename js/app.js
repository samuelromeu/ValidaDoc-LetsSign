function mostrar(tag) {
    document.querySelectorAll('page-1, page-2, page-3, page-4, page-5').forEach(el => {
      el.classList.remove('ativa');
    });
    document.querySelector(tag).classList.add('ativa');

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    const menuLink = document.querySelector(`[onclick="mostrar('${tag}')"]`);
    if (menuLink) menuLink.classList.add('active');
  }

  const input = document.getElementById('arquivoInput');
  const mensagemErro = document.getElementById('mensagemErro');

  input.addEventListener('change', function () {
    const arquivo = input.files[0];
    if (!arquivo) return;

    const extensoesValidas = ['pdf', 'doc', 'docx'];
    const nomeArquivo = arquivo.name.toLowerCase();
    const extensao = nomeArquivo.split('.').pop();

    if (extensoesValidas.includes(extensao)) {
      mensagemErro.textContent = ''; // limpa erro
      processarArquivo(arquivo);
    } else {
      mensagemErro.textContent = 'Por favor, envie um arquivo PDF ou Word (.doc, .docx).';
      input.value = ''; // limpa o input se inválido
    }
  });

  function processarArquivo(arquivo) {
    console.log('Arquivo válido recebido:', arquivo.name);
    mostrar("page-4")
  }

  const btnIniciar = document.getElementById('btnIniciarCamera');
  const video = document.getElementById('videoCamera');
  const mensagemErro2 = document.getElementById('mensagemErro2');
  const btnProximoPasso = document.getElementById('btnProximoPasso');
  const mensagemCerta = document.getElementById('mensagemCerta')
  const mensagemMotivadora = document.getElementById('mensagemMotivadora')
  const customModalPage4 = document.getElementById('custom-modal-page-4')

  btnIniciar.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        video.style.display = 'block';
        btnIniciar.style.display = 'none'; // Esconde botão após iniciar
        btnProximoPasso.style.display = ''
        mensagemErro2.textContent = '';
        mensagemMotivadora.textContent = 'Aproxime seu rosto dentro do circulo';
        customModalPage4.style.height = "60vh";
      })
      .catch(error => {
        console.error('Erro ao acessar a câmera:', error);
        mensagemErro2.textContent = 'Não foi possível acessar a câmera. Verifique as permissões.';
        mensagemCerta.textContent = '';
      });
  });

    btnProximoPasso.addEventListener('click', () => {
        mensagemCerta.textContent = 'Autenticação feita com sucesso!';
        mensagemMotivadora.textContent = '';

        if (btnProximoPasso.textContent === 'Avançar') {
          video.srcObject.getTracks().forEach(track => track.stop());
          mostrar('page-5')
        }
        btnProximoPasso.textContent = 'Avançar'
  });
