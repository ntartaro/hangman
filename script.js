var dataField = document.querySelector('.data').value



function saveData() {
	var dataField = document.querySelector('.data').value
	localStorage.setItem('text', dataField)
}

function retrieveData() {

}