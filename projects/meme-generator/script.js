// Graças ao PR do Kristiano Kasper (https://github.com/tryber/sd-014-a-project-meme-generator/pull/5), dei uma refatorada no meu javascript para passar no eslint //

const textInput = document.querySelector('#text-input');
const memeText = document.querySelector('#meme-text');
const imageInput = document.querySelector('#meme-insert');
const memeImg = document.querySelector('#meme-image');
const container = document.querySelector('#meme-image-container');
const fireButton = document.querySelector('#fire');
const waterButton = document.querySelector('#water');
const earthButton = document.querySelector('#earth');
const img1 = document.querySelector('#meme-1');
const img2 = document.querySelector('#meme-2');
const img3 = document.querySelector('#meme-3');
const img4 = document.querySelector('#meme-4');

function addTexto() {
  textInput.addEventListener('input', () => {
    memeText.innerText = textInput.value;
  });
}
addTexto();

function addImagem() {
  imageInput.addEventListener('change', () => {
    memeImg.src = URL.createObjectURL(imageInput.files[0]);
  });
}
addImagem();

function fire() {
  fireButton.addEventListener('click', () => {
    container.style.border = '3px dashed red';
  });
}
fire();

function water() {
  waterButton.addEventListener('click', () => {
    container.style.border = '5px double blue';
  });
}
water();

function earth() {
  earthButton.addEventListener('click', () => {
    container.style.border = '6px groove green';
  });
}
earth();

function meme1() {
  img1.addEventListener('click', () => {
    memeImg.src = 'imgs/meme1.png';
  });
}
meme1();

function meme2() {
  img2.addEventListener('click', () => {
    memeImg.src = 'imgs/meme2.png';
  });
}
meme2();

function meme3() {
  img3.addEventListener('click', () => {
    memeImg.src = 'imgs/meme3.png';
  });
}
meme3();

function meme4() {
  img4.addEventListener('click', () => {
    memeImg.src = 'imgs/meme4.png';
  });
}
meme4();
