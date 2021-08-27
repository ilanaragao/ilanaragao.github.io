const questionContainer = document.querySelector('#question-container');
const filterBtn = document.querySelector('#filter-btn');
const randomBtn = document.querySelector('#random-btn');
const player = localStorage.getItem('player');
  
let correct = 0;
let quizLength = 10;
let progressValue = 1;

const getParams = () => {
  let params = {};
  if (document.querySelector('[name="select-category"]:checked')) {
    params['category'] = document.querySelector('[name="select-category"]:checked').value;
  }
  if (document.querySelector('#select-difficulty').value !== "null") {
    params['difficulty'] = document.querySelector('#select-difficulty').value;
  }
  if (document.querySelector('#select-limit').value !== "null") {
    params['limit'] = document.querySelector('#select-limit').value;
  }
  return params;
}

// Make the function fetch 

// Função que faz a requisição para a API 
const fetchQuiz = async (params = {}) => {
  const url = 'https://quizapi.io/api/v1/questions?apiKey=Sv36yp6PpNiHdkVuzwgj6XSswZTUPlrKoh7P6KZH';
  let endpoint = url;
  // Verifica se há parametros a serem acrescentados
  if (params.category) endpoint += `&category=${params.category}`;
  if (params.difficulty) endpoint += `&difficulty=${params.difficulty}`;
  if (params.limit) endpoint += `&limit=${params.limit}`;
  // faz a requisição da API
  try {
    const getQuestions = await fetch(endpoint);
    const responseQuestions = await getQuestions.json();
    return responseQuestions;
  } catch (error) {
    console.log(error);
  }
};

// Create createQuestionItem

const populateAnswers = (answersArray, mainDiv, key) => {
  answersArray.forEach((answer, index) => {
    const currentAnswer = document.createElement('li');
    currentAnswer.innerText = answer;
    currentAnswer.classList.add('answer');
    if (Object.values(key)[index] === 'true') currentAnswer.classList.add('correct');
    mainDiv.appendChild(currentAnswer);
  });
}

const createQuestionItem = ({ question, answers, correct_answers }) => {
  const questionDiv = document.createElement('div');
  // Somente aceita respostas válidas
  const validAnswers = Object.values(answers).filter((answer) => answer !== null);
  const questionElement = document.createElement('h2');
  const progressBar = document.createElement('progress');
  progressBar.value = progressValue;
  progressBar.max = quizLength;
  questionElement.innerText = question;
  questionDiv.appendChild(questionElement);
  // Itera por todas as respostas válidas e verifica se é a correta para então acrescentar o elemeto à questionDiv
  populateAnswers(validAnswers, questionDiv, correct_answers);
  questionDiv.appendChild(progressBar);
  questionDiv.className = "question-div";
  questionDiv.addEventListener('click', countAnswers);
  progressValue += 1;
  return questionDiv;
}

// Create appendQuestions

const appendQuestions = (container, questions) => {
  quizLength = questions.length;
  questions.forEach((questionObj) => {
    container.appendChild(createQuestionItem(questionObj));
  })
}

// Create integration function

const createQuiz = async () => {
  progressValue = 1;
  //Aqui vamos pegar os valores dos parametros, se houver e chamar as funções necessárias para criar o quiz
  const params = getParams();

  if (Object.keys(params).length === 0) window.alert('Selecione algum parâmetro ou clique em Random!')
  else {
    try {
      const questions = await fetchQuiz(params);
      appendQuestions(questionContainer, questions);
    } catch (error) {
      console.log(error);
    }
  }
}

const randomQuiz = async () => {
  progressValue = 1;
  try {
    const questions = await fetchQuiz({ limit: '10' });
    appendQuestions(questionContainer, questions);
  } catch (error) {
    console.log(error);
  }
}

const generateResult = (result) => {
  const message = `Você acertou ${result} de ${quizLength} perguntas`;
  const average = result / quizLength;
  let gradeMessage = '';
  if (average < .6) gradeMessage = 'Que tal estudar um pouco mais?';
  else if (average < .8) gradeMessage = 'Seu resultado foi MAAAAAAAAAAAARAVILHOSO!';
  else gradeMessage = 'Você é genial. Parabéns!';
  return [message, gradeMessage];
}

const renderResult = (message, gradeMessage) => {
  const resultDiv = document.createElement('div');
  resultDiv.className = 'question-div';
  const mainMessage = document.createElement('h2');
  mainMessage.innerText = message;
  resultDiv.appendChild(mainMessage);
  const grade = document.createElement('li');
  grade.innerText = gradeMessage;
  resultDiv.appendChild(grade);
  const voltar = document.createElement('a');
  voltar.href = './index.html';
  voltar.innerText = 'Voltar à Página Inicial';
  resultDiv.appendChild(voltar);
  resultDiv.classList.add('show');
  questionContainer.appendChild(resultDiv);
}

const nextQuestion = () => {
  const currentHidden = document.querySelector('.show');
  currentHidden.classList.toggle('show');
  if (currentHidden.nextElementSibling) {
    currentHidden.nextElementSibling.classList.toggle('show');
  } else renderResult(...generateResult(correct));
  console.log(`Correct answers: ${correct}`);
}

const countAnswers = (event) => {
  const selected = event.target;
  if (Array.from(selected.classList).includes('answer')) {
    if (Array.from(selected.classList).includes('correct')) correct += 1;
    nextQuestion();
  }
}

const showPlayer = (name) => {
  document.querySelector('#player-name').innerText = name;
  localStorage.removeItem('player');
}

window.onload = async () => {

  showPlayer(player);

  filterBtn.addEventListener('click', async () => {
    questionContainer.innerHTML = '';
    await createQuiz();
    try {
      questionContainer.firstElementChild.classList.toggle('show');
      window.location.replace('#question-container');
      correct = 0;
    } catch (error) {
      console.log('Selecione algum parâmetro ou clique em Random!');
    }
  })

  randomBtn.addEventListener('click', async () => {
    questionContainer.innerHTML = '';
    await randomQuiz();
    questionContainer.firstElementChild.classList.toggle('show');
    window.location.replace('#question-container');
    correct = 0;
  })

}
