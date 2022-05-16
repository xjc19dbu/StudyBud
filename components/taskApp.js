import TasksView from "./tasksView.js";
import TasksAPI from "./tasksAPI.js";

export default class TaskApp {
    constructor(root) {
        this.tasks = [];
        this.activateTask = null;
        this.view = new TasksView(root, this._handlers());

        this._refreshTasks();
    }

    _refreshTasks() {
        const tasks = TasksAPI.getAllTasks();

        this.setTasks(tasks);

        if (tasks.length > 0) {
            this._setActiveTask(tasks[0]);
        }
    }

    _setTasks(tasks) {
        this.tasks = tasks;
        this.view.updateTaskList(tasks);
        this.view.updateTaskPreviewVisibility(tasks.length > 0);
    }

    _setActiveTask(task) {
        this.activeTask = task;
        this.view.updateActiveTask(task)
    }

    _handlers() {
        return {
            onTaskSelect: taskId => {
                const selectedTask = this.tasks.find(task => task.id == taskId);
                this._setActiveTask(selectedTask);
            },

            onTaskAdd: () => {
                const newTask = {
                    title: "New Task",
                    body: "Task of today ..."
                };

                TasksAPI.saveTask(newTask);
                this._refreshTasks();
            },

            onTaskEdit: (title, body) => {
                TasksAPI.saveTask({
                    id: this.activeTask.id,
                    title,
                    body
                });

                this._refreshTasks();
            },
            onTaskDelete: taskId => {
                TasksAPI.deleteTask(taskId);
                this._refreshTasks();
            },
        };
    }
}

