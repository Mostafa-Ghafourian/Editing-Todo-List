const addelem = document.getElementById('add');
const removeelem = document.getElementById('remove');
const editelem = document.getElementById('edit');
const selectelem = document.getElementById('select');
const importantelem = document.getElementById('important');
const Very_importantelem = document.getElementById('Very_important');
const Ordinaryelem = document.getElementById('Ordinary');
const TickTodolem = document.getElementById('TickTodo');
const removeTickElem = document.getElementById('remove-tick');

let todos = [];

function loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.forEach(todoData => {
        let newdiv = createTodoElement(todoData.text);
        if (todoData.selected) {
            newdiv.classList.add('selected');
            newdiv.querySelector('span').style.display = 'inline';
        }
        if (todoData.color) {
            newdiv.style.color = todoData.color;
        }
        if (todoData.anjamShodeh) {
            let tick = document.createElement('span');
            tick.textContent = ' Anjam Shodeh'; 
            tick.classList.add('tick');
            newdiv.appendChild(tick);
        }
        document.body.append(newdiv);
        todos.push(newdiv);
    });
}

function createTodoElement(todoText) {
    let newdiv = document.createElement('div');
    newdiv.textContent = todoText;
    newdiv.classList.add('todo-item');

    let selectedLabel = document.createElement('span');
    selectedLabel.textContent = ' selected';
    selectedLabel.style.display = 'none';
    selectedLabel.style.fontSize = 'small';
    newdiv.appendChild(selectedLabel);

    newdiv.addEventListener('click', function() {
        newdiv.classList.toggle('selected');
        if (newdiv.classList.contains('selected')) {
            selectedLabel.style.display = 'inline';
        } else {
            selectedLabel.style.display = 'none';
        }
    });

    newdiv.style.marginLeft = '500px';

    return newdiv;
}

function saveTodos() {
    const todosData = todos.map(todo => {
        return {
            text: todo.textContent.replace(' selected', ''),
            selected: todo.classList.contains('selected'),
            color: todo.style.color,
            anjamShodeh: !!todo.querySelector('.tick')
        };
    });
    localStorage.setItem('todos', JSON.stringify(todosData));
}

addelem.addEventListener('click', AddTodo);
removeelem.addEventListener('click', RemoveTodo);
editelem.addEventListener('click', EditTodo);
selectelem.addEventListener('click', selectTodo);
importantelem.addEventListener('click', important);
Very_importantelem.addEventListener('click', Very_important);
Ordinaryelem.addEventListener('click', Ordinary);
TickTodolem.addEventListener('click', TickTodo);
removeTickElem.addEventListener('click', removeTick);

function selectTodo() {
    todos.forEach(todo => {
        todo.classList.remove('selected');
        const selectedLabel = todo.querySelector('span');
        selectedLabel.style.display = 'none';
    });
}

function AddTodo() {
    let newevent = prompt('New Todo: ');
    if (newevent) {
        let newdiv = createTodoElement(newevent);
        document.body.append(newdiv);
        todos.push(newdiv);
        saveTodos();
    }
    if (newevent == '') {
        alert('لطفا نام تودؤ جدید انتخاب کنید')
    }
    newevent.classList('newevent');
}

function RemoveTodo() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) { 
            todo.remove();
        }
    });
    todos = todos.filter(todo => !todo.classList.contains('selected'));
    saveTodos();
}

function EditTodo() {
    let selectedTodo = todos.find(todo => todo.classList.contains('selected'));
    if (selectedTodo) {
        let newtodo = prompt('Input new todo: ');
        if (newtodo == '') {
            alert('لطفا نام جدید تودؤ مورد نظر خود را انتخاب کنید')
        }
        if (newtodo) {
            selectedTodo.textContent = newtodo;
            const selectedLabel = selectedTodo.querySelector('span');
            selectedLabel.style.display = 'none';
        }
    } else {
        alert('لطفاً یک تودو را برای ویرایش انتخاب کنید');
    }

}

loadTodos();

function important() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            todo.style.color = 'aqua';
        }
    });
    saveTodos();
}

function Very_important() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            todo.style.color = '#ff5c33';
        }
    });
    saveTodos();
}

function Ordinary() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            todo.style.color = 'white';
        }
    });
    saveTodos();
}

function TickTodo() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            if (!todo.querySelector('.tick')) {
                let tick = document.createElement('span');
                tick.textContent = '✔️'; 
                tick.classList.add('tick');
                todo.appendChild(tick); 
            }
        }
    });
    saveTodos();
}

function removeTick() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            const tick = todo.querySelector('.tick');
            if (tick) {
                tick.remove();
            }
        }
    });
    saveTodos();
}