
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

	const uniqueResults = (item, index, results) => results.indexOf(item) == index;
	
	const foundUniversities = results.filter(uniqueResults).filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
	displayUniversities(foundUniversities)
}

function displayUniversities(foundUniversities){
	document.getElementById("results").innerHTML = foundUniversities.map(formatUniversity).join("");
}

function formatUniversity(university){
	return `
	<div class="column is-one-quarter-desktop is-full-mobile" key=${university.name}>
		<div class="card px-5 mx-5 my-2 is-vcentered">
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

document.getElementById("header").innerHTML = "<div class='container p-4'><span class='has-text-weight-bold is-justify-content-center'>NSN</span></div>"

document.getElementById("footer").innerHTML = `
<div class='container p-4 has-background-grey-dark has-text-white-ter'>
NSN
	<div class='is-pulled-right'>
		<a style="color:#FFFFFF;" href=/> <i class="fa-solid fa-house"> </i> Home</a>
		<a style="color:#FFFFFF;" href=/> <i class="fa-solid fa-eye"> </i> Privacy</a>
		<a style="color:#FFFFFF;" href= /> <i class="fa-solid fa-book"> </i> Terms</a>
		<a style="color:#FFFFFF;" href= /> <i class="fa-solid fa-message"></i> Contact</a>
	<div>
</div>`