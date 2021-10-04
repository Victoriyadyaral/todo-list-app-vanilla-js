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

const todoByCategory = (elementsRef, list) => {
    const a = (getCategoryList(elementsRef));
    console.log(a)
    return a.map(el => countTodoInCategory(el, list));
}

export default todoByCategory;