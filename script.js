//
// Data storage and input
//
var flipper = true
var dataStored = []
var dataSplit = []
const inputField = document.querySelector('.inputField')
const inputButton = document.querySelector('.inputButton')
var dataField = document.querySelector('.data').value


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
		// dataStored.push(dataField)
		// dataSplit.push(dataStored[0].split(''))
		document.querySelector('.data').value = ''
	}

	for (i =0; i < dataStored.length; i++) {
		var div = document.createElement('input')
		div.classList.add('answers')
		document.querySelector('.answersGoHere').appendChild(div)
	}
})

// Reset button
const resetButton = document.querySelector('.rest')
const remove = document.querySelector('.answersGoHere')

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
})

// Letter buttons
const letterButton = document.querySelector('.letters')

letterButton.addEventListener('click', function(e) {
	e.preventDefault()
	if (flipper == true) {
		return
	} 
	e.target.style.background = 'black'
	e.target.style.color = '#39ff14'
	//e.target.style.border = 'solid 1px #39ff14' (this needs work maybe)

	for (i = 0; i < dataStored.length; i++) {
		if (dataStored[i] == e.target.textContent) {
			document.querySelectorAll('.answers')[i].value = e.target.textContent
			console.log('HEY')
		}
	}
})


// Hangman builder
//     __________
//     || //     |
//     ||//      |
//     ||/       |
//     ||        0
//     ||       /|\
//     ||        |
//     ||       / \
//     ||       
// .___||_____     ___.
// ||        \\      ||
// ||         \\     ||
// var counter = 0
// if (counter == 1) {
// 	document.querySelector('.gallows').textContent[28] = "|"
// }

