const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.clearCompleted = function(){
  if(this.complete == true){
    this.name =null;
    this.complete = null;
  }
};

Task.completeAll = function (){
  if(!this.complete){
    this.complete = true;
  }
}

Task.belongsTo(Owner);
Owner.hasMany(Task);


//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
