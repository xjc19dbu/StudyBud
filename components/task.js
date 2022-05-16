class Task {
    constructor (module,milestones,dependencies, notes){
        this.module = module;
        this.milestones = milestones; //as this can be linked with more than one milestone - it will be stord with an array of milestones
        this.dependencies = dependencies;
        this.notes = notes; //notes might need to be inserted with "" if there were no notes with initiation
    }
}