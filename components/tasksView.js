export default class TasksView{
    constructor(root, { onTaskSelect, onTaskAdd, onTaskEdit, onTaskDelete } = {}) {
        this.root = root;
        this.onTaskSelect = onTaskSelect;
        this.onTaskAdd = onTaskAdd;
        this.onTaskEdit = onTaskEdit;
        this.onTaskDelete = onTaskDelete;
    //     this.root.innerHTML = `
    //         <div class="tasks_sidebar">
    //             <button class="tasks_add" type="button">Add Task</button>
    //             <div class="tasks_list"></div>
    //         </div><div class="tasks_preview">
    //                 <input class="tasks_title" type="text" placeholder="New Task ..."/>
    //                 <textarea class="tasks_body">...</textarea>
    //         </div>
    // `;

    const btnAddTask = this.root.querySelector(".tasks_add");
    const inpTitle = this.root.querySelector(".tasks_title");
    const inpBody = this.root.querySelector(".tasks_body");

    btnAddTask.addEventListener("click", () => {
        this.onTaskAdd();
    });

    [inpTitle, inpBody].forEach(inputField => {
        inputField.addEventListener("blur", () => {
            const updatedTitle = inpTitle.value.trim();
            const updatedBody = inpBody.value.trim();

            this.onTaskEdit(updatedTitle, updatedBody);
        });
    });

    this.updateTaskPreviewVisibility(false);
    }

    _createListItemHTML(id ,title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class = "tasks_list-item" data-task-id = "${id}">
                <div class = "tasks_small-title">${title}</div>
                <div class = "tasks_small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class = "tasks_small-updated">
                    ${updated.toLocaleString(undefined, 
                        {dataStyle: "full", timeStyle: "short"})}
                </div>
            </div>
        `;
    }
    updateTaskList(tasks) {
        const tasksListContainer = this.root.querySelector(".tasks_list");

        // Empty list
        tasksListContainer.innerHTML ="";

        for (const task of tasks) {
            const html = this._createListItemHTML(
                task.id,
                task.title,
                task.body,
                new Date(task.updated));

            tasksListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select and delete events for each list item
        tasksListContainer.querySelectorAll(".tasks_list-item").forEach(taskListItem => {
            taskListItem.addEventListener("click", () => {
                this.onTaskSelect(taskListItem.dataset.taskId);
            });

            taskListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this task?");

                if(doDelete) {
                    this.onTaskDelete(taskListItem.dataset.taskId);
                }
            });
        });
    }

    updateActiveTask(task) {
        this.root.querySelector(".tasks_title").value = task.title;
        this.root.querySelector(".tasks_body").value = task.body;

        this.root.querySelectorAll(".tasks_list-item").forEach(taskListItem => {
            taskListItem.classList.remove("tasks_list-item--selected");

        });

        this.root.querySelector(`.tasks_list-item[data-task-id="${task.id}"]`).classList.add("tasks_list-item--selected");
    }

    updateTaskPreviewVisibility(visable){
        this.root.querySelector(".tasks_preview").style.visability = visable ? "visable" : "hidden";
    }
}