
//Grab all important elements from 'HTML'
const questionElement = document.getElementById("question");
const progressElement = document.getElementById("progressBar");
const answer1Element = document.getElementById("answer1");
const answer2Element = document.getElementById("answer2");
const answer3Element = document.getElementById("answer3");

//Add clickevents to specific elements -> When click, call the handleButtonClick function
answer1Element.addEventListener('click',handleButtonClick)
answer2Element.addEventListener('click',handleButtonClick)
answer3Element.addEventListener('click',handleButtonClick)

//Variables to store current informations
let progressPercentage = 0;
let currentQuestion = null;
const correctAnswersNeeded = 10;
let correctAnswersCount = 0;
let deactivateBtns = false;

//Gets called when click on btn
async function handleButtonClick(event) {
  if (deactivateBtns) {
    return;
  }
  deactivateBtns = true;
  const selectedAnswerId = event.target.id; 
  
  // Check if the selected answer is correct
  const isCorrectAnswer = selectedAnswerId === currentQuestion.TrueAnswer
  if (isCorrectAnswer) {
    colorBtn(selectedAnswerId,'green')
    increaseScore();
  } else {
    colorBtn(selectedAnswerId,'red');
  }
  await sleep(isCorrectAnswer ? 200 : 600);
  resetBtnColor();
  increaseProgressbar();
  // Check if the player has completed the quiz
  if (progressPercentage === 100) {
    await sleep(10);
    alert("Herzlichen Glückwunsch! Sie haben " + correctAnswersCount + " Punkte erreicht. \n Nochmal spielen?");
    // You may choose to reset the game or perform other actions here
    resetQuiz();
  } else {
    loadNewQuestion();
  }
  deactivateBtns = false;
}

/**
 * Call asyncronly to wait given miliseconds 
 * @param {number} delay delay in ms
 * @returns {Promise}
 */
function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

//Manage progressbar
//increase the score when the answer is correct
function increaseScore () {
  correctAnswersCount++;
}
//the progressbar progresses when an answer is given
function increaseProgressbar () {
  progressPercentage = progressPercentage+10;
  progressElement.style.width = progressPercentage + '%';
  progressElement.innerHTML = progressPercentage + "%";
}

//Manages getting new random question and updating HTML
function loadNewQuestion () {
  resetBtnColor();
  const allQuestionsCount = questions.length;
  const newQuestionIndex = Math.floor(Math.random() * allQuestionsCount);
  currentQuestion = questions[newQuestionIndex];

  questionElement.innerHTML = currentQuestion.question;
  answer1Element.innerHTML = currentQuestion.answer1;
  answer2Element.innerHTML = currentQuestion.answer2;
  answer3Element.innerHTML = currentQuestion.answer3;
}

function resetQuiz() {
  progressPercentage = 0;
  correctAnswersCount = 0;
  progressElement.style.width = '0%';
  progressElement.innerHTML = '0%';
  loadNewQuestion();
}

function resetBtnColor() {
  answer1Element.style.color = 'black';
  answer2Element.style.color = 'black';
  answer3Element.style.color = 'black';
}

function colorBtn(answer,color) {
  switch (answer) {
    case 'answer1':
      answer1Element.style.color = color;
      break;
    case 'answer2':
      answer2Element.style.color = color;
      break;
    case 'answer3':
      answer3Element.style.color = color;
      break;
  }
}
//Array of questions
const questions = [
    {
      "question": "Welcher der folgenden Planeten ist der kleinste im Sonnensystem?",
      "answer1": "Mars",
      "answer2": "Merkur",
      "answer3": "Erde",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Wie viele Planeten im Sonnensystem haben Ringe?",
      "answer1": "2",
      "answer2": "4",
      "answer3": "6",
      "TrueAnswer": "answer1"
    },
    {
      "question": "Welches ist der hellste Stern am Nachthimmel?",
      "answer1": "Alpha Centauri",
      "answer2": "Sirius",
      "answer3": "Proxima Centauri",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Welches Raumfahrzeug landete erstmals auf dem Mars?",
      "answer1": "Spirit",
      "answer2": "Viking 1",
      "answer3": "Opportunity",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Welche Raumsonde hat den ersten erfolgreichen Vorbeiflug an Pluto durchgeführt?",
      "answer1": "Voyager 1",
      "answer2": "New Horizons",
      "answer3": "Cassini",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Welcher Planet wird als der 'Abendstern' bezeichnet, wenn er im Westen erscheint?",
      "answer1": "Venus",
      "answer2": "Jupiter",
      "answer3": "Saturn",
      "TrueAnswer": "answer1"
    },
    {
      "question": "Welcher der folgenden Monde hat eine dichte Atmosphäre?",
      "answer1": "Ganymed",
      "answer2": "Titan",
      "answer3": "Europa",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Was ist der Hauptbestandteil der Sonne?",
      "answer1": "Wasserstoff",
      "answer2": "Helium",
      "answer3": "Sauerstoff",
      "TrueAnswer": "answer1"
    },
    {
      "question": "Welcher Planet hat die längste Rotationsdauer?",
      "answer1": "Venus",
      "answer2": "Mars",
      "answer3": "Merkur",
      "TrueAnswer": "answer1"
    },
    {
      "question": "Welche Raumfahrtorganisation hat den Mars Rover 'Curiosity' betrieben?",
      "answer1": "NASA",
      "answer2": "ESA",
      "answer3": "Roskosmos",
      "TrueAnswer": "answer1"
    },
    {
      "question": "Welcher Planet hat die stärksten Winde im Sonnensystem?",
      "answer1": "Jupiter",
      "answer2": "Saturn",
      "answer3": "Neptun",
      "TrueAnswer": "answer1"
    },
    {
      "question": "Welcher Asteroidengürtel befindet sich zwischen Mars und Jupiter?",
      "answer1": "Kuipergürtel",
      "answer2": "Oortscher Wolken",
      "answer3": "Hauptgürtel",
      "TrueAnswer": "answer3"
    },
    {
      "question": "Welcher Mond des Saturn hat einen dichten, orangefarbenen Nebel?",
      "answer1": "Titan",
      "answer2": "Enceladus",
      "answer3": "Iapetus",
      "TrueAnswer": "answer3"
    },
    {
      "question": "Welcher Planet hat eine besonders ausgeprägte, auffällige Ringstruktur?",
      "answer1": "Jupiter",
      "answer2": "Saturn",
      "answer3": "Uranus",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Welcher Satellit wurde 1957 als erster künstlicher Erdsatellit in den Weltraum geschossen?",
      "answer1": "Apollo 11",
      "answer2": "Sputnik 1",
      "answer3": "Hubble Space Telescope",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Welches Ereignis markiert den Beginn der Raumfahrtära für den Menschen?",
      "answer1": "Erster bemannter Mondspaziergang",
      "answer2": "Erster bemannter Raumflug von Yuri Gagarin",
      "answer3": "Erste Mondlandung von Apollo 11",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Wie lange dauert ein Marstag (ein Tag auf dem Mars)?",
      "answer1": "Etwa 24 Stunden",
      "answer2": "Etwa 36 Stunden",
      "answer3": "Etwa 687 Tage",
      "TrueAnswer": "answer3"
    },
    {
      "question": "Welcher Himmelskörper wird als der 'Rote Planet' bezeichnet?",
      "answer1": "Mars",
      "answer2": "Jupiter",
      "answer3": "Venus",
      "TrueAnswer": "answer1"
    },
    {
      "question": "Welcher ist der zweitgrößte Planet im Sonnensystem?",
      "answer1": "Jupiter",
      "answer2": "Saturn",
      "answer3": "Uranus",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Welche Raumsonde hat die ersten Nahaufnahmen von Pluto gemacht?",
      "answer1": "Voyager 1",
      "answer2": "New Horizons",
      "answer3": "Cassini",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Wie viele Kilometer ist der Durchmesser der Erde?",
      "answer1": "Etwa 6.000 km",
      "answer2": "Etwa 12.742 km",
      "answer3": "Etwa 20.000 km",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Welcher Planet wird oft als 'Abendstern' oder 'Morgenstern' bezeichnet?",
      "answer1": "Mars",
      "answer2": "Venus",
      "answer3": "Jupiter",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Welcher der folgenden Monde hat aktive Geysire?",
      "answer1": "Io",
      "answer2": "Europa",
      "answer3": "Callisto",
      "TrueAnswer": "answer1"
    },
    {
      "question": "Welches ist das hellste Objekt am Himmel nach der Sonne und dem Mond?",
      "answer1": "Mars",
      "answer2": "Venus",
      "answer3": "Jupiter",
      "TrueAnswer": "answer2"
    },
    {
      "question": "Welche Raumsonde landete auf Titan, dem größten Mond des Saturn?",
      "answer1": "Cassini",
      "answer2": "Voyager 1",
      "answer3": "Huygens",
      "TrueAnswer": "answer3"
    },
    {
      "question": "Wie viele Sterne gibt es ungefähr in unserer Milchstraße?",
      "answer1": "Hunderttausende",
      "answer2": "Millionen",
      "answer3": "Milliarden",
      "TrueAnswer": "answer3"
    }
  ];

loadNewQuestion();