const taskContainer =document.querySelector(".task_container");
console.log(taskContainer);

const saveChanges= () =>{
    const taskData = {
        id:`${Date.now()}`,
        imageUrl: document.getElementById("imageurl").Value,
        taskType: document.getElementById("tasktitle").Value,
        taskDescription: document.getElementById("taskdescription").Value,
    };
    console.log(taskData);
};