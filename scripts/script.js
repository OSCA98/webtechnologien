/**
 * When JS is deactivated, we want the quizOption not to appear in the header
 * Therefore we inject this option via JS
 */
function injectQuizLink() {
  const quizLink = document.createElement('a');
  quizLink.href = "Quiz.html"
  quizLink.title= "Zur Seite Weltraum-Quiz"
  quizLink.innerHTML = "Weltraum-Quiz";
  const headerElement = document.getElementById('header');
  //Inject element before children[1] ('Impressum&Kontakt)
  headerElement.insertBefore(quizLink,headerElement.children[1])
}

injectQuizLink();