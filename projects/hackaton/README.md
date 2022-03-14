# Tryvia

Aqui foi desenvolvido um projeto bônus ao final do módulo de fundamentos no curso de Desenvolvedor Web na Trybe!

## O projeto

Foi utilizado a API https://quizapi.io/ para desenvolver uma página interativa com quizzes sobre tecnologia.

## Checklist

### 1 - Criar o index.html estático:

    - [X]. header com logo e título;
    - [X]. main com descrição e input para nome;
    - [X]. footer com about-us: linkedin e github do grupo;

### 2 - Criar o estilo para o index.html:

    - [X]. Utilizar bootstrap ou outro framework;
    - [X]. Utilizar o coolors.co ou outro site para paleta de cores;
    - [X]. Desktop only;

### 3 - Criar o quiz.html dinâmico:

    - [X]. header com logo e título – igual ao index.html;
    - [X]. subtitulo de saudação, instruções, selectors de tema e dificuldade, botão de submit;
    - [X]. container de perguntas com contador de perguntas e percentagem de conclusão – obs pesquisar barra de progresso DOM;
    - [X]. footer igual ao index.html;

### 4 - Criar o estilo para o quiz.html:

    - [X]. Mesmas regras para o index.html;

### 5 - Criar funções assíncronas e de manipulação do DOM:

    - [X]. fetchQuiz(params) – responsável por retornar o quiz já filtrado;
    - [X]. createQuestionItem – responsável por criar uma div para a questão dentro do container de perguntas;
    - [X]. appendQuestions – responsável por acrescentar;
    - [X]. integrar funções fetchQuiz e appendQuestions para renderizar perguntas na tela;
    - [X]. nextQuestion – responsável por trocar o display da pergunta atual;
    - [X]. countAnswers – responsável por verificar a resposta e acrescentar ao contador;
    - [X]. generateResult – responsável por verificar total de acertos e selecionar mensagem apropriada;
    - [X]. renderResult – responsável por criar elemento DOM resultado * usando modal * contendo nome, mensagem e total de acertos e botão de refazer o teste;

### 6 - Criar testes para as funções:

    - [X]. Testar fetchQuiz;
    - [X]. Testar funcionamento das HoFs;

### 7 - Criar logo, escolher estilo geral do site:

    - [X]. Criar logo;
    - [X]. Escolher fonte;
    - [X]. Paleta de cores;

<br>
<p align='center'>Aplicação on-line <a href='https://ilanaragao.github.io/projects/hackaton' target='_blank'>aqui</a>.
</p>
