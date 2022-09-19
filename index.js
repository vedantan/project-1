const taskContainer = document.querySelector(".task__container");
let globalStore = [];

const generateNewCard = (taskData) => `
	<div class="col-sm-12 col-md-6 col-lg-3 mb-4">
		<div class="card border-secondary">
			<div class="card-header d-flex justify-content-end gap-2">
		    <button class="btn btn-outline-info" type="button"><i class="fas fa-pencil-alt"></i></button>
		    <button class="btn btn-outline-danger" type="button" id="${taskData.taskid}" onclick="deleteCard.apply(this, arguments)">
		    <i class="fas fa-trash" id="${taskData.taskid}" onclick="deleteCard.apply(this, arguments)"></i></button>
		  </div>
			<div class="card-body">
				<img src="${taskData.imageUrl}" class="card-img-top" alt="burger">
			    <h5 class="card-title mt-2">${taskData.taskName}</h5>
			    <h6 class="card-title">${taskData.taskType}</h6>
					<p class="card-text">${taskData.taskDesc}</p>  
			    <a href="#" class="btn btn-primary">Task Complete</a>
			</div>
		</div>  				
	</div>
	`;																

// You forgot this semicolon, such silly mistake. FOCUS!!!

// Function for loading the data
const loadInitialCardData = () => {

	// Getting the data from local storage
	const getCardData = localStorage.getItem("id_tasky");

	// Converting the data from 'arr of obj' to 'obj of obj' format
	const {cards} = JSON.parse(getCardData);

	// Looping the data
	cards.map((cardObject) => {								// Adding the cards to DOM
		taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));					

		// Updating the data in array
		globalStore.push(cardObject);
	}
	)
};

// Function for saving the task data on clicking 'save changes' button
const saveTask = () => {
	const taskData = {
		taskid: `${Date.now()}`,							// We are using id just for future purposes.
		imageUrl: document.getElementById("taskimage").value,
		taskName: document.getElementById("tasktitle").value,
		taskType: document.getElementById("tasktype").value,
		taskDesc: document.getElementById("taskdesc").value
	};

	taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

	// Pushing the data to array
	globalStore.push(taskData);

	// localStorage.setItem("tasky", dataStorage);
	// We need to store in 'array of objects' format, so we use the method below
	localStorage.setItem("id_tasky", JSON.stringify({cards:globalStore}));
};

const deleteCard = (event) => {
	event = window.event;
	const targetID = event.target.id;
	const tagname = event.target.tagName;

	globalStore = globalStore.filter((cardObject) => cardObject.taskid !== targetID);
	localStorage.setItem("id_tasky", JSON.stringify({cards:globalStore}));
	
	if (tagname === "BUTTON") {				// tagName is in UPPERCASE
		return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
	} else {
		return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
	}
};
