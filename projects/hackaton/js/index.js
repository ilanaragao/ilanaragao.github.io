const getPlayer = () => {
  return document.querySelector('#player').value;
}


const quizBtn = document.querySelector('#quiz');


quizBtn.addEventListener('click', () => {
  if (getPlayer().length !== 0) {
    localStorage.setItem('player', getPlayer());
    window.location.replace('./quiz.html');
  } else window.alert('Digite seu nome para continuar!');
})