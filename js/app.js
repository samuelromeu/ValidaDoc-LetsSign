function mostrar(tag) {
  document.querySelectorAll('page-1, page-2, page-3, page-4, page-5, page-6').forEach(el => {
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
    mensagemErro.textContent = '';
    processarArquivo(arquivo);
  } else {
    mensagemErro.textContent = 'Por favor, envie um arquivo PDF ou Word (.doc, .docx).';
    input.value = '';
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
      btnIniciar.style.display = 'none';
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

function exibirEndereco(posicao) {
  const lat = posicao.coords.latitude;
  const lon = posicao.coords.longitude;

  const mapUrl = `https://www.google.com/maps?q=${lat},${lon}&hl=pt-BR&z=15&output=embed`;
  document.getElementById("map").src = mapUrl;

  fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
    .then(response => response.json())
    .then(data => {
      const endereco = data.address;

      const rua = endereco.road || endereco.pedestrian || endereco.footway || 'Rua não encontrada';
      const cidade = endereco.city || endereco.town || endereco.village || 'Cidade não encontrada';
      const estado = endereco.state || 'Estado não encontrado';
      const pais = endereco.country || 'País não encontrado';

      document.getElementById("status").textContent =
        `Você está em: ${rua}, ${cidade} - ${estado}, ${pais}`;
    })
    .catch(() => {
      document.getElementById("status").textContent = "Erro ao obter o endereço.";
    });
}

function erroLocalizacao(error) {
  const status = document.getElementById("status");
  switch (error.code) {
    case error.PERMISSION_DENIED:
      status.textContent = "Permissão negada para acessar a localização.";
      break;
    case error.POSITION_UNAVAILABLE:
      status.textContent = "Localização indisponível.";
      break;
    case error.TIMEOUT:
      status.textContent = "Tempo esgotado para obter localização.";
      break;
    default:
      status.textContent = "Erro desconhecido ao obter localização.";
  }
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(exibirEndereco, erroLocalizacao);
} else {
  document.getElementById("status").textContent = "Geolocalização não suportada neste navegador.";
}