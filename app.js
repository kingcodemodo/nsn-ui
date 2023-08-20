// To Update
// Syntax and check spacing and typing
// Avoid using style tag at all costs - Violates the rules of CSS - Style overwrites CSS - Choose One And Commit
// Add EOF and Space to Line to Avoid EOF Error

// Good Feedback
// Making everything function based and this is extensible to adding test cases
//

// Review
// https://github.com/Hipo/university-domains-list


// Pre Render 
initialiseLocalStorage()

checkSaved()

// Initialise, Render & Refresh The Saved Results Component & It's Data Sources
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

// Initialise Local Storage of Favourites As An Array When First Accessed
function initialiseLocalStorage(){

	if (localStorage.getItem("Favourites") == null){
		localStorage.setItem("Favourites","[]")
	}
}

// Format / Display Method For Individual Saved Records in Favourites (Local Storage)
function formatSavedUniversity(savedUniversity){
	return`
		<div class="columns is-multiline is-centered is-justify-content-space-evenly">
			<button class="button is-centered is-warning is-medium is-rounded py-4 my-1" onclick="deleteUniversity('${savedUniversity}')">${savedUniversity}</button>
		</div>
		
	`
}

{/* <div class="columns is-centered is-one-third is-justify-content-space-evenly">
<p class= "has-text-centered"> Saved: ${savedUniversity} 
	<button class="button is-centered is-warning is-small is-rounded" onclick="deleteUniversity('${savedUniversity}')">Delete</button>
</p>
</div> */}

// Query API - Clean Duplicates, Limits Results to 20 & Calls Relevant Render / Display Methods
async function search(event){

	const searchTerm = event.target.value;
	const formattedSearchTerm = searchTerm.toLowerCase()
	const resultsOnGrid = 20
	const rateLimit = 20


	// Faster Search With API Fields
	const universitiesAPI = `http://universities.hipolabs.com/search?country=United+kingdom&limit=${rateLimit}&name=${searchTerm}`;
	// const universitiesAPI = 'http://universities.hipolabs.com/search?country=United+kingdom&limit=20&name=";

	// Process JSON Data & Filter Duplicates
	const results = await (await fetch(universitiesAPI)).json()
	const uniqueResults = results.filter(removeDuplicateUniversities)

	// Search & Display In Table - 20 Results By Default
	const foundUniversities = uniqueResults.filter(item => item.name.toLowerCase().includes(formattedSearchTerm))
	displayUniversities(foundUniversities.slice(0,resultsOnGrid))
}

// Clean API Results Object of Duplicates
function removeDuplicateUniversities(value, index, self) {
	return index === self.findIndex(item => item.name === value.name)
}

// Render / Display Method For University Grid
function displayUniversities(foundUniversities){
	document.getElementById("results").innerHTML = foundUniversities.map(formatUniversity).join("")
}

// Save / Update Method To Send A University To "Favourites" Local Storage w/ Multisave
function saveUniversity(university){
	
	initialiseLocalStorage()
	const stringArray = localStorage.getItem("Favourites")

	if (JSON.parse(stringArray) == ""){ 
		// console.log(`[DEBUG-INIT] - "${university}"] - TO BE PUSHED TO LOCAL STORAGE`)
		localStorage.setItem("Favourites", `"${university}"`)
		// console.log("[DEBUG-INIT] - Local Storage Is Now " + localStorage.getItem("Favourites"))
	}
	else if (typeof JSON.parse(stringArray) === 'string' && university !== JSON.parse(stringArray)){
		// console.log(`[DEBUG-STRING-SAVE] - "[String Array on Type String - " + ${stringArray}`)
		// console.log(`[DEBUG-STRING-SAVE] - ["${university}" , ${stringArray}] - TO BE PUSHED TO LOCAL STORAGE`)
		// console.log("[DEBUG-STRING-SAVE] - JSON.parse(stringArray) - " + JSON.parse(stringArray))
		localStorage.setItem("Favourites", `["${university}" , ${stringArray}]`)
		// console.log("[DEBUG-STRING-SAVE] - Local Storage Is Now " + localStorage.getItem("Favourites"))
	}
	else if (typeof JSON.parse(stringArray) === 'object' && JSON.parse(stringArray).includes(university) == false){

		// console.log("==========================================")
		const listOfFavourites = JSON.parse(stringArray)
		// console.log(`[DEBUG-OBJECT-SAVE] - [listOfFavourites] - ${listOfFavourites}` )
		listOfFavourites.push(university)
		// console.log(`[DEBUG-OBJECT-SAVE] - [listOfFavourites] - ${listOfFavourites}` )
		const formattedListOfFavourites = listOfFavourites.map((item) => `"${item}"`)
		// console.log(`[DEBUG-OBJECT-SAVE] - [formattedListOfFavourites] - ${formattedListOfFavourites}` )
		const updateForLocalStorage = `[${formattedListOfFavourites }]`
		// console.log(`[DEBUG-OBJECT-SAVE] - [updateForLocalStorage] - ${updateForLocalStorage}` )
		// console.log(`[DEBUG-OBJECT-SAVE] - [Local Storage Is Now ]" - ${localStorage.getItem("Favourites")}` )
		localStorage.setItem("Favourites", updateForLocalStorage)
	}
	else{
		console.log("ERROR ON SAVE - UNRECOGNISED DATA TYPE")
	}

	checkSaved()
}

// Delete Method To Remove A  University To "Favourites" Local Storage w/ Individual Delete
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
	checkSaved();
}

// Format / Display Method For Individual University Cards / Records To Populate The Grid Table UI
function formatUniversity(university){
	return `
	<div class="column is-centered is-one-quarter-desktop is-full-mobile" key=${university.name}>
		<div class="card px-3 mx-3 my-3 is-centered" style="background-color:#FFFAAA">
			<div class="container is-centered p-2 my-2">
				<div><p class= "is-size-4 has-text-centered">${university.name}</p></div>
				<div><p class= "is-size-6 has-text-centered">${university.country}</div>
				<div><p class= "is-size-6 has-text-centered">${university.web_pages}</div>
				<div class="columns py-3 is-centered" style="background-color:#FFFAAA">
				<button class="button has-text-centered px-3 mx-3 mt-4 is-half is-centered" onclick="saveUniversity('${university.name}')">Save</button>
				<button class="button has-text-centered px-3 mx-3 mt-4 is-half is-centered" onclick="deleteUniversity('${university.name}')">Delete</button>
				</div>
			</div>
		</div>
	</div>
	`
}

// Initialise / Render Method For Header Component
document.getElementById("header").innerHTML = `
<div class='container p-4 is-full'>
	<span class='has-text-weight-bold is-justify-content-center'>
		<p class = "is-size-1"><b> NSN <b></p>
	</span>
</div>
`
// Initialise / Render Method For Footer Component
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
