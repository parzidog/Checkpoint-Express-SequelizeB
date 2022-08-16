let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.getOwnPropertyNames(tasks);
  },

  add: function (name, task) {
    // saves a task for a given person
    if(!task.complete){
      task.complete = false;
    }

    if(tasks[name] == null){
      tasks[name]= [];
      tasks[name].push({content: task.content, complete: task.complete})
    }
    else{
      tasks[name].push({content: task.content, complete: task.complete});
    }
    return task;
  },

  list: function (name) {
    // returns tasks for specified person
    return tasks[name];
  },

  complete: function (name, idx) {
    if(tasks[name][idx].complete != true){
      tasks[name][idx].complete = true;
    }
  },

  remove: function (name, idx) {
    // removes a tasks
    tasks[name].splice(idx, 1);
  },

  filter: function (name, status) {
    let num = tasks[name].length;
    let value = [];
    if (status == 'complete'){
      status = true;
    }
    else if (status == 'active'){
      status = false;
    }

    for (let i = 0; i < num;i++){
      if(tasks[name][i].complete == status){
        value.push(tasks[name][i]);
      }
    }
    return value;
  }
};
