//Store specific elements in variables
const button = document.getElementById('jsTestElement');
const counter = document.getElementById('jsCounter');

//Add clickevent to button-element
button.addEventListener('click', () => {
  //When click, call function 'increase'
  increase();
})

const increase = () => {
  //Get current counter-value as number
  const currentValue = parseInt(counter.innerHTML);
  //Increase value by one
  counter.innerHTML = currentValue+1;
}
