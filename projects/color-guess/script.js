const circulos = document.getElementsByClassName('ball');
const mudarCor = document.getElementById('rgb-color');
const fraseInicial = document.getElementById('answer');
const resetButton = document.getElementById('reset-game');
const scoreValue = document.getElementById('score');

function gerarNumero(x) {
  return Math.floor(Math.random() * x).toString();
}

function gerarRgb() {
  return `rgb(${gerarNumero(255)}, ${gerarNumero(255)}, ${gerarNumero(255)})`;
}

function addCor() {
  for (let index = 0; index < circulos.length; index += 1) {
    circulos[index].style.backgroundColor = gerarRgb();
  }
}

function randomizar() {
  const corRandom = circulos[gerarNumero(6)].style.backgroundColor;
  return corRandom;
}

function randomizarCor() {
  const texto = randomizar().split('rgb')[1];
  mudarCor.innerText = texto;
}

function textoCor(text) {
  fraseInicial.innerText = text;
}

function score() {
  const valorScore = Number(scoreValue.innerText);
  scoreValue.innerText = valorScore + 3;
}

function acertos(event) {
  const click = event.target;
  const corClicada = click.style.backgroundColor;
  if (corClicada === `rgb${mudarCor.innerText}`) {
    textoCor('Acertou!');
    score();
  } else {
    textoCor('Errou! Tente novamente!');
  }
}

function clicarCirculo() {
  for (let i = 0; i < circulos.length; i += 1) {
    circulos[i].addEventListener('click', acertos);
  }
}

function button() {
  resetButton.onclick = () => {
    addCor();
    randomizarCor();
    textoCor('Escolha uma cor');
  };
}

window.onload = () => {
  addCor();
  randomizarCor();
  clicarCirculo();
  button();
};
