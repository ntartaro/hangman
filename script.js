//
// Data storage and input
const words = require('an-array-of-english-words');
const funWords = words[Math.floor(Math.random() * 274919)];
var counter = 0; // Gallows status counter
var flipper = true; // one flippy boi
var dataStored = []; // Array with input word split into string letters
const inputField = document.querySelector('.inputField'); // Input field
const inputButton = document.querySelector('.inputButton'); // Begin button
var dataField = document.querySelector('.data').value; // Value of input field
//const validAnswers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '-']

document.querySelector('.y').value = 'Y'; // Values for game over
document.querySelector('.o').value = 'O';
document.querySelector('.u').value = 'U';
document.querySelector('.l').value = 'L';
document.querySelector('.otwo').value = 'O';
document.querySelector('.s').value = 'S';
document.querySelector('.e').value = 'E';

function validateKeyStrokes(val) {
  // Passes input from input field
  var fixedVal = val.toUpperCase(); // Forces uppercase
  fixedVal = fixedVal.replace('1', ''); // Rejects numbers
  fixedVal = fixedVal.replace('2', '');
  fixedVal = fixedVal.replace('3', '');
  fixedVal = fixedVal.replace('4', '');
  fixedVal = fixedVal.replace('5', '');
  fixedVal = fixedVal.replace('6', '');
  fixedVal = fixedVal.replace('7', '');
  fixedVal = fixedVal.replace('8', '');
  fixedVal = fixedVal.replace('9', '');
  fixedVal = fixedVal.replace('0', '');
  return fixedVal; // Sends back fixed input
}

//
//Start button
const startButton = document.querySelector('.startButton');
startButton.addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.startWrapper').style.display = 'none';
  document.querySelector('.invisible').style.display = 'block';
});

//
//Random button
const randomButton = document.querySelector('.randomButton');
randomButton.addEventListener('click', function(e) {
  e.preventDefault();
  var dataField = words[Math.floor(Math.random() * 274919)];

  if (dataField == '') {
    // Rejects empty field
    return;
  } else {
    flipper = false; // Game state begins
    inputField.style.display = 'none'; // Hides input field + begin button
    dataStored = dataField.toUpperCase().split(''); // Splits value of input field into seperate strings and sends to array
    document.querySelector('.data').value = ''; // Clears input field
    console.log(dataField);
    console.log(dataStored);
  }

  for (i = 0; i < dataStored.length; i++) {
    // Creates letter boxes = length of input field value
    var div = document.createElement('input'); // Creates box
    div.classList.add('answers'); // Assigns class
    if (dataStored[i] == ' ' || dataStored[i] == '-' || dataStored[i] == "'") {
      // If an input is a space or dash, create a black bottom box and fill it with the space or dash
      div.style.border = 'solid 2px black';
      div.value = dataStored[i];
    }
    document.querySelector('.generated').appendChild(div); // Appends boxes to where they need to go
  }
});

//
// Begin button
inputButton.addEventListener('click', function(e) {
  e.preventDefault();
  var dataField = document.querySelector('.data').value; // Value of input field

  if (dataField == '') {
    // Rejects empty field
    return;
  } else {
    flipper = false; // Game state begins
    inputField.style.display = 'none'; // Hides input field + begin button
    dataStored = dataField.toUpperCase().split(''); // Splits value of input field into seperate strings and sends to array
    document.querySelector('.data').value = ''; // Clears input field
  }

  for (i = 0; i < dataStored.length; i++) {
    // Creates letter boxes = length of input field value
    var div = document.createElement('input'); // Creates box
    div.classList.add('answers'); // Assigns class
    if (dataStored[i] == ' ' || dataStored[i] == '-' || dataStored[i] == "'") {
      // If an input is a space or dash, create a black bottom box and fill it with the space or dash
      div.style.border = 'solid 2px black';
      div.value = dataStored[i];
    }

    document.querySelector('.generated').appendChild(div); // Appends boxes to where they need to go
  }
});

//
// Reset button
const resetButton = document.querySelector('.rest'); // The reset button
const remove = document.querySelector('.generated'); // Div containing answers
resetButton.addEventListener('click', function(e) {
  function GameOver() {
    // Only initialize if input field is hidden or input field is blank
    if (inputField.style.display == 'none' || dataField == '') {
      // Game state ends
      flipper = true;
      // Bring back input field
      inputField.style.display = '';
      // Reset answer array
      dataStored = [];
      // Resets letter buttons color
      for (i = 0; i < document.querySelectorAll('.alphabet').length; i++) {
        document.querySelectorAll('.alphabet')[i].style.background = '#39ff14';
        document.querySelectorAll('.alphabet')[i].style.color = 'black';
      }
    }
    RemoveAnswers();
  }
  function RemoveAnswers() {
    // Deletes answer boxes
    document.querySelectorAll('.answers').forEach(function(el) {
      el.parentNode.removeChild(el);
    });
    // Reset Gallows and counter
    document.querySelector('.zero').style.display = 'flex';
    document.querySelector('.one').style.display = 'none';
    document.querySelector('.two').style.display = 'none';
    document.querySelector('.three').style.display = 'none';
    document.querySelector('.four').style.display = 'none';
    document.querySelector('.five').style.display = 'none';
    document.querySelector('.six').style.display = 'none';
    document.querySelector('.seven').style.display = 'none';
    document.querySelector('.eight').style.display = 'none';
    document.querySelector('.loser').style.display = 'none';
    document.querySelector('.win').style.display = 'none';
    counter = 0;
  }
  GameOver();
});

// -------- Letter buttons -------- //
const letterButton = document.querySelector('.letters'); // Wrapper for letter buttons
letterButton.style.backgroundColor = 'black';
var countWin = 0; // Counter for win state
letterButton.addEventListener('click', function(e) {
  e.preventDefault();
  function LetterChecker() {
    // Stops letters from being clicked if game has not begun
    if (flipper == true) {
      return;
    }
    // Stops already clicked letters from being clicked again
    if (
      e.target.style.color == 'rgb(57, 255, 20)' ||
      e.target.style.backgroundColor == 'black'
    ) {
      return;
    }
    SuccessfulLetterClick();
  }

  function SuccessfulLetterClick() {
    // Wipes countWin every iteration
    countWin = 0;
    // Styles letters after being clicked
    e.target.style.background = 'black';
    e.target.style.color = '#39ff14';
    // Checks if a clicked letter is in the answer array
    if (dataStored.indexOf(e.target.textContent) >= 0) {
      for (i = 0; i < dataStored.length; i++) {
        if (dataStored[i] == e.target.textContent) {
          // If yes display answer
          document.querySelectorAll('.answers')[i].value = e.target.textContent;
          console.log('SUCCESS');
        }
      }
    } else {
      // If no advance gallows counter
      counter++;
      console.log('FAILURE');
    }
    // Adds number of blank spaces left to var countWin
    document.querySelectorAll('.answers').forEach(function(e) {
      if (e.value == '') {
        console.log(countWin);
        countWin++;
        return;
      }
    });
    GallowsAdvancer();
  }

  function GallowsAdvancer() {
    // Gallows status
    if (counter == 1) {
      document.querySelector('.zero').style.display = 'none';
      document.querySelector('.one').style.display = 'flex';
    }
    if (counter == 2) {
      document.querySelector('.one').style.display = 'none';
      document.querySelector('.two').style.display = 'flex';
    }
    if (counter == 3) {
      document.querySelector('.two').style.display = 'none';
      document.querySelector('.three').style.display = 'flex';
    }
    if (counter == 4) {
      document.querySelector('.three').style.display = 'none';
      document.querySelector('.four').style.display = 'flex';
    }
    if (counter == 5) {
      document.querySelector('.four').style.display = 'none';
      document.querySelector('.five').style.display = 'flex';
    }
    if (counter == 6) {
      document.querySelector('.five').style.display = 'none';
      document.querySelector('.six').style.display = 'flex';
    }
    if (counter == 7) {
      document.querySelector('.six').style.display = 'none';
      document.querySelector('.seven').style.display = 'flex';
    }
    // Game over condition
    if (counter == 8 && countWin == 0) {
      GameLose();
    }
    GameWin();
  }

  function GameLose() {
    console.log('You Lost');
    // Resets gallows
    document.querySelector('.win').style.display = 'none';
    document.querySelector('.seven').style.display = 'none';
    document.querySelector('.eight').style.display = 'flex';
    // Displays game over
    document.querySelector('.loser').style.display = 'flex';
    // Displays word after loss
    for (i = 0; i < dataStored.length; i++) {
      document.querySelectorAll('.answers')[i].value = dataStored[i];
    }
    // Black out all letters
    for (i = 0; i < document.querySelectorAll('.alphabet').length; i++) {
      document.querySelectorAll('.alphabet')[i].style.background = 'black';
      document.querySelectorAll('.alphabet')[i].style.color = '#39ff14';
    }
    return;
  }

  function GameWin() {
    // If there are no spaces left, initiates win condition
    if (countWin == 0 && counter !== 8) {
      console.log('You Win');
      // Hides all gallows
      var gallowsCount = document.querySelectorAll('.g');
      for (i = 0; i < gallowsCount.length; i++) {
        gallowsCount[i].style.display = 'none';
      }
      // Displays win page
      document.querySelector('.win').style.display = 'flex';
      // Turns all letters off
      for (i = 0; i < document.querySelectorAll('.alphabet').length; i++) {
        document.querySelectorAll('.alphabet')[i].style.color = '#39ff14';
        document.querySelectorAll('.alphabet')[i].style.background = 'black';
      }
    }
  }

  LetterChecker();
});
