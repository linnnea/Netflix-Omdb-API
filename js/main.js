/**
 *  OMDb template
 *	Documentation: http://www.omdbapi.com/
 *  Generate an API key here: http://www.omdbapi.com/apikey.aspx
 */

/**
* According to documentation, you need at least 2 parameters when calling the API http://www.omdbapi.com/
* 1 Required parameter: apikey
* 2 Required parameter: One of the following i=, t= or s=
*
* 
* Example with parameter s=star trek
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek
*
* Example with parameter s=star trek AND y=2020
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&y=2020
*
* Example with parameter s=star trek AND type=series
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&type=2020
* 
*/

let searchURL		= 'http://www.omdbapi.com/?apikey=31eba36c&s=';
let defaultURL		= 'https://lh4.googleusercontent.com/proxy/k_7MO3R4aifOSFLr8M2PWNJ_KbQVmVnA-FOZP9tF6aTRNURVBUcRH5TfGfQNCavwXH3rQBLdDU0losHnHVA4zbUc';

let request 		= new XMLHttpRequest();
let inputTitle 		= document.getElementById('search-input');
let input 			= document.getElementById('search-input');
let btnSearch 		= document.getElementById('search-btn');
let container 		= document.getElementById('movie-list');

//-------------------------------------------------//
request.onreadystatechange = function() {

	if (this.readyState === 4 && this.status === 200) {
		let data = JSON.parse(this.responseText);
		console.log(data);

		inputTitle.value = "";
		container.innerHTML = "";

		let titles = Object.keys(data.Search).length;

		for (let i = 0; i < titles; i++) {
			let listItem = document.createElement('li');
			listItem.innerHTML += data.Search[i].Title;
			container.appendChild(listItem);

			let moviePoster = data.Search[0].Poster;
			document.getElementById('random-movie').innerHTML = '<img src=' + moviePoster + '>';

			if(moviePoster === 'N/A') {
				document.getElementById('insert-image').src = defaultURL;
			}
		}
	}
}

btnSearch.addEventListener('click', function() {

	if (inputTitle.value === '') {
		alert('This input cant be empty!');

	} else {
		request.open('GET', searchURL + inputTitle.value);
		request.send();
	}

})

input.addEventListener("keyup", function(event) {

  	if (inputTitle.value === '') {
  		alert('This input cant be empty!');

  	} else if (event.keyCode === 13) {
    	event.preventDefault();
    	request.open('GET', searchURL + inputTitle.value);
		request.send();
  	}

});





