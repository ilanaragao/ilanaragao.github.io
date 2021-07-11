const cardButton = document.getElementById('criar-carta');
const pContador = document.getElementById('carta-contador');
let contador;

function random(number) {
  return Math.floor(Math.random() * number);
}

function randomClass(grupo, elemento) {
  let numberIndex;
  for (let i = 0; i < grupo.length; i += 1) {
    numberIndex = random(grupo[i].length);
    elemento.classList.add(grupo[i][numberIndex]);
  }
}

function criaClasse(elemento) {
  const grupoEstilo = ['newspaper', 'magazine1', 'magazine2'];
  const grupoTamanho = ['medium', 'big', 'reallybig'];
  const grupoRotacao = ['rotateleft', 'rotateright'];
  const grupoInclinação = ['skewleft', 'skewright'];
  return randomClass([grupoEstilo, grupoTamanho, grupoRotacao, grupoInclinação], elemento);
}

function gerarCarta() {
  const input = document.getElementById('carta-texto').value;
  const card = document.getElementById('carta-gerada');
  card.innerHTML = '';
  if (input.trim() !== '') {
    const cartas = input.split(' ');
    contador = cartas.length;
    pContador.innerText = contador;
    for (let index = 0; index < cartas.length; index += 1) {
      const element = document.createElement('span');
      element.innerHTML = cartas[index];
      criaClasse(element);
      card.appendChild(element);
    }
  } else {
    card.innerText = 'Por favor, digite o conteúdo da carta.';
    contador = 0;
    pContador.innerText = contador;
  }
}

cardButton.addEventListener('click', gerarCarta);
