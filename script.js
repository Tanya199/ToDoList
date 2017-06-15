(function () {

	var body = document.getElementsByTagName('body')[0];
	var input = document.getElementById('input');
	var buttonAdd = document.getElementById('btn_add');
	var containerResults = document.getElementById('cont_result');

	var tasks = JSON.parse(localStorage.getItem('tasks'));

	if (tasks && tasks.length > 0) {
		for (var i = 0; i < tasks.length; i++) {
			createToDo(tasks[i]);
			createCheckBox(tasks[i]);
			createRemoveButton();
		}
	}

	buttonAdd.addEventListener('click', addNewTask);

	function saveToDoItem(newTask) {
		var tasks = [];
		var oldTasks = JSON.parse(localStorage.getItem('tasks'));
		if (oldTasks && oldTasks.length > 0) {
			tasks = oldTasks;
		}
		tasks.push(newTask);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function addNewTask() {
		if (!input.value) {
			return;
		}
		var task = {
			'name': input.value,
			'creationDate': new Date(),
			'done': false
		};

		saveToDoItem(task);

		createCheckBox(task);
		createToDo(task);
		createRemoveButton();
	}

	function createCheckBox(task){
		var checkBox = document.createElement('input');
		checkBox.type = 'checkbox';
		checkBox.checked = task.done;
		containerResults.appendChild(checkBox);
	}

	function createRemoveButton() {
		var buttonRemove = document.createElement('button');
		buttonRemove.innerHTML = 'Remove';
		containerResults.appendChild(buttonRemove);
	}

	function createToDo(task) {
		var toDoElement = document.createElement('div');
		var creationDateOfTask = task.creationDate.toLocaleString();
		toDoElement.innerHTML = task.name + ' ' + creationDateOfTask ;
		containerResults.appendChild(toDoElement);
	}

}());