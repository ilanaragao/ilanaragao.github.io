const loginButton = document.querySelector('#login');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const enviarButton = document.getElementById('submit-btn');
const aceitar = document.getElementById('agreement');
const textArea = document.querySelector('#textarea');
const contador = document.querySelector('#counter');
enviarButton.disabled = true;

function validar() {
  if (email.value === 'tryber@teste.com' && password.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }
}

loginButton.addEventListener('click', validar);

function habilitar() {
  if (aceitar.checked === true) {
    enviarButton.disabled = false;
    enviarButton.style.backgroundColor = 'rgb(50, 167, 145)';
    enviarButton.style.color = 'white';
  } else {
    enviarButton.disabled = true;
    enviarButton.style.backgroundColor = 'rgb(238, 238, 238)';
    enviarButton.style.border = 'none';
    enviarButton.style.color = 'rgb(0, 0, 0, 0.3)';
  }
}

aceitar.addEventListener('click', habilitar);

function contar() {
  /* Com base nesse conceito: https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLElement/input_event */
  const value = textArea.value.length;
  const max = 500;
  contador.innerText = `(${max - value} caracteres restantes)`;
}

textArea.addEventListener('input', contar);

function materias() {
  const materia = [];
  const buscaMaterias = document.querySelectorAll('.subject');
  for (let index = 0; index < buscaMaterias.length; index += 1) {
    if (buscaMaterias[index].checked) {
      materia.push(` ${buscaMaterias[index].value}`);
    }
  }
  return materia;
}

function newForm(event) {
  event.preventDefault();
  const formulario = document.querySelector('#evaluation-form');
  const inputNome = document.querySelector('#input-name').value;
  const inputSobrenome = document.querySelector('#input-lastname').value;
  const inputEmail = document.querySelector('#input-email').value;
  const inputCasa = document.querySelector('#house').value;
  const inputMath = materias();
  const inputFamilia = document.querySelector('[name="family"]:checked').value;
  const inputAvaliacao = document.querySelector('[name="rate"]:checked').value;
  const inputArea = document.querySelector('#textarea').value;
  const p = document.createElement('p');
  formulario.innerText = '';
  formulario.appendChild(p);
  p.innerHTML = `Nome: ${inputNome} ${inputSobrenome} <br> Email: ${inputEmail} <br> 
  Casa: ${inputCasa} <br> Família: ${inputFamilia} <br> Matérias: ${Object.values(inputMath)} <br>
  Avaliação: ${inputAvaliacao} <br>
  Observações: ${inputArea}`;
}

enviarButton.addEventListener('click', newForm);
