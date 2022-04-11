'use strict';
console.log('media file connected');

// this is the volume
const levees = document.getElementById('levees');
// this is the button
const randomizer = document.getElementById('randomizer');

randomizer.addEventListener('click', function(){
  
  levees.volume = Math.random();
  console.log('random volume: ',levees.volume);
  levees.autoplay = true;
});
