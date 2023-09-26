'use strict';
console.log('app 11 js connected');

//Global letiables
let totalClicks = 0;
const allPizzas = [];
let previouslyPickedPizzas = [];
let leftPizzaOnThePage;
let rightPizzaOnThePage;
let pizzaImageSectionTag = document.getElementById('all_pizzas');
let leftPizzaImage = document.getElementById('left_pizza_img');
let rightPizzaImage = document.getElementById('right_pizza_img');
let chartResults = document.getElementById('chartResults');
let resultsList = document.getElementById('resultsList');

const PizzaPicture = function(name, imageSrc){
  this.name = name;
  this.imageSrc = imageSrc;
  this.clicks = 0;
  this.timesShown = 0;
  allPizzas.push(this);
};

function handleClickOnPizza(event){
  if(event.target.tagName !== 'IMG'){
    return;
  }
  totalClicks++;
  leftPizzaOnThePage.timesShown++;
  rightPizzaOnThePage.timesShown++;

  if(event.target.id === 'left_pizza_img'){
    leftPizzaOnThePage.clicks++;
  }
  if(event.target.id === 'right_pizza_img'){
    rightPizzaOnThePage.clicks++;
  }

  const tempPickedPizzas = [];

  let leftPizzaIndex;
  do{
    leftPizzaIndex = Math.floor(Math.random() * allPizzas.length);
  } while (
    previouslyPickedPizzas.includes(allPizzas[leftPizzaIndex]) ||
    tempPickedPizzas.includes(allPizzas[leftPizzaIndex])
  );
  tempPickedPizzas.push(allPizzas[leftPizzaIndex]);

  let rightPizzaIndex;
  do{
    rightPizzaIndex = Math.floor(Math.random() * allPizzas.length);
  } while (
    previouslyPickedPizzas.includes(allPizzas[rightPizzaIndex]) ||
    tempPickedPizzas.includes(allPizzas[rightPizzaIndex])
  );
  tempPickedPizzas.push(allPizzas[rightPizzaIndex]);

  leftPizzaOnThePage = allPizzas[leftPizzaIndex];
  rightPizzaOnThePage = allPizzas[rightPizzaIndex];

  leftPizzaImage.src = leftPizzaOnThePage.imageSrc;
  rightPizzaImage.src = rightPizzaOnThePage.imageSrc;

  previouslyPickedPizzas = [];
  previouslyPickedPizzas.push(allPizzas[leftPizzaIndex]);
  previouslyPickedPizzas.push(allPizzas[rightPizzaIndex]);

  if(totalClicks === 5){
    pizzaImageSectionTag.removeEventListener('click', handleClickOnPizza);
  }
}

function handleResultsList(){
  document.getElementById('pizza-clicks').style.background = '#8197c9';
  document.getElementById('pizza-clicks').style.color = 'whitesmoke';

  let ul = document.getElementById('pizza-clicks');
  ul.innerHTML = '';
  for(let i = 0; i < allPizzas.length; i++){
    let current = allPizzas[i];
    let li = document.createElement('li');
    li.textContent = current.name + ' got ' + current.clicks + ' votes';
    ul.appendChild(li);
  }
}

function handleChartResults(){
  makeAPizzaChart();
}

pizzaImageSectionTag.addEventListener('click', handleClickOnPizza);
resultsList.addEventListener('click', handleResultsList);
chartResults.addEventListener('click', handleChartResults);

new PizzaPicture('Papa Vito\'s Thin', 'images/mwDeluxePizzaThinCrust.jpg');
new PizzaPicture('Chicago Deep Dish', 'images/chicagoPizza.jpg');
new PizzaPicture('Brick Oven Pizza', 'images/brickOvenPizza.jpg');
new PizzaPicture('Calzone', 'images/calzonePizza.jpg');
new PizzaPicture('Chicago Pizza and Oven Grinder', 'images/cpoGinderPizza.jpg');
new PizzaPicture('Detroit Style', 'images/detroitPizza.jpg');
new PizzaPicture('New York Thin', 'images/newYorkPizza.jpg');
new PizzaPicture('Shot Gun Dans', 'images/sgDansHtossedMeatLovPizza.jpg');

leftPizzaOnThePage = allPizzas[0];
rightPizzaOnThePage = allPizzas[1];

function makeAPizzaChart(){
  console.log(document.getElementById('pizzaChart'));

  const pizzaNamesArray = [];
  const pizzaClicksArray = [];

  for(let i = 0; i < allPizzas.length; i++){
    const singlePizzaName = allPizzas[i].name;
    pizzaNamesArray.push(singlePizzaName);
  }

  for(let i = 0; i < allPizzas.length; i++){
    const singlePizzaClicks = allPizzas[i].clicks;
    pizzaClicksArray.push(singlePizzaClicks);
  }

  const ctx = document.getElementById('pizzaChart').getContext('2d');
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pizzaNamesArray,
      datasets: [{
        label: 'Pizza Clicks',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: pizzaClicksArray
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
