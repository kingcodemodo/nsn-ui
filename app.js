// To Update
// Syntax and check spacing and typing
// Avoid using style tag at all costs - Violates the rules of CSS - Style overwrites CSS - Choose One And Commit
// Add EOF and Space to Line to Avoid EOF Error

// Good Feedback
// Making everything function based and this is extensible to adding test cases
//

// Review
// https://github.com/Hipo/university-domains-list



initialiseLocalStorage()

checkSaved()

function checkSaved(){

	document.getElementById("saved").innerHTML = "";
	const savedFavourites = localStorage.getItem("Favourites");

	if(savedFavourites){
		const listOfFavourites = JSON.parse(savedFavourites)
		if (typeof listOfFavourites === "string"){
			document.getElementById("saved").innerHTML = formatSavedUniversity(listOfFavourites)
		}
		else if(typeof listOfFavourites === "object"){
			document.getElementById("saved").innerHTML = listOfFavourites.map(formatSavedUniversity).join("")
		}
	}
}

function formatSavedUniversity(savedUniversity){
	return`
		<div>Saved: ${savedUniversity} <button class="button" onclick="deleteUniversity('${savedUniversity}')">Delete</button></div>
	`
}

function isUniversityInSerialArray (jsonArray, jsonObject) {
    const objectName = jsonObject.name;
    if (!objectName) {
        return false;
    }

    for (const item of JSON.parse(jsonArray)) {
        if (item.name === objectName) {
            return true;
        }
    }

    return false;
}

// Read The Stringified Array Out of JSON Local Storage from "localStorage.getFavourites"
// Parse it To JSON for Data Mutability
// Check if the proposed university is already in the array
// If the favourite is new then "addToFavourites" e.g append the json object to array, re-serialise the updated array and set back to Local Storage
// If the favourite is already contained then drop a console message

function multiDeleteUniversity(university){
	const parsedLocalStorageArray = JSON.parse(localStorage.getItem("Favourites"))
	if (isUniversityInSerialArray(university)){
		console.log("[CANNOT DELETE] - [ "+ university.name + " ] IS NOT STORED IN FAVOURITES")
	}
	else{
		deleteFromFavourites(university,parsedLocalStorageArray)
		console.log("[DELETED] - [ " + university.name + " ] FROM FAVOURITES")
		console.log("[SHORTLIST] \n [ " + JSON.stringify(parsedLocalStorageArray) + " ]")
	}
}

function addToFavourites(university, JSONArray){
	localStorage.setItem("Favourites", JSON.stringify(parsedLocalStorageArray.push(JSON.parse(university))))
}

function deleteFromFavourites(university, JSONArray){
	localStorage.setItem("Favourites", JSON.stringify(JSONArray.filter(item => !isEqual(item, JSON.stringify(university)))))
}
async function search(event){
	const searchTerm = event.target.value;
	const formattedSearchTerm = searchTerm.toLowerCase()
	// API_PREFIX is a way of conveying fixed constants
	// Constants should be define outside of the functions / 
	// const API_PREFIX = 
	// const apiEndpoint = 
	// const rateLimit = 20

	const universities = "http://universities.hipolabs.com/search?country=United+kingdom";
	// const universities = "http://universities.hipolabs.com/search?country=United+kingdom&limit=20&name=";

	const results = await (await fetch(universities)).json()
	const uniqueResults = results.filter(removeDuplicateUniversities)

	// 5 Second rule of Understanding
	// Updated to simply e.g FormattedsearchTerm
	const foundUniversities = uniqueResults.filter(item => item.name.toLowerCase().includes(formattedSearchTerm))
	displayUniversities(foundUniversities.slice(0,20))
}

function removeDuplicateUniversities(value, index, self) {
	return index === self.findIndex(item => item.name === value.name)
}
  
function displayUniversities(foundUniversities){
	document.getElementById("results").innerHTML = foundUniversities.map(formatUniversity).join("")
}

function formatUniversity(university){
	return `
	<div class="column is-one-quarter-desktop is-full-mobile" key=${university.name}>
		<div class="card px-5 mx-5 my-3 is-vcentered" style="background-color:#FFFAAA">
			<div class="container p-2 my-2">
				<div><p class= "is-size-4 has-text-centered">${university.name}</p></div>
				<div><p class= "is-size-6 has-text-centered">${university.country}</div>
				<div><p class= "is-size-6 has-text-centered">${university.web_pages}</div>
				<div class="columns py-3" style="background-color:#FFFAAA">
					<div class="column is-half">
						<button class="button is-half is-flex-grow" onclick="saveUniversity('${university.name}')"> Save </button>
					</div>
					<div class="column is-half">
						<button class="button is-half is-flex-grow" onclick="deleteUniversity('${university.name}')">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	`
}

function saveUniversity(university){
	
	console.log("[To Be Added] - " + university)
	console.log("[1]")
	initialiseLocalStorage()
	
	console.log("[2]")
	const stringArray = localStorage.getItem("Favourites")

	if (JSON.parse(stringArray) == ""){ 
		console.log(`["${university}"] - TO BE PUSHED TO LOCAL STORAGE`)
		localStorage.setItem("Favourites", `"${university}"`)
		console.log("Local Storage Is Now " + localStorage.getItem("Favourites"))
	}
	else if (typeof JSON.parse(stringArray) === 'string'){
		console.log(`"[String Array on Type String - " + ${stringArray}`)
		console.log(`["${university}" , ${stringArray}] - TO BE PUSHED TO LOCAL STORAGE`)
		console.log("JSON.parse(stringArray) - " + JSON.parse(stringArray))
		localStorage.setItem("Favourites", `["${university}" , ${stringArray}]`)
		console.log("Local Storage Is Now " + localStorage.getItem("Favourites"))
	}
	else if (typeof JSON.parse(stringArray) === 'object'){

		console.log("==========================================")
		const listOfFavourites = JSON.parse(stringArray)
		console.log(`[1] - [listOfFavourites] - ${listOfFavourites}` )
		listOfFavourites.push(university)
		console.log(`[2] - [listOfFavourites] - ${listOfFavourites}` )
		const formattedListOfFavourites = listOfFavourites.map((item) => `"${item}"`)
		console.log(`[3] - [formattedListOfFavourites] - ${formattedListOfFavourites}` )
		const updateForLocalStorage = `[${formattedListOfFavourites }]`
		console.log(`[3] - [updateForLocalStorage] - ${updateForLocalStorage}` )
		console.log("Local Storage Is Now " + localStorage.getItem("Favourites"))
		localStorage.setItem("Favourites", updateForLocalStorage)
	}
	else{
		console.log("ERROR ON SAVE - UNCRECOGNISED DATA TYPE")
	}

	checkSaved()
}

// Initialise Local Storage of Favourites As An Array When First Accessed
function initialiseLocalStorage(){

	if (localStorage.getItem("Favourites") == null){
		localStorage.setItem("Favourites","[]")
	}
}

function multiSaveUniversity(university){

	document.getElementById("saved").innerHTML = "";
	const parsedLocalStorageArray = JSON.parse(localStorage.getItem("Favourites"))
	if (isUniversityInSerialArray(university)){
		console.log("[FAVOURITE] - [ " + university.name + " ] is already Favourited")
	}
	else{
		addToFavourites(university,parsedLocalStorageArray)
		console.log("[FAVOURITE] - [ " + university.name + " ] has been added")
		console.log("[SHORTLIST] \n [ " + JSON.stringify(parsedLocalStorageArray) + " ]")
	}
}

function deleteUniversity(university){
	document.getElementById("saved").innerHTML = "";
	const savedFavourites = localStorage.getItem("Favourites");

	if(savedFavourites){
		const listOfFavourites = JSON.parse(savedFavourites)
		console.log("[UNIVERSITY = SAVED FAVOURITE] - " + `[${university}] - [${savedFavourites}]`)
		if (typeof listOfFavourites === "string" && university == savedFavourites){
			console.log("DELETING ONLY ITEM - [" + university + "]")
			localStorage.setItem("Favourites", "[]")
		}
		else if(typeof listOfFavourites === "object" && savedFavourites.includes(university)){
			const updatedFavouritesList = listOfFavourites.filter(item => item !== university)
			const formattedNewList = updatedFavouritesList.map(item => `"${item}"`)
			const updateForLocalStorage = `[${formattedNewList}]`
			localStorage.setItem("Favourites",updateForLocalStorage)
		}
	}

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
	<div class='is-pulled-right is-centered-mobile'>
		<a style="color:#FFFFFF;" href=/> <i class="fa-solid fa-house"> </i> <b> Home <b> </a>
		<a style="color:#FFFFFF;" href=/> <i class="fa-solid fa-eye"> </i> <b> Privacy <b> </a>
		<a style="color:#FFFFFF;" href=/> <i class="fa-solid fa-book"> </i> <b> Terms <b> </a>
		<a style="color:#FFFFFF;" href=/> <i class="fa-solid fa-message"></i> <b> Contact <b> </a>
	<div>
</div>`

//<3 O.Kotur 2023