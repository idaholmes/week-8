// Tasks and Task Descriptions
class Task {
  // define what a task is, each task will have a name and a description
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  describe() {
    // function to return task name and description
    return `${this.name}: ${this.description}`;
  }
}

class TaskList {
  // define what a task list is.
  // each task list will have a name, and an array of tasks inside
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  // function for adding a task
  addTask(task) {
    // check that what is being added meets the criteria of being a 'task'
    if (task instanceof Task) {
      // if it is true, push the task into the tasks array
      this.tasks.push(task);
    } else {
      // otherwise throw an error
      throw new Error(`You can only add an instance of Task. 
    argument is not a task: ${task}`);
    }
  }

  describe() {
    // function for displaying a task list name and how many tasks it has
    return `${this.name} has ${this.tasks.length} tasks.`;
  }
}

class Menu {
  // define menu
  // menu will have an array of task lists
  // one of them will be the 'active' task list (the selectedList)
  constructor() {
    this.taskLists = [];
    this.selectedList = null;
  }

  // function for starting the program
  start() {
    // run function for showing the menu options
    let selection = this.showMainMenuOptions();
    // use a while loop / switch statement that reads what number the user types in, and returns the appropriate function
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createTaskList();
          break;
        case "2":
          this.viewTaskList();
          break;
        case "3":
          this.deleteTaskList();
          break;
        case "4":
          this.displayTaskLists();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert("Goodbye!");
  }

  showMainMenuOptions() {
    // function for showing menu options
    return prompt(`
    0) Exit
    1) Create a new task list
    2) View a task list
    3) Delete a task list
    4) Display all task lists
    `);
  }

  // function for showing a task list options, which takes in a task list as a param and displays it
  showTaskListOptions(taskListInfo) {
    return prompt(`
    0) Back
    1) Add a new task
    2) Delete a task
    -----------------
    ${taskListInfo}
    `);
  }

  // function for display a task list
  displayTaskLists() {
    // initially set task list to an empty string
    let taskListString = "";
    // loop through tasks
    for (let i = 0; i < this.taskLists.length; i++) {
      // format the task by adding different characters
      taskListString += i + ") " + this.taskLists[i].name + "\n";
    }
    alert(taskListString);
  }

  createTaskList() {
    // function for creating a task list
    // prompt user for a new task list name and capture their input
    let name = prompt("Enter name for new task list: ");
    this.taskLists.push(new TaskList(name));
  }

  // function for viewing a task list
  viewTaskList() {
    // capture the index the user wants to fetch
    let index = prompt(
      "Enter the index of the task list that you want to view:"
    );
    // see if the index is less than -1 and more than the length of the array
    if (index > -1 && index < this.taskLists.length) {
      // set the selected list to the value return from taskLists at the index the user typed in
      this.selectedList = this.taskLists[index];
      // set description to selectedList name value
      let description = "Task List Name: " + this.selectedList.name + "\n";
      description += " " + this.selectedList.describe() + "\n ";
      // loop through selected list tasks and add a description
      for (let i = 0; i < this.selectedList.tasks.length; i++) {
        description += i + ") " + this.selectedList.tasks[i].describe() + "\n";
      }
      // define the current selection and display it
      let selection1 = this.showTaskListOptions(description);
      switch (selection1) {
        case "1":
          this.createTask();
          break;
        case "2":
          this.deleteTask();
      }
    }
  }

  // function for deleting a task list
  deleteTaskList() {
    // capture the index / list the user wants to delete
    let index = prompt(
      "Enter the index of the task list that you wish to delete: "
    );
    // remove it from the array using .splice()
    if (index > -1 && index < this.taskLists.length) {
      this.taskLists.splice(index, 1);
    }
  }

  // function for creating a task
  createTask() {
    // capture name of task from the user
    let name = prompt("Enter name for new task: ");
    // capture the description from the user
    let description = prompt("Enter description for new task: ");
    // add the task the selected
    this.selectedList.addTask(new Task(name, description));
  }

  // function for the deleting a task
  deleteTask() {
    // capture index of task the user wants to delete
    let index = prompt("Enter the index of the task that you wish to delete: ");
    // remove it using .splice()
    if (index > -1 && index < this.selectedList.tasks.length) {
      this.selectedList.tasks.splice(index, 1);
    }
  }
}

// assign menu a value
let menu = new Menu();
// start the program
menu.start();
