//import './sass/main.scss';
import todos from './js/todos.js';
import refs from './js/get-refs.js';
import getDate from './js/get-date.js';
import notifications from './js/notifications.js';
import activeNotesTemplate from './templates/activeNotes.hbs';
import archivedNotesTemplate from './templates/archivedNotes.hbs';
import allNotesTemplate from './templates/allNotes.hbs';

const { getCurrentDay, getDatesFromStr } = getDate;

const todoList = [...todos];

const renderer = (list, table, template) => {
    table.innerHTML = '';
    console.log('list', list)
    table.insertAdjacentHTML(
        'beforeend',
        template({
            todos: list,
        }),
    );
};

const archivedList = list => list.filter(item => item.isArchived === true);

const notArchivedList = list => list.filter(item => item.isArchived === false);

const countTodoInCategory = (todoCategory, list) => {
    const allTodosInCategory = list.filter(item => item.category === todoCategory );
    const archivedTodosInCategory = allTodosInCategory.filter(item => item.isArchived).length;
    const numOfAllTodos = allTodosInCategory.length
    
    return ({
        category: todoCategory,
        all: numOfAllTodos,
        archived: archivedTodosInCategory,
        notArchived: numOfAllTodos - archivedTodosInCategory
    })
}

const getCategoryList = (optionsRef) => {

const categoryList = []
for (let i = 0; i < optionsRef.length; i++) {
    categoryList.push(optionsRef[i].value)
}
return categoryList;
}

const todoInCategory = (elementsRef, list) => {
    const a = (getCategoryList(elementsRef));
    console.log(a)
    return a.map(el => countTodoInCategory(el, list));
}

const todoListInCategory = todoInCategory(refs.options, todoList);

renderer(notArchivedList(todoList), refs.activeNotesTable, activeNotesTemplate);
renderer(archivedList(todoList), refs.archivedNotesTable, archivedNotesTemplate);
renderer(todoListInCategory , refs.allNotesTable, allNotesTemplate);

 const clearForm = () => {
        refs.contentInput.value = '';
        refs.titleInput.value = '';
}
    
const createTodo = (contentText, titleText, categoryOption) => {
   if (contentText && titleText) {
        const newTodo = {
            id: Date.now(),
            content: contentText,  
            created: getCurrentDay(),
            isArchived: false,
            title: titleText, 
            category: categoryOption,
            dates: getDatesFromStr(contentText)
        };
        console.log(newTodo)

        todoList.push(newTodo);
        notifications.success();
        console.log(todoList)
    } else {
        notifications.error();
    }
}

const handleSubmit = e => {
  e.preventDefault();
    createTodo(refs.contentInput.value, refs.titleInput.value, refs.categorySelected.value);
    clearForm();
    renderer(notArchivedList(todoList), refs.activeNotesTable, activeNotesTemplate);
};

refs.form.addEventListener('submit', handleSubmit)

