//
// Data storage and input
//
var deleter = document.querySelectorAll('.answers')
var counter = 0														//Gallows status counter
var flipper = true													//one flippy boi
var dataStored = []													//Array with input word split into string letters
var theGallows = document.querySelector('.gallows pre').textContent //The gallows current state
const inputField = document.querySelector('.inputField')			//Input field
const inputButton = document.querySelector('.inputButton')			//Begin button
var dataField = document.querySelector('.data').value				//Value of input field
const validAnswers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '-']

document.querySelector('.y').value = 'Y'
document.querySelector('.o').value = 'O'
document.querySelector('.u').value = 'U'
document.querySelector('.l').value = 'L'
document.querySelector('.o').value = 'O'
document.querySelector('.s').value = 'S'
document.querySelector('.e').value = 'E'


// Begin button
inputButton.addEventListener('click', function(e) {

	e.preventDefault()
	var dataField = document.querySelector('.data').value

	if (dataField == '') {
		return
	} else { 
		flipper = false
		inputField.style.display = 'none'
		dataStored = dataField.split('')
		document.querySelector('.data').value = ''
	}

	for (i =0; i < dataStored.length; i++) {
		var div = document.createElement('input')
		div.classList.add('answers')
		if (dataStored[i] == " " || dataStored[i] == "-") {
			div.style.border = 'solid 2px black'
			div.value = dataStored[i]
		}

		document.querySelector('.answersGoHere').appendChild(div)
	}
})

// Reset button
const resetButton = document.querySelector('.rest')
const remove = document.querySelector('.generatedAnswers')

resetButton.addEventListener('click', function(e) {
	if (inputField.style.display == 'none' || dataField == '') {
		flipper = true
		inputField.style.display = ''
		dataStored = []

		for (i = 0; i < document.querySelectorAll('.alphabet').length; i++) {
			document.querySelectorAll('.alphabet')[i].style.background = '#39ff14'
			document.querySelectorAll('.alphabet')[i].style.color = 'black'	
		}
		while (remove.hasChildNodes()) {  
    		remove.removeChild(remove.firstChild)
		}
	}

	document.querySelectorAll('.answers').forEach(function (el) {
			el.parentNode.removeChild(el)
	})

	document.querySelector('.zero').style.display = 'flex'
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


// Letter buttons

const letterButton = document.querySelector('.letters')

letterButton.addEventListener('click', function(e) {
	e.preventDefault()

	// Stops letters from being clicked if game has not begun
	if (flipper == true) {
		return
	} 
	// Stops already clicked letters from being clicked again
	if (e.target.style.color == 'rgb(57, 255, 20)' || e.target.style.background.color == 'black') {	 
		return
	}

	// Styles letters after being clicked
	e.target.style.background = 'black'
	e.target.style.color = '#39ff14'
	//e.target.style.border = 'solid 1px #39ff14' (this needs work maybe)


	if (dataStored.indexOf(e.target.textContent) >= 0) {

		for (i = 0; i < dataStored.length; i++) {
			if (dataStored[i] == e.target.textContent) {
				document.querySelectorAll('.answers')[i].value = e.target.textContent
				console.log('SUCCESS')
					} 
				} 
			} else {
				counter ++
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
		document.querySelector('.seven').style.display = 'none'
		document.querySelector('.eight').style.display = 'flex'
		document.querySelector('.loser').style.display = 'flex'

		document.querySelectorAll('.answers').forEach(function (el) {
			el.parentNode.removeChild(el)
		})
		
		// Black out all letters
		for (i = 0; i < document.querySelectorAll('.alphabet').length; i ++) {
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
