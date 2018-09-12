var dataStored = []
const inputButton = document.querySelector('.inputButton')

inputButton.addEventListener('click', function(e) {
	e.preventDefault()
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

const letterButton = document.querySelector('.letters')

letterButton.addEventListener('click', function(e) {
	e.preventDefault()
	e.target.style.background = 'black'
	e.target.style.color = '#39ff14'
})