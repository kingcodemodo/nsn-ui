
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

	const foundUniversities = results.filter(item => item.name.includes(searchTerm))
	displayUniversities(foundUniversities)
}

function displayUniversities(foundUniversities){
	document.getElementById("results").innerHTML = foundUniversities.map(formatUniversity).join("");
}

function formatUniversity(university){
	return `
		<div class="card p-2 my-2">
			<div>${university.country}</div>
			<div>${university.name}</div>
			<div><button class="button" onclick="saveUniversity('${university.name}')">Save</button></div>
			<div><button class="button" onclick="deleteUniversity('${university.name}')">Delete</button></div>
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

document.getElementById("header").innerHTML = "<div class='container p-4'><span class='has-text-weight-bold'>NSN</span></div>"

document.getElementById("footer").innerHTML = `
<div class='container p-4 has-background-grey-dark has-text-white-ter'>
NSN
<a href=/><i class="fa-solid fa-house"></i> Home</a>
<a href=/>Privacy</a>
<a href=/>Terms</a>
<a href=/>Contact</a>

</div>`