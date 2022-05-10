// google.charts.load('current', {'packages':['gantt']});
// google.charts.setOnLoadCallback(drawChart);

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

class Gantt {
  constructor (taskId, taskName, startDate, endDate, duration, percentComplete, dependancies) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.duration = duration;
    this.percentComplete = percentComplete;
    this.dependancies = dependancies;
  }
  // Get time
  get Time() {
    return this.calcTime();
  }

  calcTime() {
    return this.endDate - this.startDate;
  }
};

const module1 = new Gantt('DSA', 'Data Structures and Algorithms', null,
new Date(2022, 1, 11), new Date(2022, 4, 25), null, 30, null);

const module2 = new Gantt('FDC', 'Foundations of Data Science', null,
new Date(2022, 1, 20), new Date(2022, 4, 29), null, 50, null);

const module3 = new Gantt('SE', 'Software Engineering', null,
new Date(2022, 1, 13), new Date(2022, 4, 26), null, 40, null);

const module4 = new Gantt('AOS', 'Architectures and Operating Systems', null,
new Date(2021, 8, 25), new Date(2022, 0, 14), null, 100, null);

const module5 = new Gantt('P2', 'Programming 2', null,
new Date(2021, 8, 22), new Date(2022, 0, 20), null, 90, null);

const module6 = new Gantt('SA', 'Systems Analysis', null,
new Date(2021, 8, 23), new Date(2022, 0, 11), null, 80, null);



console.log(module1, module2, module3, module4, module5, module6);

