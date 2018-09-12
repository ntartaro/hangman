var dataStored = []
// var dataField = document.querySelector('.data').value

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
})
