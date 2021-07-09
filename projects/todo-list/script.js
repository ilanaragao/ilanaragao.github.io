const addButton = document.querySelector('#criar-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const clearButton = document.querySelector('#apaga-tudo');
const removeButton = document.querySelector('#remover-finalizados');
const saveButton = document.querySelector('#salvar-tarefas');
const upButton = document.querySelector('#mover-cima');
const downButton = document.querySelector('#mover-baixo');
const deleteButton = document.querySelector('#remover-selecionado');

function mudarCor(event) {
  const listaItems = document.querySelectorAll('.list');
  for (let i = 0; i < listaItems.length; i += 1) {
    listaItems[i].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function riscar(event) {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

function corLista() {
  const listaItems = document.querySelectorAll('.list');
  for (let i = 0; i < listaItems.length; i += 1) {
    listaItems[i].addEventListener('click', mudarCor);
    listaItems[i].addEventListener('dblclick', riscar);
  }
}

corLista();

function criarTarefa() {
  const nomeTarefa = document.querySelector('#texto-tarefa').value;
  const novaTarefa = document.createElement('li');
  novaTarefa.className = 'list';
  novaTarefa.innerText = nomeTarefa;
  listaTarefas.appendChild(novaTarefa);
  document.querySelector('#texto-tarefa').value = '';
  corLista();
}

addButton.addEventListener('click', criarTarefa);

function limparTudo() {
  listaTarefas.innerText = '';
}

clearButton.addEventListener('click', limparTudo);

function remover() {
  const removerItem = document.querySelectorAll('.completed');
  for (let i = 0; i < removerItem.length; i += 1) {
    listaTarefas.removeChild(removerItem[i]);
  }
}

removeButton.addEventListener('click', remover);

function salvar() {
  localStorage.setItem('lista', listaTarefas.innerHTML);
}
saveButton.addEventListener('click', salvar);

function recuperar() {
  listaTarefas.innerHTML = localStorage.getItem('lista');
}

recuperar();

function subir() {
  const elementoSeleciondo = document.querySelector('.selected');
  if (elementoSeleciondo && elementoSeleciondo.previousSibling) {
    listaTarefas.insertBefore(elementoSeleciondo, elementoSeleciondo.previousSibling);
  }
}

upButton.addEventListener('click', subir);

function descer() {
  const elementoSelecionado = document.querySelector('.selected');
  if (elementoSelecionado && elementoSelecionado.nextSibling) {
    listaTarefas.insertBefore(elementoSelecionado.nextSibling, elementoSelecionado);
  }
}

downButton.addEventListener('click', descer);

function deletar() {
  const removerItem = document.querySelector('.selected');
  removerItem.remove();
}
deleteButton.addEventListener('click', deletar);
