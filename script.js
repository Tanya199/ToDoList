(function () {

	var body = document.getElementsByTagName('body')[0];
	var input = document.getElementById('input');
	var buttonAdd = document.getElementById('btn_add');
	var containerResults = document.getElementById('cont_result');

	var tasks = JSON.parse(localStorage.getItem('tasks'));

	if (tasks && tasks.length > 0) {
		for (var i = 0; i < tasks.length; i++) {
			var containerInfo = document.createElement('div');
			containerInfo.className = 'container_info';
			containerResults.appendChild(containerInfo);

			createCheckBox(tasks[i], containerInfo);
			createToDo(tasks[i], containerInfo);
			createRemoveButton(containerInfo);

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
			'creationDate': moment(),
			'done': false
		};
		saveToDoItem(task);
		clearInput();

		var containerInfo = document.createElement('div');
		containerInfo.className = 'container_info';
		containerResults.appendChild(containerInfo);

		createCheckBox(task, containerInfo);
		createToDo(task, containerInfo);
		createRemoveButton(containerInfo);
	}

	function clearInput() {
		input.value = '';
	}

	function createCheckBox(task, origin) {
		var checkBox = document.createElement('input');
		checkBox.type = 'checkbox';
		checkBox.className = 'check_box';
		checkBox.checked = task.done;
		checkBox.addEventListener('click', addLineThrough);
		origin.appendChild(checkBox);
	}

	function createRemoveButton(origin) {
		var buttonRemove = document.createElement('button');
		buttonRemove.innerHTML = 'Remove';
		buttonRemove.className = 'btn_remove';
		buttonRemove.addEventListener('click', removeTask);
		origin.appendChild(buttonRemove);
	}

	function createToDo(task, origin) {
		var toDoElement = document.createElement('div');
		var creationDateOfTask = moment(task.creationDate).format("MM-DD-YYYY HH:mm");
		toDoElement.className = 'wrapper_task';

		var taskName = task.name;
		if (taskName.length > 30) {
			taskName = taskName.split('').splice(0, 30);
			taskName = taskName.join('');
		}

		toDoElement.innerHTML = taskName + ' ' + creationDateOfTask;

		if (task.done) {
			toDoElement.style.textDecoration = 'line-through';
		}

		origin.appendChild(toDoElement);
	}

	function addLineThrough() {
		var toDoDiv = this.parentElement;
		var filter = [].filter;
		var toDoDescriptionElement = filter.call(toDoDiv.children, function (i) {
			return i.nodeName === 'DIV';
		})[0];
		var description = toDoDescriptionElement.innerHTML;

		var tasks = JSON.parse(localStorage.getItem('tasks'));

		var newTasks = [];
		for (var i = 0; i < tasks.length; i++) {
			if ((tasks[i].name + ' ' + moment(tasks[i].creationDate).format("MM-DD-YYYY HH:mm")) == description) {
				tasks[i].done = true;
			}
			newTasks.push(tasks[i]);
		}
		localStorage.setItem('tasks', JSON.stringify(newTasks));

		toDoDescriptionElement.style.textDecoration = 'line-through';
	}

	function removeTask() {
		var toDoDiv = this.parentElement;
		var filter = [].filter;
		var toDoDescriptionElement = filter.call(toDoDiv.children, function (i) {
			return i.nodeName === 'DIV';
		})[0];

		var description = toDoDescriptionElement.innerHTML;
		var tasks = JSON.parse(localStorage.getItem('tasks'));
		var newTasks = tasks.filter(function (i) {
			return ((i.name + ' ' + (moment(i.creationDate).format("MM-DD-YYYY HH:mm"))) != description)
		});
		console.log(description, i.name + ' ' + i.creationDate, newTasks);
		localStorage.setItem('tasks', JSON.stringify(newTasks));

		toDoDiv.parentElement.removeChild(toDoDiv);
	}

}());