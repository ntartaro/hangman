//
// Data storage and input
//
var counter = 0														// Gallows status counter
var flipper = true													// one flippy boi
var dataStored = []													// Array with input word split into string letters
const inputField = document.querySelector('.inputField')			// Input field
const inputButton = document.querySelector('.inputButton')			// Begin button
var dataField = document.querySelector('.data').value				// Value of input field
//const validAnswers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '-']

document.querySelector('.y').value = 'Y'							// Values for game over 
document.querySelector('.o').value = 'O'
document.querySelector('.u').value = 'U'
document.querySelector('.l').value = 'L'
document.querySelector('.otwo').value = 'O'
document.querySelector('.s').value = 'S'
document.querySelector('.e').value = 'E'

function validateKeyStrokes(val) {									// Passes input from input field
	var fixedVal = val.toUpperCase()								// Forces uppercase
	fixedVal = fixedVal.replace('1', '')							// Rejects numbers
	fixedVal = fixedVal.replace('2', '')
	fixedVal = fixedVal.replace('3', '')
	fixedVal = fixedVal.replace('4', '')
	fixedVal = fixedVal.replace('5', '')
	fixedVal = fixedVal.replace('6', '')
	fixedVal = fixedVal.replace('7', '')
	fixedVal = fixedVal.replace('8', '')
	fixedVal = fixedVal.replace('9', '')
	fixedVal = fixedVal.replace('0', '')
	return fixedVal													// Sends back fixed input
}

//
// Begin button
//
inputButton.addEventListener('click', function(e) {

	e.preventDefault()
	var dataField = document.querySelector('.data').value 			// Value of input field

	if (dataField == '') {											// Rejects empty field
		return
	} else { 
		flipper = false												// Game state begins
		inputField.style.display = 'none'							// Hides input field + begin button
		dataStored = dataField.split('')							// Splits value of input field into seperate strings and sends to array
		document.querySelector('.data').value = ''					// Clears input field
	}

	for (i =0; i < dataStored.length; i++) {						// Creates letter boxes = length of input field value
		var div = document.createElement('input')					// Creates box
		div.classList.add('answers')								// Assigns class
		if (dataStored[i] == " " || dataStored[i] == "-") {			// If an input is a space or dash, create a black bottom box and fill it with the space or dash
			div.style.border = 'solid 2px black'					
			div.value = dataStored[i]								
		}

		document.querySelector('.answersGoHere').appendChild(div)	// Appends boxes to where they need to go
	}
})

//
// Reset button
//
const resetButton = document.querySelector('.rest')								// The reset button
const remove = document.querySelector('.generatedAnswers')						// Div containing answers

resetButton.addEventListener('click', function(e) {
	if (inputField.style.display == 'none' || dataField == '') {				// Only initialize if input field is hidden or inputfield is blank
		flipper = true															// Game state ends
		inputField.style.display = ''											// Bring back input field
		dataStored = []															// Reset answer array

		for (i = 0; i < document.querySelectorAll('.alphabet').length; i++) {		// Resets letter buttons color
			document.querySelectorAll('.alphabet')[i].style.background = '#39ff14'
			document.querySelectorAll('.alphabet')[i].style.color = 'black'	
		}
		// while (remove.hasChildNodes()) {  										// Older version of deletes answer boxes, keeping just in case
  		//   remove.removeChild(remove.firstChild)
		// }
	}

	 document.querySelectorAll('.answers').forEach(function (el) {			// Deletes answer boxes
	 		el.parentNode.removeChild(el)
	 })

	document.querySelector('.zero').style.display = 'flex'						// Reset Gallows and counter
	document.querySelector('.one').style.display = 'none'
	document.querySelector('.two').style.display = 'none'
	document.querySelector('.three').style.display = 'none'
	document.querySelector('.four').style.display = 'none'
	document.querySelector('.five').style.display = 'none'
	document.querySelector('.six').style.display = 'none'
	document.querySelector('.seven').style.display = 'none'
	document.querySelector('.eight').style.display = 'none'
	document.querySelector('.loser').style.display = 'none'
	counter = 0
})

//
// Letter buttons
//
const letterButton = document.querySelector('.letters')					// Wrapper for letter buttons
var countWin = 0														// Counter for win state	

letterButton.addEventListener('click', function(e) {
	e.preventDefault()

	if (flipper == true) {												// Stops letters from being clicked if game has not begun
		return
	} 

	if (e.target.style.color == 'rgb(57, 255, 20)' || e.target.style == 'black') {	 	// Stops already clicked letters from being clicked again
		return																
	}

	e.target.style.background = 'black'									// Styles letters after being clicked
	e.target.style.color = '#39ff14'
	//e.target.style.border = 'solid 1px #39ff14' (this needs work)

	countWin = 0														// Wipes countWin every iteration
	document.querySelectorAll('.answers').forEach(function (e) {		// Adds number of blank spaces left to var countWin
		if (e.value == '') {
			countWin ++
			return	
		 }
	})

	if (countWin == 1) {												// If there are no spaces left, initiates win condition
		for (i = 0; i < document.querySelectorAll('.alphabet').length; i++) {
			document.querySelectorAll('.alphabet')[i].style.color = '#39ff14'
			document.querySelectorAll('.alphabet')[i].style.background = 'black'	
		}
	}

	if (dataStored.indexOf(e.target.textContent) >= 0) {				// Checks if a clicked letter is in the answer array

		for (i = 0; i < dataStored.length; i++) {
			if (dataStored[i] == e.target.textContent) {				// If yes display answer
				document.querySelectorAll('.answers')[i].value = e.target.textContent
				console.log('SUCCESS')
					} 
				} 
			} else {
				counter ++												// If no advance gallows counter
				console.log('FAILURE')
	}

	// Gallows status
	if (counter == 1) {
		document.querySelector('.zero').style.display = 'none'
		document.querySelector('.one').style.display = 'flex'
	}
	if (counter == 2) {
		document.querySelector('.one').style.display = 'none'
		document.querySelector('.two').style.display = 'flex'
	}
	if (counter == 3) {
		document.querySelector('.two').style.display = 'none'
		document.querySelector('.three').style.display = 'flex'
	}
	if (counter == 4) {
		document.querySelector('.three').style.display = 'none'
		document.querySelector('.four').style.display = 'flex'
	}
	if (counter == 5) {
		document.querySelector('.four').style.display = 'none'
		document.querySelector('.five').style.display = 'flex'
	}
	if (counter == 6) {
		document.querySelector('.five').style.display = 'none'
		document.querySelector('.six').style.display = 'flex'
	}	
	if (counter == 7) {
		document.querySelector('.six').style.display = 'none'
		document.querySelector('.seven').style.display = 'flex'
	}

	// Game over condition
	if (counter == 8) {
		document.querySelector('.seven').style.display = 'none'				// Resets gallows
		document.querySelector('.eight').style.display = 'flex'
		document.querySelector('.loser').style.display = 'flex'				// Displays game over

		document.querySelectorAll('.answers').forEach(function (el) {		// Deletes answer boxes
			el.parentNode.removeChild(el)
		})
		
		for (i = 0; i < document.querySelectorAll('.alphabet').length; i ++) {		// Black out all letters
			document.querySelectorAll('.alphabet')[i].style.background = 'black'
			document.querySelectorAll('.alphabet')[i].style.color = '#39ff14'
		}
	}
})















// // Hangman builder
// //     __________
// //     || //     |
// //     ||//      |
// //     ||/       |
// //     ||        0
// //     ||        |
// //     ||        |
// //     ||       / \
// //     ||       
// // .___||_____     ___.
// // ||        \\      ||
// // ||         \\     ||

// //     __________
// //     || //     |
// //     ||//      |
// //     ||/       |
// //     ||        0
// //     ||       /|\
// //     ||        |
// //     ||       / 
// //     ||       
// // .___||_____     ___.
// // ||        \\      ||
// // ||         \\     ||

// //     __________
// //     || //     |
// //     ||//      |
// //     ||/       |
// //     ||        0
// //     ||       /|\
// //     ||        |
// //     ||        
// //     ||       
// // .___||_____     ___.
// // ||        \\      ||
// // ||         \\     ||


// //     __________
// //     || //     |
// //     ||//      |
// //     ||/       |
// //     ||        0
// //     ||       /|\
// //     ||        
// //     ||        
// //     ||       
// // .___||_____     ___.
// // ||        \\      ||
// // ||         \\     ||


// //     __________
// //     || //     |
// //     ||//      |
// //     ||/       |
// //     ||        0
// //     ||        |\
// //     ||        
// //     ||        
// //     ||       
// // .___||_____     ___.
// // ||        \\      ||
// // ||         \\     ||


// //     __________
// //     || //     |
// //     ||//      |
// //     ||/       |
// //     ||        0
// //     ||        |
// //     ||        
// //     ||       
// //     ||       
// // .___||_____     ___.
// // ||        \\      ||
// // ||         \\     ||


// //     __________
// //     || //     |
// //     ||//      |
// //     ||/       |
// //     ||        0
// //     ||      
// //     ||        
// //     ||       
// //     ||       
// // .___||_____     ___.
// // ||        \\      ||
// // ||         \\     ||


// //     __________
// //     || //     |
// //     ||//      |
// //     ||/       |
// //     ||        
// //     ||       
// //     ||        
// //     ||       
// //     ||       
// // .___||_____     ___.
// // ||        \\      ||
// // ||         \\     ||
