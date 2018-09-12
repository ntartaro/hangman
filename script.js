var dataStored = []
const inputButton = document.querySelector('.inputButton')
const letterButton = document.querySelector('.letters')

inputButton.addEventListener('click', function(e) {
	e.preventDefault()
	var dataField = document.querySelector('.data').value
	if (dataField == '') {
		return
	} else { 
		dataStored.push(dataField)
		document.querySelector('.data').value = ''
	}
})


letterButton.addEventListener('click', function(e) {
	e.preventDefault()
	e.target.style.background = 'black'
	e.target.style.color = '#39ff14'
})