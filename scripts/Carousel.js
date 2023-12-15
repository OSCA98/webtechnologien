//Grab al HTML-elements
const slideshow = document.getElementById("slideshow");
const backBtn = document.getElementById("carouselBackBtn")
const forwardBtn = document.getElementById("carouselForwardBtn")

//Add clickevents to btns
backBtn.addEventListener('click',handleLeftBtnClick);
forwardBtn.addEventListener('click',handleRightBtnClick);


//Array of pictures
const slideData = [
  {
    header: 'Header 1',
    imgPath: '../images/planeten/Erde.png',
    text: 'Text 1'
  },
  {
    header: 'Header 2',
    imgPath: '../images/planeten/Jupiter.png',
    text: 'Text 2'
  },
  {
    header: 'Header 3',
    imgPath: '../images/planeten/Mars.png',
    text: 'Text 3'
  }
]

//Take track of current position in array
let currentSlideIndex = 0;
//Keeps track if banner is currently moving to prevent multiple btn-clicks
let isProcessing = false;
//Timer to automaticly slide banner in ms
let autoSlideTimer = 5000;

/**
 * Loads initial 3 slides:
 * 1 left
 * current slide
 * 1 right
 */
function initSlideShow() {
  addSlide(getSlideIndex(currentSlideIndex+1),-1);
  addSlide(getSlideIndex(currentSlideIndex),0);
  addSlide(getSlideIndex(currentSlideIndex-1),1);
}

/**
 * Manages to autoslide banner
 */
function autoSlideClock() {
  //If remaining time is 0 --> slide right and reset timer
  if (autoSlideTimer <= 0) {
    handleRightBtnClick()
    autoSlideTimer = 5000;
  } else {
    //Else, just reduce timer by 1second
    autoSlideTimer -= 1000;
  }
  //Reinvoce timerfunction after 1 second
  setTimeout(autoSlideClock,1000);
}

/**
 * Gets called when left button is clicked
 */
async function handleLeftBtnClick() {
  //If banner is currently moving --> ignore btn-click
  if (isProcessing) {
    return;
  }
  isProcessing = true;
  autoSlideTimer = 5000;
  //Add slide on the outer left position (2 lengths left of current slide)
  addSlide(getSlideIndex(2),-2,'first')
  //Move whole banner to the right --> new current slide
  await move(1);
  //Remove rightest slide (which was (after moving) 2 lengths right of current slide)
  removeSlide('last');
  isProcessing = false;
}

/**
 * Gets called when right button is clicked
 */
async function handleRightBtnClick() {
  //If banner is currently moving --> ignore btn-click
  if (isProcessing) {
    return;
  }
  isProcessing = true;
  autoSlideTimer = 5000;
  //Add slide on the outer right position (2 lengths right of current slide)
  addSlide(getSlideIndex(-2),2,'last')
  //Move whole banner to the left --> new current slide
  await move(-1);
  //Remove leftest slide (which was (after moving) 2 lengths left of current slide)
  removeSlide('first');
  isProcessing = false;
}

/**
 * Gets arrayindex which specific location based on given number and currentSlidePosition
 * @param {number} relativePosition positionshift relative to currentSlideIndex
 * @returns Relative index
 */
function getSlideIndex(relativePosition) {
  const allSlidesLength = slideData.length;
  return modulo(relativePosition+currentSlideIndex,allSlidesLength);
}

/**
 * 
 * @param {number} slideIndex Index of the picture
 * @param {number} offset Position where to add relative to the slidecenter
 * @param {Enumerator} addOrder 'first','last'=>add at beggining/end of HTML-Tree
 */
function addSlide(slideIndex,offset,addOrder = 'last') {

  //Create element and add CSS-properties

  //Background div
  const div = document.createElement('div');
  div.style.position = "absolute";
  div.style.height = "100%";
  div.style.width = "100%";
  div.style.left = `${offset*100}%`;
  div.style.backgroundImage=`url(${slideData[slideIndex].imgPath})`;
  div.style.backgroundSize='cover';

  //Header
  const h2 = document.createElement('h2');
  h2.innerHTML = slideData[slideIndex].header;
  //Text
  const span = document.createElement('span');
  span.innerHTML = slideData[slideIndex].text;
  div.appendChild(h2);
  div.appendChild(span);

  //Add to HTML-tree based on given add-order
  if (addOrder == 'first') {
    slideshow.prepend(div)
  } else {
    slideshow.append(div)
  }
}

/**
 * Removes slide from HTML-Tree at first or last position
 * @param {Enumerator} removeOrder 'first','last' to remove first or last slide
 */
function removeSlide(removeOrder) {
  const removeIndex = removeOrder == 'first' ? 0 : slideshow.children.length-1;
  slideshow.removeChild(slideshow.children[removeIndex])
}

/**
 * Call asyncronly to wait given miliseconds 
 * @param {number} delay delay in ms
 * @returns {Promise}
 */
function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * Performes modulooperation on two given numbers
 * Negative baseNumbers get handled like the 'analytical continuation of modulo in the set of natural number'
 * For example: modulo(-3,5)==modulo(2,5)==2
 * @param {number} baseNumber 
 * @param {number} divisor 
 * @returns baseNumber mod divisor
 */
function modulo(baseNumber,divisor) {
  if (baseNumber >= 0) {
    return baseNumber%divisor;
  }
  return ((Math.ceil(-baseNumber/divisor)*divisor)+baseNumber)%divisor;
}

/**
 * Moves the banner a given amount of slides to the right (Negative numbers for left)
 * @param {number} direction Number of slidemoves
 */
async function move(direction) {
  //Specifies in how many steps the banners gets moves
  const RESOLUTION = 50;
  //Specifies the complete duration to perform all steps (in miliseconds)
  const DURATION = 500; //ms

  //Perform movement multiple times
  for (let i = 0 ; i < RESOLUTION ; i++) {
    //Wait some time
    await sleep(DURATION/RESOLUTION);
    //Move banner some amount
    moveAllSlides(direction/RESOLUTION);
  }

  //Update currentSlideIndex to stay aware of the current position
  currentSlideIndex = modulo(currentSlideIndex+direction,slideData.length);
}

/**
 * Moves all banners a given percentage to the right (negative numbers for left)
 * @param {number} movePercentage Percentage to move banner 
 */
function moveAllSlides(movePercentage) {
  //Grab all slides..
  const slides = slideshow.children;
  //..and perform movement for each of them
  for (let i = 0 ; i < slides.length; i++) {
    //Get one specific slide
    const slide = slides[i];
    //Get style
    const positionStringWithPercentage = slide.style.left; //For example '200%'
    //Cut '%' symbol
    const positionString = positionStringWithPercentage.substring(0,positionStringWithPercentage.length-1); //For example '200'
    //Convert from string to number
    const currentSlidePosition = parseInt(positionStringWithPercentage)
    //Set new value
    slide.style.left = (currentSlidePosition + movePercentage*100) + "%";
  }
}

//Init first 3 Banners
initSlideShow();

autoSlideClock();