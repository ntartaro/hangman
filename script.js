// Data storage and input
var dataStored = []
const inputField = document.querySelector('.inputField')
const inputButton = document.querySelector('.inputButton')
var dataField = document.querySelector('.data').value

inputButton.addEventListener('click', function(e) {
	e.preventDefault()
	
	var dataField = document.querySelector('.data').value
	if (dataField == '') {
		return
	} else { 
		inputField.style.display = 'none'
		dataStored.push(dataField)
		document.querySelector('.data').value = ''
	}

	for (i =0; i < dataStored[0].length; i++) {
		var div = document.createElement('input')
		div.classList.add('answers')
		document.querySelector('.goesHere').appendChild(div)
	}
})

// Reset button
const resetButton = document.querySelector('.rest')
const remove = document.querySelector('.goesHere')

resetButton.addEventListener('click', function(e) {
	if (inputField.style.display == 'none' || dataField == '') {

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
	e.target.style.background = 'black'
	e.target.style.color = '#39ff14'

	for (i = 0; i < dataStored.length; i++) {
		if (dataStored[0][i] == e.target.textContent) {
			document.querySelectorAll('.answers')[i].value = e.target.textContent
			console.log('HEY')
		} else if (dataStored[0][i + 1] == e.target.textContent) {
			document.querySelectorAll('.answers')[i + 1].value = e.target.textContent
			console.log('HEY')
		}
	}
})


// Hangman builder
//     __________
//     |20| //     |
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

