let completedTaskArr = [];
let nonCompletedTaskArr = [];
const addTaskForm = document.getElementById("task_form");
const completeTaskDiv = document.getElementById("to_do_list_complete");
const imcompleteTaskDiv = document.getElementById("to_do_list_imcomplete");

const completedTask = (check, id) => {
    //check whether previous value of check is false
    //now change value of given element and then copy from nonCompletedTaskArr to completedTaskArr
    if (!check) {
        nonCompletedTaskArr[id].completed = true;
        completedTaskArr.push(nonCompletedTaskArr[id]);
        nonCompletedTaskArr.splice(id, 1);
        addTasksToDisplay(nonCompletedTaskArr);
        addCompletedTasksToDisplay(completedTaskArr);
    }
};
const removeCompletedTask = (check, id) => {
    //check whether previous value of check is true
    //now change value of given element and then copy from completedTaskArr to nonCompletedTaskArr
    if (check) {
        completedTaskArr[id].completed = false;
        nonCompletedTaskArr.push(completedTaskArr[id]);
        completedTaskArr.splice(id, 1);
        addTasksToDisplay(nonCompletedTaskArr);
        addCompletedTasksToDisplay(completedTaskArr);
    }
};

const addTasksToDisplay = (arr) => {
    //to display non-completed tasks to screen
    //while loop to first remove everything already present in Tasks
    while (imcompleteTaskDiv.firstChild) {
        imcompleteTaskDiv.removeChild(imcompleteTaskDiv.firstChild);
    }
    if (arr.length > 0) {
        //if array length is>0, display tasks list
        arr.forEach((item, index) => {
            //here you are creating a new div and adding the content of every item in completed tasks to task list and displaying in screen
            //also instead of sending "this" like previously, user is just sending index key which is the present value of elemet in array to simply remove that certain element
            let div = document.createElement("div");
            div.innerHTML = `<div class="card mainCard my-2">
            <div class="card-header panel-footer">
            <button onclick="removeTask(${index})" type="input" class="round-border cross">x</button>
            <span>${item.topic}</span>
            <span>
                <input id="${index}" type="checkbox" ${
                item.completed ? "checked" : null
            }
                 onclick="completedTask(${
                     item.completed
                 },${index})" name="cancel"/>
            </span>
            </div>
            <div class="card-body">
                <p class="card-text">Category: ${item.subject}</p>
                
            </div>
        </div>`;
        imcompleteTaskDiv.appendChild(div);
        });
    }
};

const addCompletedTasksToDisplay = (arr) => {
    //to display Completed tasks to screen
    //while loop to first remove everything already present in completd Tasks
    while (completeTaskDiv.firstChild) {
        completeTaskDiv.removeChild(completeTaskDiv.firstChild);
    }
    if (arr.length > 0) {
        console.log(arr);
        arr.forEach((item, index) => {
            
            let div = document.createElement("div");
            div.innerHTML = `<div class="card mainCard my-2">
            <div class="card-header panel-footer">
                <button disabled type="input" class="round-border cross">x</button>
                <span class="text-muted" >${item.topic} <strong class="text-success">(Completed)<strong></span>
                <span>
                    <input type="checkbox" ${
                        item.completed ? "checked" : null
                    } onclick="removeCompletedTask(${
                item.completed
            },${index})" name="cancel" />
                </span>
            </div>
            <div class="card-body">
                <p class="card-text" class="text-muted">Category: ${item.subject}</p>
            </div>
        </div>`;
        completeTaskDiv.appendChild(div);
        });
    }
};

const removeTask = (id) => {
    // this func taked id of the task you want to deleted and remove it from array and then display the updated task list
    nonCompletedTaskArr.splice(id, 1);
    addTasksToDisplay(nonCompletedTaskArr);
};

addTaskForm.addEventListener("submit", (e) => {
    //this listner will be activated when submit button is licked on popup to add a task
    //this form has all the input values
    e.preventDefault();
    let newTask = {
        topic: addTaskForm.elements[0].value,
        subject: addTaskForm.elements[1].value,
        completed: false,
    };
    nonCompletedTaskArr.push(newTask); 
    addTasksToDisplay(nonCompletedTaskArr); // display that task
    document.getElementById("cancel").click(); //this action is to press cancel button on Add Task popup to close the popup
});