'use strict';
console.log('pizza js connected');

//global variables
let pizzaContainer = document.querySelector('section');
// let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');

let clicks = 0;
let maxClicksAllowed = 10;

Pizza.allPizzasArray = [];

let uniqueImageCount = 4;
let newPicsToShow = [];

//constructor function
function Pizza(name, src){
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clickedOn = 0;

  Pizza.allPizzasArray.push(this);
}

function getRandomNumber(){
  return Math.floor(Math.random() * Pizza.allPizzasArray.length);
}

function renderPizzas(){

  while(newPicsToShow.length < uniqueImageCount){
    let randomNumber = getRandomNumber();
    if(!newPicsToShow.includes(randomNumber)){
      newPicsToShow.push(randomNumber);
    }
  }
  // console.log('this is our new pics array', newPicsToShow);

  let pizza1 = newPicsToShow.shift();
  // console.log('shift image one ', pizza1, Pizza.allPizzasArray[pizza1].name);
  let pizza2 = newPicsToShow.shift();
  // console.log('shift image two ', pizza2, Pizza.allPizzasArray[pizza2].name);
  image1.src = Pizza.allPizzasArray[pizza1].src;
  image2.src = Pizza.allPizzasArray[pizza2].src;

  image1.alt = Pizza.allPizzasArray[pizza1].name;
  image2.alt = Pizza.allPizzasArray[pizza2].name;

  Pizza.allPizzasArray[pizza1].views++;
  Pizza.allPizzasArray[pizza2].views++;
}











function handlePizzaClick(event){
  if(event.target === pizzaContainer){
    alert('Please click on an image.');
  }

  clicks++;
  let clickPizzaName = event.target.alt;

  for(let i = 0; i < Pizza.allPizzasArray.length; i++){
    if(clickPizzaName === Pizza.allPizzasArray[i].name){
      Pizza.allPizzasArray[i].clickedOn++;
      break;
    }
  }

  if(clicks === maxClicksAllowed){

    pizzaContainer.removeEventListener('click', handlePizzaClick);
    // resultButton.addEventListener('click', renderResults);
    pizzaContainer.className = 'no-voting';
    renderChart();
  } else {
    renderPizzas();
  }
}



function renderChart(){
  console.log(Pizza.allPizzasArray);
  let pizzaNames = [];
  let pizzaLikes = [];
  let pizzaViews = [];

  for(let i = 0; i < Pizza.allPizzasArray.length; i++){
    pizzaNames.push(Pizza.allPizzasArray[i].name);
    // pizzaNames.push(Pizza.allPizzasArray[i].name);
    pizzaLikes.push(Pizza.allPizzasArray[i].clickedOn);
    pizzaViews.push(Pizza.allPizzasArray[i].views);
  }
  console.log({pizzaNames, pizzaLikes, pizzaViews});

  /* refer to Chart.js > Chart Types > Bar Chart:
  https://www.chartjs.org/docs/latest/charts/bar.html
  and refer to Chart.js > Getting Started > Getting Started:
  https://www.chartjs.org/docs/latest/getting-started/ */




  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: pizzaNames,
      datasets: [{
        label: 'Likes',
        data: pizzaLikes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}


//   const data = {
//     labels: pizzaNames,
//     datasets: [{
//       label: 'Likes',
//       data: pizzaLikes,
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.3)',
//         'rgba(255, 206, 86, 0.9)',
//         'rgba(75, 192, 192, 0.7)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(5, 159, 64, 0.8)',
//         'rgba(5, 159, 64, 0.5)',
//         'rgba(5, 159, 64, 0.3)'
//       ],
//       borderColor: [
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     },
//     {
//       label: 'Views',
//       data: pizzaViews,
//       backgroundColor: ['rgba(255, 159, 64, 0.3)'],
//       borderColor: ['rgba(255, 159, 64, 0.3)'],
//       borderWidth: 1
//     }]
//   };

//   const config = {
//     type: 'bar',
//     data: data,
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     },
//   };
//     //go grab the canvas element from the html
//   const canvasChart = document.getElementById('myChart').getContext('2d');
//   // eslint-disable-next-line no-undef
//   new Chart(canvasChart, config);
// }



// function renderResults(){
// let ul = document.querySelector('ul');
// for(let i = 0; i < Pizza.allPizzasArray.length; i++){
//   let li = document.createElement('li');
//   li.textContent = `${Pizza.allPizzasArray[i].name} had ${Pizza.allPizzasArray[i].views} views and was clicked on ${Pizza.allPizzasArray[i].clickedOn} times`;
//   ul.appendChild(li);
// }
// }
























console.log(Pizza.allPizzasArray);
new Pizza('Brick Oven Pizza', 'images/brickOvenPizza.jpg');
new Pizza('Calzone', 'images/calzonePizza.jpg');
new Pizza('Chicago Deep Dish', 'images/chicagoPizza.jpg');
new Pizza('Chicago Pizza and Oven Grinder', 'images/cpoGinderPizza.jpg');
new Pizza('Detroit Style', 'images/detroitPizza.jpg');
new Pizza('Papa Vito\'s Thin', 'images/mwDeluxePizzaThinCrust.jpg');
new Pizza('New York Thin', 'images/newYorkPizza.jpg');
new Pizza('Shot Gun Dans Pizza', 'images/sgDansHtossedMeatLovPizza.jpg');
//starts here with two images ready for click
renderPizzas();

pizzaContainer.addEventListener('click', handlePizzaClick);
