
// Data storage and input
var dataStored = []
const input1 = document.querySelector('.input1')
const inputButton = document.querySelector('.inputButton')

inputButton.addEventListener('click', function(e) {
	e.preventDefault()
	input1.style.display = 'none'
	var dataField = document.querySelector('.data').value
	if (dataField == '') {
		return
	} else { 
		dataStored.push(dataField)
		document.querySelector('.data').value = ''
	}
	for (i =0; i < dataStored[0].length; i++) {
		var div = document.createElement('input')
		div.classList.add('answers')
		document.querySelector('.goesHere').appendChild(div)
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


//document.querySelectorAll('.answers')

//Hangman builder
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

var counter = 0
if (counter == 1) {
	document.querySelector('.gallows').textContent[28] = "|"
}

