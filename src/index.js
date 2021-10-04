//import './sass/main.scss';
import TodoApp from './js/todoApp.js';
import todos from './js/todos.js';
import refs from './js/get-refs.js';
//import notifications from './js/notifications.js';

import createTodo from './js/createTodo.js';
import todoByCategory from './js/getTodoByCategory.js';

import activeNotesTemplate from './templates/activeNotes.hbs';
import archivedNotesTemplate from './templates/archivedNotes.hbs';
import allNotesTemplate from './templates/allNotes.hbs';

const todoList = [...todos];
const todoApp = new TodoApp;

function renderer (list, table, template) {
    table.innerHTML = '';
    console.log('list', list)
    table.insertAdjacentHTML(
        'beforeend',
        template({
            todos: list,
        }),
    );
};

const archivedList = list => list.filter(item => item.isArchived);

const notArchivedList = list => list.filter(item => !item.isArchived);

renderer(notArchivedList(todoList), refs.activeNoteRow, activeNotesTemplate);
renderer(archivedList(todoList), refs.archivedNotesTable, archivedNotesTemplate);
renderer(todoByCategory(refs.options, todoList) , refs.allNotesTable, allNotesTemplate);

const clearForm = () => {
        refs.contentInput.value = '';
        refs.titleInput.value = '';
}

const handleSubmit = e => {
  e.preventDefault();
    const newTodo = createTodo(refs.contentInput.value, refs.titleInput.value, refs.categorySelected.value);
    if (refs.contentInput?.value && refs.titleInput?.value) {
        console.log(newTodo)
        todoApp.addTodo(newTodo, todoList);
        console.log(todoList);
        clearForm();
        const list = notArchivedList(todoList);
        renderer(list, refs.activeNoteRow, activeNotesTemplate);
    }
};

refs.form.addEventListener('submit', handleSubmit);

const onClick = (e) => {

    const id = parseInt(e.target.id);
    const index = todoList.findIndex(i => i.id === id);

    if (e.target.textContent === "remove") {   
        todoApp.deleteTodo(index, todoList);
        renderer(notArchivedList(todoList), refs.activeNoteRow, activeNotesTemplate);
        renderer(todoByCategory(refs.options, todoList), refs.allNotesTable, allNotesTemplate);
    }
    
    if (e.target.textContent === "archive") {
        todoApp.archivedTodo(index, todoList);
        renderer(notArchivedList(todoList), refs.activeNoteRow, activeNotesTemplate);
        renderer(archivedList(todoList), refs.archivedNotesTable, archivedNotesTemplate);
        renderer(todoByCategory(refs.options, todoList) , refs.allNotesTable, allNotesTemplate);
    }
        
}

refs.activeNotesTable.addEventListener('click', onClick);
