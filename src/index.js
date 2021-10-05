import './sass/main.scss';
import TodoApp from './js/todoApp.js';
import todos from './js/todos.js';
import refs from './js/get-refs.js';

import createTodo from './js/createTodo.js';
import todoByCategory from './js/getTodoByCategory.js';

import activeNotesTemplate from './templates/activeNotes.hbs';
import archivedNotesTemplate from './templates/archivedNotes.hbs';
import allNotesTemplate from './templates/allNotes.hbs';

const todoList = [...todos];

const todoApp = new TodoApp;

function renderer (list, table, template) {
    try {
        table.innerHTML = '';
        table.insertAdjacentHTML(
            'beforeend',
            template({
                todos: list,
            }),
        );
    } catch(e) {
        alert(`Notes for render aren't found`);
    }
};

const archivedList = list => list.filter(item => item.isArchived);

const notArchivedList = list => list.filter(item => !item.isArchived);

renderer(notArchivedList(todoList), refs.activeNoteRow, activeNotesTemplate);
renderer(archivedList(todoList), refs.archivedNotesRow, archivedNotesTemplate);
renderer(todoByCategory(refs.options, todoList), refs.allNotesRow, allNotesTemplate);

const clearForm = () => {
        refs.contentInput.value = '';
        refs.titleInput.value = '';
}

const handleSubmit = e => {
    e.preventDefault();
    const category = refs.categorySelected.value.split(/\-/).map(word => word[0]?.toUpperCase() + word.substring(1)).join(' ');
    const newTodo = createTodo(refs.contentInput.value, refs.titleInput.value, category);
    if (refs.contentInput?.value && refs.titleInput?.value) {
        todoApp.addTodo(newTodo, todoList);
        clearForm();
        const list = notArchivedList(todoList);
        renderer(list, refs.activeNoteRow, activeNotesTemplate);
        renderer(todoByCategory(refs.options, todoList), refs.allNotesRow, allNotesTemplate);
    }
};

refs.form.addEventListener('submit', handleSubmit);

const onClick = (e) => {

    const id = parseInt(e.target.id);
    const index = todoList.findIndex(i => i.id === id);

    if (e.target.textContent === "remove") {
        todoApp.deleteTodo(index, todoList);
        renderer(notArchivedList(todoList), refs.activeNoteRow, activeNotesTemplate);
        renderer(todoByCategory(refs.options, todoList), refs.allNotesRow, allNotesTemplate);
    }
    
    if (e.target.textContent === "archive") {
        todoApp.archivedTodo(index, todoList);
        renderer(notArchivedList(todoList), refs.activeNoteRow, activeNotesTemplate);
        renderer(archivedList(todoList), refs.archivedNotesRow, archivedNotesTemplate);
        renderer(todoByCategory(refs.options, todoList), refs.allNotesRow, allNotesTemplate);
    }

    if (e.target.textContent === "edit") {
        const [updatedTodo] = todoApp.updateTodo(index, todoList);
        refs.contentInput.value = updatedTodo.content;
        refs.titleInput.value = updatedTodo.title;
    }
    return;
};

const onUnarchivedBtnClick = (e) => {
    if (e.target.textContent !== "unarchive") {
        return;
    }
        const id = parseInt(e.target.id);
        const index = todoList.findIndex(i => i.id === id);
        todoApp.unArchivedTodo(index, todoList);
        renderer(notArchivedList(todoList), refs.activeNoteRow, activeNotesTemplate);
        renderer(archivedList(todoList), refs.archivedNotesRow, archivedNotesTemplate);
        renderer(todoByCategory(refs.options, todoList), refs.allNotesRow, allNotesTemplate);
};

refs.activeNotesTable.addEventListener('click', onClick);
refs.archivedNotesTable.addEventListener('click', onUnarchivedBtnClick);

const onHideArchivedBtnClick = () => {
   
    refs.archivedNotesWrap.classList.toggle('hide');

    return refs.hideBtnArchiv.textContent === 'Hide' ?
        refs.hideBtnArchiv.textContent = 'Show'
        :
        refs.hideBtnArchiv.textContent = 'Hide';
}

refs.hideBtnArchiv.addEventListener('click', onHideArchivedBtnClick)