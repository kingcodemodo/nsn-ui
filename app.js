
checkSaved()

function checkSaved(){
	document.getElementById("saved").innerHTML = "";
	let savedUniversity = localStorage.getItem("university");
	if(savedUniversity){
		document.getElementById("saved").innerHTML = "<div>Saved: " + savedUniversity + `<button class="button" onclick="deleteUniversity('${savedUniversity}')">Delete</button></div>`
	}
}

async function search(event){
	const searchTerm = event.target.value;

	const universities = "http://universities.hipolabs.com/search?country=United+kingdom";

	const results = await (await fetch(universities)).json()
	const uniqueResults = results.filter(removeDuplicateUniversities)

	const foundUniversities = uniqueResults.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
	displayUniversities(foundUniversities)
}

function removeDuplicateUniversities(value, index, self) {
	return index === self.findIndex(item => item.name === value.name);
  }
  
function displayUniversities(foundUniversities){
	document.getElementById("results").innerHTML = foundUniversities.map(formatUniversity).join("");
}

function formatUniversity(university){
	return `
	<div class="column is-one-quarter-desktop is-full-mobile" key=${university.name}>
		<div class="card px-5 mx-5 my-2 is-vcentered" style="background-color:#FFFAAA">
			<div class="container p-2 my-2">
				<div><p class= "is-size-4 has-text-centered">${university.name}</p></div>
				<div><p class= "is-size-6 has-text-centered">${university.country}</div>
				<div><p class= "is-size-6 has-text-centered">${university.web_pages}</div>
				<div class="is-flex-grow"><button class="button is-centered" onclick="saveUniversity('${university.name}')">Save</button></div>
				<div class="is-flex-grow"><button class="button is-centered" onclick="deleteUniversity('${university.name}')">Delete</button></div>
			</div>
		</div>
	</div>
	`
}

function saveUniversity(university){
	localStorage.setItem("university", university);
}

function deleteUniversity(university){
	localStorage.removeItem("university");
	checkSaved();
}

document.getElementById("header").innerHTML = `
<div class='container p-4 is-full'>
	<span class='has-text-weight-bold is-justify-content-center'>
		<p class = "is-size-1"><b> NSN <b></p>
	</span>
</div>
`

document.getElementById("footer").innerHTML = `
<div class='container p-4 has-background-grey-dark has-text-white-ter is-full'>
<b> NSN <b>
	<div class='is-pulled-right'>
		<a style="color:#FFFFFF;" href=/> <i class="fa-solid fa-house"> </i> <b> Home <b> </a>
		<a style="color:#FFFFFF;" href=/> <i class="fa-solid fa-eye"> </i> <b> Privacy <b> </a>
		<a style="color:#FFFFFF;" href=/> <i class="fa-solid fa-book"> </i> <b> Terms <b> </a>
		<a style="color:#FFFFFF;" href=/> <i class="fa-solid fa-message"></i> <b> Contact <b> </a>
	<div>
</div>`