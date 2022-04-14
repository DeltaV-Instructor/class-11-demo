'use strict';
console.log('pizza js connected');
//Create an array of pizza objects, have a file for them.
//dont repeat the correct picture
//randomize the pizza image placement
//track a score - score should increment by 1 when the user guess the correct image.
// TODO a way to track how many attempts they've used - increment attempt in the event handler when any image is clicked
// TODO some way to play again without having to refresh
// TODO a way to stop the event listener from doing its thing when the num of attempts reaches a maximum number
// TODO when they reach the max, show a chart with the score and numAttempts

// Persistence of data
// When we persist data, we need to be able to do four things with it:
// create the data - setItem in localStorage
// retrieve it
// update it - setItem in localStorage
// delete it


//Global variables
const pizzaNames = [
  'Papa-Vitos-Thin','Chicago-Deep-Dish',
  'Brick-Oven-Pizza',
  'Calzone',
  'Chicago-Pizza-and-Oven-Grinder',
  'Detroit-Style',
  'New-York-Thin',
  'Shot-Gun-Dans'];

let correctPizza = '';
let wrongPizza = '';
let attempts = 0;
const maxAttempts = 10;


// get Dom elements from html
const pizzaNameElement = document.getElementById('pizzaName');
const scoreElement = document.getElementById('score');
const attemptsElement = document.getElementById('attempts');
const pizzaImagesParent = document.getElementById('pizzaImages');
const responseElement = document.getElementById('response');



//create set up function

function setup(){
//random name
//1.
  correctPizza = generateRandomPizza();
  //2.
  wrongPizza = generateRandomPizza();
  //3.
  updatePizzaName(correctPizza);


  if(attempts){
    pizzaImagesParent.removeChild(pizzaImagesParent.lastChild);
    pizzaImagesParent.removeChild(pizzaImagesParent.lastChild);
  }

  //need render once we have random image
  //4.
  renderPizzaImage(correctPizza);
  //5.
  renderPizzaImage(wrongPizza);
  //update the score
  //6.
  updateScoreElement();
  //update attempts
  //7.
  updateAttempts();

}
setup();








//creating a generate random pizza function

function generateRandomPizza(){
  const index = Math.floor(Math.random() * pizzaNames.length);
  return pizzaNames[index];
}


function updatePizzaName(pizzaName){
  pizzaNameElement.textContent = pizzaName;
}

function renderPizzaImage(pizzaName){
  const img = document.createElement('img');
  img.setAttribute('src', 'images/' + pizzaName + '.jpg');
  img.setAttribute('id', pizzaName);
  pizzaImagesParent.append(img);
}


//render a respone
function renderResponse(response){
  responseElement.textContent = response;
}


//update pizza name
//render pizza images
//event listener to render out our respone.

pizzaImagesParent.addEventListener('click', function(event){
  if(attempts === maxAttempts){
    return;
  }
  const anwser = event.target.getAttribute('id');

  if(anwser === correctPizza){
    incrementScore();
    renderResponse('whoo hoo, ZA you right you know your pizza!');
  } else {
    renderResponse('No thats not the correct pizza name for the image! You should eat more pizza.');
  }
  attempts++;
  setup();

  // if(attempts === maxAttempts){
  //   draw();
  //   renderList
  // }
});



//increment
function incrementScore(){
  let score = getScore();
  score++;
  createorUpdateScore(score);
  updateScoreElement();
}



function getScore(){
  let score = localStorage.getItem('scoreValue');
  if(score !== null){
    score = parseInt(score);
  }
  return score;
}

function createorUpdateScore(scoreValue){
  //  scoreValue =  scoreValue.toString();
  scoreValue = JSON.stringify(scoreValue);
  localStorage.setItem('scoreValue', scoreValue);
  const score = localStorage.getItem('scoreValue');
  return score;
}




function updateScoreElement(){
  scoreElement.textContent = getScore() || 0;
}

function updateAttempts(){
  attemptsElement.textContent = maxAttempts - attempts;
}






//delete score


























