export default class TasksAPI {
    static getAllTasks(){
        const tasks = JSON.parse(localStorage.getItem("tasksAppDB") || "[]");
        
        return tasks.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        }); 
    }

    static saveTask(taskToSave) {
        const tasks = TasksAPI.getAllTasks();
        const existing = tasks.find(task => task.id == taskToSave.id);
    
        if (existing){
            existing.title = taskToSave.title;
            existing.body = taskToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            taskToSave.id = Math.floor(Math.random() * 1000);
            taskToSave.updated = new Date().toISOString();
            tasks.push(taskToSave);
        }

        localStorage.setItem("taskAppDB", JSON.stringify(tasks));
    }

    static deleteTasks(id) {
        const tasks = TasksAPI.getAllTasks();
        const newTasks = tasks.filter(task => task.id != id);

        localStorage.setItem("taskAppDB", JSON.stringify(newTasks));
    }
}
