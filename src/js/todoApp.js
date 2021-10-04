import notifications from "./notifications.js";
class TodoApp {
    addTodo = (newTodo, list) => {
        list.push(newTodo);
        notifications.successAdd();
    }
    
    archivedTodo = (index, list) => {
        list[index].isArchived = true;    
    }

    unArchivedTodo = (index, list) => {
        list[index].isArchived = false;    
    }

    updateTodo = (index, list) => {
        const updatedTodo = list.splice(index, 1);
        return updatedTodo;
    }

    deleteTodo = (index, list) => {
        list.splice(index, 1);
        notifications.warning();
    }
}

export default TodoApp;