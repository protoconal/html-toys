// edit values below
function setTemplate(){
	return [{
		type: "information_header",
		name: "John Reease",
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