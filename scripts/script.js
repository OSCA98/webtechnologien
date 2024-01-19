function injectQuizLink() {
  const quizLink = document.createElement('a');
  quizLink.href = "Quiz.html"
  quizLink.title= "Zur Seite Weltraum-Quiz"
  quizLink.innerHTML = "Weltraum-Quiz";
  const headerElement = document.getElementById('header');
  headerElement.insertBefore(quizLink,headerElement.children[1])
}

injectQuizLink();