function corPreta() {
  const comecarPreto = document.getElementsByClassName('color')[0];
  comecarPreto.classList.add('selected');
}

function selecionarCor() {
  const selected = document.getElementsByClassName('selected');
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('color')) {
      for (let i = 0; i < selected.length; i += 1) {
        const element = selected[i];
        element.classList.remove('selected');
      }
      event.target.classList.add('selected');
    }
  });
}

function divTabela(linha, x) {
  for (let i = 0; i < x; i += 1) {
    const div = document.createElement('div');
    div.classList.add('pixel');
    linha.appendChild(div);
  }
}

function fazTabela(x) {
  const body = document.getElementsByTagName('body')[0];
  const criaSection = document.createElement('section');
  criaSection.setAttribute('id', 'pixel-board');
  body.appendChild(criaSection);

  for (let i = 0; i < x; i += 1) {
    const linha = document.createElement('div');
    linha.classList.add('linha');
    divTabela(linha, x);
    criaSection.appendChild(linha);
  }
}

function colorir() {
  document.addEventListener('click', (event) => {
    const escolha = event.target;
    const selected = document.getElementsByClassName('selected')[0];
    const cor = window
      .getComputedStyle(selected, null)
      .getPropertyValue('background-color');
    if (escolha.classList.contains('pixel')) {
      escolha.style.backgroundColor = cor;
    }
  });
}

// Cria a função de limpar o pixel board.
function limparTabela() {
  const botaoLimpar = document.getElementById('clear-board');
  const pixel = document.getElementsByClassName('pixel');

  botaoLimpar.addEventListener('click', () => {
    for (let i = 0; i < pixel.length; i += 1) {
      const element = pixel[i];
      element.style.backgroundColor = 'white';
    }
  });
}

function tamanhoTabela(n) {
  let numero = n;
  if (numero > 50) {
    numero = 50;
  }
  if (numero < 5) {
    numero = 5;
  }
  if (numero <= 0) {
    numero = Math.max(numero, 1);
  }
  return numero;
}

function gerarNovaTabela() {
  const tabela = document.getElementById('pixel-board');
  const body = document.getElementsByTagName('body')[0];

  body.removeChild(tabela);
}

function tamanho() {
  const botaoTamanhoTabela = document.getElementById('generate-board');
  const valorInput = document.getElementById('board-size');

  botaoTamanhoTabela.addEventListener('click', () => {
    let n = valorInput.value;
    if (n === '') {
      alert('Board inválido!');
    } else {
      gerarNovaTabela();
      n = tamanhoTabela(n);
      fazTabela(n);
    }
  });
}

function corAleatoria() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const rgb = `rgb(${red}, ${green}, ${blue})`;
  return rgb;
}

function mudarCor() {
  const cores = document.getElementsByClassName('color');
  for (let i = 0; i < cores.length; i += 1) {
    const colors = cores[i];
    if (colors !== cores[0]) {
      colors.style.backgroundColor = corAleatoria();
    }
  }
}

fazTabela(5);
corPreta();
selecionarCor();
colorir();
limparTabela();
tamanho();
mudarCor();
