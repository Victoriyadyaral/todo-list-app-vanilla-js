import notifications from './notifications.js';
import getDate from './get-date.js';

const { getCurrentDay, getDatesFromStr } = getDate;

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
        notifications.success();
        return newTodo;
    } else {
        notifications.error();
    }
};

export default createTodo;