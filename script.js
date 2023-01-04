// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);

// Functions 
function addTodo(event){

	// prevent form from submitting
	event.preventDefault();

	// Create new element - div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');

	// Create new element - list
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');

	// Add to local
	saveToLocal(todoInput.value);
	
	// Make newTodo child of todoDiv
	todoDiv.appendChild(newTodo);

	// Creaete complete button
	const compleatedButton = document.createElement('button');
	compleatedButton.innerHTML = '<i class="fas fa-check"></i>';
	compleatedButton.classList.add('complete-btn');
	todoDiv.appendChild(compleatedButton);

	// Creaete trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);

	// Append created div to existing list
	todoList.appendChild(todoDiv);
	
	// Clear input value
	todoInput.value = '';

}

function deleteTodo(event){
	const item = event.target;
	// DELETE TODO
	if(item.classList[0] === 'trash-btn'){
		const todo = item.parentElement;
		todo.classList.add('fall');
		removeFromLocal(todo);
		
		todo.addEventListener('transitionend', () => {
			todo.remove();
		});		
	}

	if(item.classList[0] === 'complete-btn'){
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}

}

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach((todo)=>{
		switch (e.target.value) {
			case "all" : 
				todo.style.display = "flex";
				break;
			case "completed" :
				if(todo.classList.contains('completed')){
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "incomplete" :
				if(!todo.classList.contains("completed")){
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}	
				break;	
			}
	});
}



function getTodos(){
	console.log("Get Todos triggered.");
	// Check for previously saved
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach((todo) =>{

		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');

		// Create new element - list
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		
		// Make newTodo child of todoDiv
		todoDiv.appendChild(newTodo);

		// Creaete complete button
		const compleatedButton = document.createElement('button');
		compleatedButton.innerHTML = '<i class="fas fa-check"></i>';
		compleatedButton.classList.add('complete-btn');
		todoDiv.appendChild(compleatedButton);

		// Creaete trash button
		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add('trash-btn');
		todoDiv.appendChild(trashButton);

		// Append created div to existing list
		todoList.appendChild(todoDiv);

	});
}

function saveToLocal(todo){
	// Check for previously saved
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function removeFromLocal(todo){
	console.log('removeFromLocal', todo);
	// Check for previously saved
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
} 