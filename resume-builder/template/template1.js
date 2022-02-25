// edit values below
function TemplateDefaults(){
	return [{
		type: "information_header",
		name: "John Smith",
		city: "City",
		state: "State",
		code: "Postal Code",
		phone: "8001234567",
		email: "email@contact.us",
		link: "linkedin.com/in/name"},
			{
		type: "skill_tree",
		0: ["Key Skill", "Example skills to include like Office 365 and more!"],
		1: ["Key Skill", "Brief description of a skill like how you use it."],
		2: ["Key Skill", "Include hard skills that show off domain knowledge and expertise."]
		},
			{
		type: "employment",
		0: {name:"Company 3", location:"Location", title:"Job Title", start:["MM", "YYYY"], end:["PRESENT", "PRESENT"], description:"Description Multiple Description Description Multiple Description Description Multiple Description Description Multiple Description Description Multiple Description Description Multiple Description3"},
		1: {name:"Company 2", location:"Location", title:"Job Title", start:["MM", "YYYY"], end:["MM", "YYYY"], description:"Description Multiple Description Description Multiple Description Description Multiple Description Description Multiple Description Description Multiple Description Description Multiple Description2"},
		2: {name:"Company 1", location:"Location", title:"Job Title", start:["MM", "YYYY"], end:["MM", "YYYY"], description:"Description Multiple Description Description Multiple Description Description Multiple Description Description Multiple Description Description Multiple Description Description Multiple Description1"},
		},
			{
		type: "education",
		0: ["Degree, Graduation Year (YYYY)", "College Name, Location"],
		1: ["Name of Certificate", "Extra Information"]
		},
			{
		type: "volunteer",
		0: {name:"Company 3", location:"Location", title:"Position", start:["MM", "YYYY"], end:["PRESENT", "PRESENT"], description:"Description Multiple Description Description Multiple Description"},
		1: {name:"Company 2", location:"Location", title:"Position", start:["MM", "YYYY"], end:["MM", "YYYY"], description:"Description Multiple Description Description Multiple Description"},
		2: {name:"Company 1", location:"Location", title:"Position", start:["MM", "YYYY"], end:["MM", "YYYY"], description:"Description Multiple Description Description Multiple Description"},
		},
	]
}

// under this line is template instructions
// if not yoinked from a source, its probably stolen from W3Schools or StackOverflow
function JSbuildResume(container, setDefaults){
	console.log(setDefaults)
	if (setDefaults) {var autofill = TemplateDefaults()} 
	else {var autofill = setTemplate()}

	for (mainLoop = 0; mainLoop < autofill.length; mainLoop++) {
		switch(autofill[mainLoop].type) {
			case "information_header":
				BuildHeader(container, autofill[mainLoop])
				break;
			case "skill_tree":
				BuildSkills(container, autofill[mainLoop])
				break;
			case "employment":
				BuildEmployment(container, autofill[mainLoop])
				break;
			case "education":
				BuildEducation(container, autofill[mainLoop])
				break;
			case "volunteer":
				BuildVolunteer(container, autofill[mainLoop])
				console.log(autofill[mainLoop])
				break;
			default:
				console.log(autofill[mainLoop])
				console.log("is not implemented!")
				break;
		}
	}
}

function BuildHeader(container, autofill_info){
	console.log("Attempting Header Build")
	let section = document.createElement("SECTION")
	let header = document.createElement("H1")
	let innerInformation = document.createElement("SPAN")

	UpdateHeaderInfo(header, innerInformation, autofill_info)

	header.appendChild(innerInformation)
	section.appendChild(header)
	container.appendChild(section)
}


function UpdateHeaderInfo(header, innerInformation, autofill_info){
	header.innerHTML = autofill_info.name
	innerInformation.className = "information"
	innerInformation.innerHTML = `${autofill_info.city}, ${autofill_info.state} ${autofill_info.code} - \
	${autofill_info.phone.substring(0,3)} ${autofill_info.phone.substring(3,6)}-${autofill_info.phone.substring(6,10)}\
	<br />${autofill_info.email} - ${autofill_info.link}`
}

function BuildSkills(container, autofill_info){
	console.log("Attempting Skills Build")
	var section = document.createElement("SECTION")

	let skills = document.createElement("H3")
	skills.innerHTML = "Skills"
	section.appendChild(skills)

	// update function must use section and use similar loop
	// yoinked length from geeksforgeeks.org/find-the-length-of-a-javascript-object/
	let length = Object.keys(autofill_info).length - 1
	for (i = 0; i < length; i++) {
		let currentSkill = document.createElement("LI")
		currentSkill.innerHTML = `<b>${autofill_info[i][0]}</b> - ${autofill_info[i][1]}`
		section.appendChild(currentSkill)
	}

	container.appendChild(section)
}

function BuildEmployment(container, autofill_info){
	console.log("Attempting Employment Build")
	var section = document.createElement("SECTION")

	let employment = document.createElement("H3")
	employment.innerHTML = "Experience"
	section.appendChild(employment)

	// update function must use section and use similar loop
	// yoinked length from geeksforgeeks.org/find-the-length-of-a-javascript-object/
	let length = Object.keys(autofill_info).length - 1
	for (i = 0; i < length; i++) {
		let currentEmployer = document.createElement("P")
		currentEmployer.innerHTML = `<b>${autofill_info[i].name}</b>, ${autofill_info[i].location}<br>`

		let innerInformation = document.createElement("SPAN")
		innerInformation.style = "font-style: italic;"
		innerInformation.innerHTML = `${autofill_info[i].title}`
		currentEmployer.appendChild(innerInformation)

		let innerInnerInformation = document.createElement("SPAN")
		innerInnerInformation.className = "information"
		if (autofill_info[i].end[0] !== autofill_info[i].end[1]) {
			var end_date = `(${autofill_info[i].end[0]}/${autofill_info[i].end[1]})`
		} else {
			var end_date = "Present"
		}
		innerInnerInformation.innerHTML = `(${autofill_info[i].start[0]}/${autofill_info[i].start[1]})-${end_date}`
		currentEmployer.appendChild(innerInnerInformation)
		section.appendChild(currentEmployer)

		let description = document.createElement("P")
		description.className = "text_size"
		description.innerHTML = autofill_info[i].description
		section.appendChild(description)
	}
	container.appendChild(section)
}

function BuildEducation(container, autofill_info){
	console.log("Attempting Education Build")
	var section = document.createElement("SECTION")

	let education = document.createElement("H3")
	education.innerHTML = "Education and Certifications"
	section.appendChild(education)

	// update function must use section and use similar loop
	// yoinked length from geeksforgeeks.org/find-the-length-of-a-javascript-object/
	let length = Object.keys(autofill_info).length - 1
	for (i = 0; i < length; i++) {
		let currentEducation = document.createElement("LI")
		currentEducation.innerHTML = `${autofill_info[i][0]} <br> ${autofill_info[i][1]}`
		section.appendChild(currentEducation)
	}

	container.appendChild(section)
}

function BuildVolunteer(container, autofill_info){
	console.log("Attempting Volunteer Build")
	var section = document.createElement("SECTION")

	let volunteer = document.createElement("H3")
	volunteer.innerHTML = "Volunteer"
	section.appendChild(volunteer)

	// update function must use section and use similar loop
	// yoinked length from geeksforgeeks.org/find-the-length-of-a-javascript-object/
	let length = Object.keys(autofill_info).length - 1
	for (i = 0; i < length; i++) {
		let currentEmployer = document.createElement("P")
		currentEmployer.innerHTML = `<b>${autofill_info[i].title}, ${autofill_info[i].name}</b>, ${autofill_info[i].location}<br>`

		let innerInformation = document.createElement("SPAN")
		innerInformation.className = "information"
		if (autofill_info[i].end[0] !== autofill_info[i].end[1]) {
			var end_date = `(${autofill_info[i].end[0]}/${autofill_info[i].end[1]})`
		} else {
			var end_date = "Present"
		}
		innerInformation.innerHTML = `(${autofill_info[i].start[0]}/${autofill_info[i].start[1]})-${end_date}`
		currentEmployer.appendChild(innerInformation)
		section.appendChild(currentEmployer)

		let description = document.createElement("P")
		description.className = "text_size"
		description.innerHTML = autofill_info[i].description
		section.appendChild(description)
	}
	container.appendChild(section)
}