import notification from './notifications.js';


export default class ServerAPI {
    constructor() {
        this.baseURL = 'http://localhost:1234';
        this.isLoading = false;
    } 

    addToDo(todo) {
        const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    };
       return await fetch(`${BASE_URL}/todos`, options)
        .then(response => {
               if (response.ok) {
                notification.successRequest();
                return response.json();
            };
               throw new Error("Error fetching data");
            })
            .catch(() => {
                notification.fetchError();
            });
    }

    fetchToDos() {
    return await fetch(`${BASE_URL}/todos`, options)
        .then(response => {
            if (response.ok) {
                notification.successRequest();
                return response.json();
            };
               throw new Error("Error fetching data");
            })
            .catch(() => {
                notification.fetchError();
            });
    }

    fetchToDoById(todoId) {
        return await fetch(`${BASE_URL}/todos/${todoId}`)
        .then(response => {
            if (response.ok) {
                notification.successRequest();
                return response.json();
            };
               throw new Error("Error fetching data");
            })
            .catch(() => {
                notification.fetchError();
            });
    }

    removeToDo(todoId) {
        const url = `${BASE_URL}/todos/${todoId}`;
        const options = {
        method: 'DELETE',
        };

        return await fetch(url, options)
        .then(response => {
            if (response.ok) {
                notification.successRequest();
                return response.json();
            };
               throw new Error("Error fetching data");
            })
            .catch(() => {
                notification.fetchError();
            });
    }

    updateToDoById(update, todoId) {
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(update),
        };

        return await fetch(`${BASE_URL}/todos/${todoId}`, options)
        .then(response => {
            if (response.ok) {
                notification.successRequest();
                return response.json();
            };
               throw new Error("Error fetching data");
            })
            .catch(() => {
                notification.fetchError();
            });
    }
}