const button = document.getElementById('jsTestElement');
const counter = document.getElementById('jsCounter');

button.addEventListener('click', () => {
  increase();
})

const increase = () => {
  const currentValue = parseInt(counter.innerHTML);
  counter.innerHTML = currentValue+1;
}