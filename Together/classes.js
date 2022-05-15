//classes - semester, module, task
//getters and setters are not needed - they are public values

class Task {
    constructor (module,milestones,dependencies, notes){
        this.module = module;
        this.milestones = milestones; //as this can be linked with more than one milestone - it will be stord with an array of milestones
        this.dependencies = dependencies;
        this.notes = notes; //notes might need to be inserted with "" if there were no notes with initiation
    }
}


class Module{
    constructor(ModuleName,tasks,dueDates){
        this.ModuleName = ModuleName;
        this.tasks = tasks;
        this.dueDates;
    }
}

class UserAccount{
    constructor (Email,Password,Forename,Surname){
        this.Email = Email;
        this.Password = Email;
        this.Forename = Forename;
        this.Surname = Surname;
    }
}

class semester{ //each semester will be linked to an individuals email.
    constructor(Name,Modules,UserEmail){
        this.Name = Name;
        this.Module = Module;
        this.UserEmail = UserEmail;
    }

}

let Taskexample = new Task("module","milestones",new Date("2020","2","2"),"notes");
console.log(Taskexample.checkDependencies([new Date("2022","2","2")]));