//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".add-form__new-task-input");//Add a new task.
var addButton=document.querySelectorAll(".add-form__btn")[0];//first button
var incompleteTaskHolder=document.querySelector(".incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.querySelector(".completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add('task-list__item');

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    checkBox.classList.add('task-list__checkbox')
    //label
    var label=document.createElement("label");//label
    label.classList.add('task-list__text');
    //input (text)
    var editInput=document.createElement("input");//text
    editInput.classList.add('task-list__input', 'hidden')
    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.classList.add('task-list__btn', 'task-list__btn_edit')
    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.classList.add('task-list__btn', 'task-list__btn_delete')
    
    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.classList.add('task-list__btn-img');
    deleteButtonImg.alt = "delete button";
    
    label.innerText=taskString;
    // label.className='task';

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    // editInput.classList.add("task");

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    // editButton.classList.add("edit");

    // deleteButton.classList.add("delete");
    deleteButtonImg.src='./assets/remove.svg';
    deleteButtonImg.classList.add("task-list-img");
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.task-list__input');
    var label=listItem.querySelector(".task-list__text");
    var editBtn=listItem.querySelector(".task-list__btn_edit");
    var containsClass=listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if(containsClass){
        
      editInput.classList.add('hidden');
      label.classList.remove('hidden');
        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";

    }else{
      editInput.classList.remove('hidden');
        label.classList.add('hidden');
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    listItem.querySelector('.task-list__text').classList.add('completed-task')
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    var listItem=this.parentNode;
    listItem.querySelector('.task-list__text').classList.remove('completed-task')
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".task-list__checkbox");
    var editButton=taskListItem.querySelector(".task-list__btn_edit");
    var deleteButton=taskListItem.querySelector(".task-list__btn_delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.