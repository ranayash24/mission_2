//getting task conatainer to add cards
const taskContainer = document.querySelector(".task__container");

// new card template
const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4 mt-3" >
<div class="card shadow-sm task__card">
  <div class="card-header d-flex justify-content-end task__card__header">
    <button type="button" class="btn btn-outline-info mr-2" onclick ="editCard()" >
      <i class="fas fa-pencil-alt" onlick ="editCard()"></i>
    </button>
    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)" data-bs-target="#animateModal" data-bs-toggle="modal" >
                  <i class="fas fa-trash-alt"id=${taskData.id}
                  data-bs-target="#animateModal" data-bs-toggle="modal" onclick="deleteCard.apply(this, arguments)" ></i>
                </button>
  </div>
  <div class="card-body">
            <img height="200rem" src="${taskData.imageUrl}" alt="Card image cap" class="card-img-top mb-3 rounded-lg" id="myImg">
  
    <h4 class="task__card__title" id="title">${taskData.taskTitle}</h4>
    <p class="description trim-3-lines text-muted" id="desc" >
     ${taskData.taskDesc}
    </p>
    <div class="tags text-white d-flex flex-wrap">
      <span class="badge bg-primary m-1" id="type">${taskData.taskType}</span>
    </div>
  </div>
  <div class="card-footer">
    
    <button type="button" onclick="saveEdit()" class="btn btn-primary float-right"">
      Save Changes
    </button>
    <button type="button"  class="btn btn-primary float-right"data-bs-target="#openModal" onclick="openModal()" data-bs-toggle="modal">
    <i class="fas fa-external-link-alt" onclick="openModal()"
    data-bs-target="#openModal" data-bs-toggle="modal"></i>
    </button>
  </div>
</div>
</div>
`;

let globalStorage = []; // declaring an empty array to store data
// get card data on load/refreah from local storage
const loadCardData = () => {
  const getCardData = localStorage.getItem("tasky");
  const { cards } = JSON.parse(getCardData);

  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    globalStorage.push(cardObject);
  });
};
// save changees of new task card
const saveChanges = () => {
  const taskData = {
    id: Date.now(),
    imageUrl: document.getElementById("imageUrl").value,
    taskTitle: document.getElementById("taskTitle").value,
    taskType: document.getElementById("taskType").value,
    taskDesc: document.getElementById("taskDesc").value,
  };
  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStorage.push(taskData);

  localStorage.setItem("tasky", JSON.stringify({ cards: globalStorage }));
};
//delete card
const deleteCard = (event) => {
  event = window.event;
  const targetId = event.target.id;
  const tagName = event.target.tagName;

  globalStorage = globalStorage.filter(
    (cardObject) => cardObject.id != targetId
  );
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStorage }));

  if (tagName == "BUTTON") {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};

//edit card
const editCard = () => {
  document.getElementById("title").contentEditable = "true";
  document.getElementById("desc").contentEditable = "true";
  document.getElementById("type").contentEditable = "true";
};
const saveEdit = () => {
  const editTitle = document.getElementById("title").textContent;
  const editType = document.getElementById("type").textContent;
  const editDesc = document.getElementById("desc").textContent;

  document.getElementById("title").innerHTML = editTitle;
  document.getElementById("type").innerHTML = editType;
  document.getElementById("desc").innerHTML = editDesc;

  document.getElementById("title").contentEditable = "false";
  document.getElementById("desc").contentEditable = "false";
  document.getElementById("type").contentEditable = "false";
};

const openModal = () => {

  openTitle = document.getElementById("title").textContent;
  openType = document.getElementById("type").textContent;
  openDesc = document.getElementById("desc").textContent;
  openImage = document.images.namedItem("myImg").src;

  document.getElementById("openTitle").innerHTML = openTitle;
  document.getElementById("openType").innerHTML = openType;
  document.getElementById("openDesc").innerHTML = openDesc;
  document.getElementById("openImage").src = openImage;
  

}