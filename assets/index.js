/* Creating variables for the elements in the HTML. */
/* Selecting all the elements with the class of diff__btn and getting the innerHTML of that element. */
let diffEls = document.querySelectorAll(".diff__btn");

/* Selecting the element with the class of diff__btn and active and getting the innerHTML of that
element. */
let diffEl = document.querySelector(".diff__btn.active").innerHTML;

/* Creating a variable called n and setting it equal to the value of diffEl. */

/* Selecting the element with the class of colors. */
let colorsEl = document.querySelector(".colors");

/* Creating a variable called colorsBlocks. */
let colorsBlocks;

/* Selecting the element with the class of rgb. */
let rgbEl = document.querySelector(".rgb");

/* Selecting the element with the class of status. */
let statusEl = document.querySelector(".status");

/* Creating an empty array. */
let colors = [];

/* Creating the blocks of color. */
createBlocks(diffEl);
/* Resetting the game by creating new blocks, picking new colors, 
and setting the colors of the blocks. */
resetGame();

/* Adding an event listener to the element with the class of diff__btn. */
addGlobalEventListener("click", ".diff__btn", (e) => {
  [...e.target.parentElement.children].forEach((sib) =>
    sib.classList.remove("active")
  );
  e.target.classList.add("active");

  setNumberOfTiles(e.target.innerHTML);
});

addGlobalEventListener("click", ".colors__block", (e) => {
  checkColors(e);
});
/**
 * Generate a global event listener for every clicked action
 * @param {*} type
 * @param {*} selector
 * @param {*} callback
 */

/**
 * Add an event listener to the document that will call the callback function if the event target
 * matches the selector.
 * @param {*} type - The event type, such as "click" or "mouseover".
 * @param {*} selector - The CSS selector to match against.
 * @param  callback - The function to call when the event is triggered.
 */
function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
}
/**
 * If the data-colors attribute of the clicked element is equal to the colorsBlocks variable,
 *  then run
 * the AbstractRange function.
 * @param {e} - the event object
 */
// function checkColors(e) {
//   if (rgbEl.innerText.tolowerCase() == e.target.style.backgroundColor) {
//     statusEl.innerHTML = "You win!";

//     for (let i = 0; i < colorsBlocks.length; i++) {
//       colorsBlocks[i].style.backgroundColor = e.target.style.backgroundColor;
//     }
//     setTimeout(() => {
//       resetGame();
//     }, 5000);
//     console.log("You win!");
//   } else {
//     e.target.style.display = "none";
//   }
// }
function checkColors(e) {
  if (rgbEl.innerText.toLowerCase() == e.target.style.backgroundColor) {
    statusEl.innerHTML = "You guessed the right color!";

    // cycle through the colorsBlocks and assign each a backgroundColor of selected color
    for (let i = 0; i < colorsBlocks.length; i++) {
      colorsBlocks[i].style.backgroundColor = e.target.style.backgroundColor;
    }

    setTimeout(() => {
      resetGame();
    }, 5000);

    // console.log("You win!");
  } else {
    e.target.style.display = "none";
  }
}
/**
 * It resets the game by creating new blocks, picking new colors, and setting the colors of the blocks
 */
function resetGame() {
  createBlocks(diffEl); // crete new color blocks based on number of tiles selected by player
  document.body.style.color = "black"; // reset do cument style color to black
  colors = []; // reset color array to empty
  pickColors(); // Invoke pickColors function
  pickedColor = random(diffEl);
  rgbEl.innerHTML = colors[pickedColor];
  setColors();
  statusEl.innerHTML =
    "Try to guess the right color based on the RGB value by clicking on the blocks.";
}

/**
 * For each color block, set its background color to the corresponding color in the
 * colors array.
 */
function setColors() {
  for (let i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].style.backgroundColor = colors[i];
  }
}

/**
 * For each of the n squares, add a random color to the colors array.
 */
function pickColors() {
  for (let i = 0; i < diffEl; i++) {
    colors.push(randomColor());
  }
}

/**
 * It returns a random color.
 * @returns A string with the format "rgb(x, y, z)" where x, y, and z are numbers
 * between 0 and 255.
 */
function randomColor() {
  return "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")";
}

/**
 * It returns a random number between 0 and the number you pass to it.
 * @param {*}r - The range of the random number.
 * @returns The random number is being returned.
 */
function random(r) {
  return Math.floor(Math.random() * r);
}

/**
 * When the user clicks on the button, the function should get the value of the input field,
 *  and then
 * call the `setNumberOfTiles` function, passing in the value as an argument.
 * @param {e} - the event object
 */
function setNumberOfTiles(e) {
  createBlocks(e);
  pickColors();
  setColors();
}

/* Creating the blocks of color. */
/**
 * This function creates the blocks of color depending on the number of colors you choose,
 * and adds an
 * event listener to each block.
 * @param {num} - the number of blocks to create
 */
function createBlocks(num) {
  colorsEl.innerHTML = "";

  // here is an example of a loop that is used to create the blocks of color depending
  // on you choice ie 6 or 9, however you need to add event listeners
  /* Creating the blocks of color depending on the number of colors you choose. */
  for (let i = 0; i < num; i++) {
    let block = document.createElement("div");
    block.classList.add("colors__block");
    colorsEl.appendChild(block);
  }
  /* Adding an event listener to each block. */
  colorsBlocks = document.querySelectorAll(".colors__block");

  for (let i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].addEventListener("click", checkColors);
  }
}