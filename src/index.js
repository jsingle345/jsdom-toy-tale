let addToy = false;

const toyCollection = document.getElementById("toy-collection");
const toysUrl = 'http://localhost:3000/toys'
const toyForm = document.querySelector(".add-toy-form")
const submitToy = document.querySelector("submit")
const likes = document.querySelectorAll(".like-btn")


function grabToys(){
  fetch(toysUrl)
  .then(resp => resp.json())
  .then(json => parseToys(json))
}

function parseToys(jsonObject){
  jsonObject.forEach(toy => {
    let toyDiv = document.createElement('div');
    toyDiv.className = 'card'
    toyDiv.innerHTML += `<h2>${toy.name}</h2> 
                        <img src=${toy.image} height= 200px>
                        <p>${toy.likes} likes</p>
                        <button class="like-btn" data-id= ${toy.id}>Like</button>`
    toyCollection.append(toyDiv);
  })
}


function createToys(event){

  let toyFormData = {
    "name": event.target[0].value,
    "image": event.target[1].value,
    "likes": 0
  }

  const newToy = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(toyFormData)

  };

  fetch(toysUrl, newToy)
  .then(resp => resp.json())
  .then(json => parseToys(json))
}

function addEventToForm(){
  
  toyForm.addEventListener("submit", function(event){
    
      createToys(event)
  })
}

function addEventToLikes() {
  toyCollection.addEventListener('click', function(event){
    if (event.target.className === 'like-btn') {
        increaseLikes(event)
}
})
}


function increaseLikes(event){
  const toyId = event.target.dataset.id
  const toyUpdate = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(event.target.previousElementSibling.innerText.split(" ")[0])+1
              
  }) 
  }

  fetch(`http://localhost:3000/toys/${toyId}`, toyUpdate)
  .then(resp => resp.json())
  .then(json => updateLikes(json)
  )
}

function updateLikes(obj){
     const likeButtons = document.querySelectorAll('[data-id]')
     likeButtons.forEach(likeButton => {
        if(likeButton["data-id"] === obj.id){
          likeButton.previousSibling.innerText = `${obj.likes} likes`
        }
     })
}



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });




  grabToys();
  addEventToForm();
  addEventToLikes();

  
  
});

