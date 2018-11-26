//
// -------------------------------- GLOBAL VARIABLES -------------------------------- //
//
// Imported word package
const words = require('an-array-of-english-words');
// Gallows status counter
var gallowsCounter = 0;
// Game state - game not started(true) or game started(false)
var flipper = true;
// Array where hangman word is split into letters as strings
var storedWord = [];
// Game buttons and input field wrapper
const gameButtonWrapper = document.querySelector('.game-button-wrapper');
// Value of input field
const userWordInput = document.querySelector('.data').value;
// All letter buttons
const letterButtons = document.querySelectorAll('.letter-button');
// Gallows
const gallowsStart = document.querySelector('.zero');
const gallowsOne = document.querySelector('.one');
const gallowsTwo = document.querySelector('.two');
const gallowsThree = document.querySelector('.three');
const gallowsFour = document.querySelector('.four');
const gallowsFive = document.querySelector('.five');
const gallowsSix = document.querySelector('.six');
const gallowsSeven = document.querySelector('.seven');
const gallowsLose = document.querySelector('.eight');
const gallowsWin = document.querySelector('.win');
// const gallowsLoser = document.querySelector('.loser')

// Values for game over
document.querySelector('.y').value = 'Y';
document.querySelector('.o').value = 'O';
document.querySelector('.u').value = 'U';
document.querySelector('.l').value = 'L';
document.querySelector('.otwo').value = 'O';
document.querySelector('.s').value = 'S';
document.querySelector('.e').value = 'E';

//
// -------------------------------- GLOBAL FUNCTIONS -------------------------------- //
//
function LetterBoxCreator() {
  // Creates letter boxes equal to length of input field value
  for (i = 0; i < storedWord.length; i++) {
    // Creates box
    var div = document.createElement('input');
    // Assigns class
    div.classList.add('answers');
    // If an input is a space or dash, create a black bottom box and fill it with the space or dash
    if (storedWord[i] == ' ' || storedWord[i] == '-' || storedWord[i] == "'") {
      div.style.border = 'solid 2px black';
      div.value = storedWord[i];
    }
    // Appends boxes to their designated wrapper area
    document.querySelector('.generated-answer-wrapper').appendChild(div);
  }
}

function LetterColorReset() {
  for (i = 0; i < letterButtons.length; i++) {
    // Black out all letters
    letterButtons[i].style.background = 'black';
    letterButtons[i].style.color = '#39ff14';
  }
}

//
// -------------------------------- START BUTTON -------------------------------- //
//
const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', function(e) {
  e.preventDefault();
  // Hides start button, brings out gallows
  document.querySelector('.start-button-wrapper').style.display = 'none';
  document.querySelector('.invisible').style.display = 'block';
});

//
// -------------------------------- RANDOM WORD BUTTON -------------------------------- //
//
// Random Button
const randomButton = document.querySelector('.random-button');
// Random button event listener
randomButton.addEventListener('click', function(e) {
  e.preventDefault();
  RandomGameStart();

  function RandomGameStart() {
    // Game state begins
    flipper = false;
    // Hides input field + begin button
    gameButtonWrapper.style.display = 'none';
    // Clears input field
    userWordInput.value = '';
    // Selects random word
    var randomWord = words[Math.floor(Math.random() * 274919)];
    // Splits random word into seperate strings and sends to array
    storedWord = randomWord.toUpperCase().split('');
    console.log(randomWord);
    console.log(storedWord);
    LetterBoxCreator();
  }
});

//
// -------------------------------- BEGIN BUTTON -------------------------------- //
//
// Begin button
const beginButton = document.querySelector('.begin-button');
// Begin button event listener
beginButton.addEventListener('click', function(e) {
  e.preventDefault();
  NormalGameStart();

  function NormalGameStart() {
    // Takes user word input
    var userWord = document.querySelector('.data').value;
    // Rejects empty field
    if (userWord == '') {
      return;
    } else {
      // Game state begins
      flipper = false;
      // Hides input field + begin button
      gameButtonWrapper.style.display = 'none';
      // Splits user word into seperate strings and sends to array
      storedWord = userWord.toUpperCase().split('');
      // Clears input field
      userWordInput.value = '';
      console.log(userWord);
      console.log(storedWord);
      LetterBoxCreator();
    }
  }
});

//
// -------------------------------- RESET BUTTON -------------------------------- //
//
// Reset button
const resetButton = document.querySelector('.reset-button');
// Reset button event listener
resetButton.addEventListener('click', function(e) {
  e.preventDefault();
  ResetGameState();

  function ResetGameState() {
    // Bring back input field
    gameButtonWrapper.style.display = '';
    // Reset input field
    document.querySelector('.data').value = '';
    // Reset gallows counter
    gallowsCounter = 0;
    // Set game state to not started
    flipper = true;
    // Reset answer array
    storedWord = [];
    // Reset gallows display
    gallowsStart.style.display = 'flex';
    gallowsOne.style.display = 'none';
    gallowsTwo.style.display = 'none';
    gallowsThree.style.display = 'none';
    gallowsFour.style.display = 'none';
    gallowsFive.style.display = 'none';
    gallowsSix.style.display = 'none';
    gallowsSeven.style.display = 'none';
    gallowsLose.style.display = 'none';
    document.querySelector('.loser').style.display = 'none';
    gallowsWin.style.display = 'none';
    // Reset letter buttons color
    for (i = 0; i < letterButtons.length; i++) {
      letterButtons[i].style.background = '#39ff14';
      letterButtons[i].style.color = 'black';
    }
    RemoveAnswers();
  }

  function RemoveAnswers() {
    // Deletes answer boxes
    document.querySelectorAll('.answers').forEach(function(el) {
      el.parentNode.removeChild(el);
    });
    console.log('Game reset');
  }
});

//
// -------------------------------- LETTER BUTTONS -------------------------------- //
//
// Wrapper for letter buttons
const letterButton = document.querySelector('.letters-wrapper');
// Styled to avoid interactivity with letter wrapper, only want letters clickable
letterButton.style.backgroundColor = 'black';
// Letter button listener
letterButton.addEventListener('click', function(e) {
  e.preventDefault();
  LetterChecker();

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
    // Wipes counter for win state every iteration
    countWin = 0;
    // Styles letters after being clicked
    e.target.style.background = 'black';
    e.target.style.color = '#39ff14';
    // Checks if a clicked letter is in the answer array
    if (storedWord.indexOf(e.target.textContent) >= 0) {
      for (i = 0; i < storedWord.length; i++) {
        if (storedWord[i] == e.target.textContent) {
          // If yes display answer
          document.querySelectorAll('.answers')[i].value = e.target.textContent;
          console.log('Correct guess');
        }
      }
    } else {
      // If no advance gallows counter
      gallowsCounter++;
      console.log('Bad guess');
    }
    // Adds number of blank spaces left to var countWin
    document.querySelectorAll('.answers').forEach(function(e) {
      if (e.value == '') {
        countWin++;
        return;
      }
    });
    GallowsAdvancer();
  }

  function GallowsAdvancer() {
    // Gallows status
    if (gallowsCounter == 1) {
      gallowsStart.style.display = 'none';
      gallowsOne.style.display = 'flex';
    }
    if (gallowsCounter == 2) {
      gallowsOne.style.display = 'none';
      gallowsTwo.style.display = 'flex';
    }
    if (gallowsCounter == 3) {
      gallowsTwo.style.display = 'none';
      gallowsThree.style.display = 'flex';
    }
    if (gallowsCounter == 4) {
      gallowsThree.style.display = 'none';
      gallowsFour.style.display = 'flex';
    }
    if (gallowsCounter == 5) {
      gallowsFour.style.display = 'none';
      gallowsFive.style.display = 'flex';
    }
    if (gallowsCounter == 6) {
      gallowsFive.style.display = 'none';
      gallowsSix.style.display = 'flex';
    }
    if (gallowsCounter == 7) {
      gallowsSix.style.display = 'none';
      gallowsSeven.style.display = 'flex';
    }
    // Game over condition
    if (gallowsCounter == 8) {
      GameLose();
    }
    // Game win condition
    if (countWin == 0 && gallowsCounter !== 8) {
      GameWin();
    }
  }

  function GameLose() {
    console.log('You Lose');
    // Resets gallows and displays game over
    gallowsWin.style.display = 'none';
    gallowsSeven.style.display = 'none';
    gallowsLose.style.display = 'flex';
    document.querySelector('.loser').style.display = 'flex';
    // Displays word after loss
    for (i = 0; i < storedWord.length; i++) {
      document.querySelectorAll('.answers')[i].value = storedWord[i];
    }
    LetterColorReset();
  }

  function GameWin() {
    // If there are no spaces left, initiates win condition
    console.log('You Win');
    // Hides all gallows
    var gallowsCount = document.querySelectorAll('.g');
    for (i = 0; i < gallowsCount.length; i++) {
      gallowsCount[i].style.display = 'none';
    }
    // Displays win page
    gallowsWin.style.display = 'flex';
    LetterColorReset();
  }
});

// Old code

// function validateKeyStrokes(val) {									// Passes input from input field
// 	var fixedVal = val.toUpperCase()								// Forces uppercase
// 	fixedVal = fixedVal.replace('1', '')							// Rejects numbers
// 	fixedVal = fixedVal.replace('2', '')
// 	fixedVal = fixedVal.replace('3', '')
// 	fixedVal = fixedVal.replace('4', '')
// 	fixedVal = fixedVal.replace('5', '')
// 	fixedVal = fixedVal.replace('6', '')
// 	fixedVal = fixedVal.replace('7', '')
// 	fixedVal = fixedVal.replace('8', '')
// 	fixedVal = fixedVal.replace('9', '')
// 	fixedVal = fixedVal.replace('0', '')
// 	return fixedVal													// Sends back fixed input
// }
// function doop() {
// 	fetch(`https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v1/entries/en/${dataField}`, {
// 		headers:{
// 			app_id: '716a1b5e',
// 			app_key: '8dbd84f4996ac91b9ede09e74d924e1d'
// 		}
// 	}).then(response => {
// 		console.log(response.status)
// 		if(response.status == 404) {
// 			doop()
// 			return
// 		}
// 		response.json().then(json => {
// 		  let data = json;
// 		  console.log(data)
// 		  console.log(data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0])
// 		})

// function getRandom(dataField) {
// 	fetch(`https://cors-escape.herokuapp.com/https://owlbot.info/api/v2/dictionary/${dataField}`).then(response => {
// 		// console.log(response)
// 		response.json().then(json => {
// 		  let data = json;
// 		  if (data.length > 0) {
// 			  return data
// 			// console.log("data: ", data)
// 		  } else {
// 			  return null
// 			//   getRandom()
// 			//   console.log("no answer")
// 		  }

// 		//   console.log(data[0].definition)

// 		});
// 	  });
// }
{/* <pre>                                                           
    |/|                                                         
    | |                                                         
    |/|      _                                                  
   (___)    | |                                                 
   (___)    | |__   __ _ _ __   __ _ _ __ ___   __ _ _ __       
   (___)    | '_ \ / _` | '_ \ / _` | '_ ` _ \ / _` | '_ \      
   // \\    | | | | (_| | | | | (_| | | | | | | (_| | | | |     
  //   \\   |_| |_|\__,_|_| |_|\__, |_| |_| |_|\__,_|_| |_| v1.0
 ||     ||                      __/ | 
 ||     ||                     |___/ 
  \\___//   					 
   -----
</pre> */}