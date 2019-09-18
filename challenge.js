// document.addEventListener("DOMContentLoaded", function (){

// })

const counter = document.getElementById('counter');
const increment = document.getElementById('+');
const decrement = document.getElementById('-');
const buttonContainer = document.querySelector('.button-container');
const likes = document.querySelector('.likes');
const form = document.querySelector('form');
const comments_div = document.getElementById('list');
const comment_form = document.getElementById('comment_input');
const pause = document.getElementById('pause');
const paused_buttons = document.querySelectorAll('.paused-button')

let timer = setInterval(function(){ counter.innerText = parseInt(counter.innerText) +1 }, 1000);

//giant event handler for everything other than comments
buttonContainer.addEventListener("click", e => {
  // console.dir(e.target)
  if(e.target.id === '+') {
    counter.innerText = parseInt(counter.innerText) +1 
  } else if (e.target.id === '-') {
    counter.innerText = parseInt(counter.innerText) -1 

    // like button stuff
  } else if (e.target.id === '<3') {
    let found = document.querySelector(`[data-id='${counter.innerText}']`)
    // or you could query select for all li in the like container, and then forEach over them to find if(li.dataset.id === counter.innerText)
    // can also use memoisation to make an object/hash with the key as the id and the value as the number of likes
    if (found) {
      //could replace innerText with interpolated number of likes maybe?
      let numOfLikes = found.querySelector("span")
      numOfLikes.innerText = parseInt(numOfLikes.innerText) + 1; 
      if (numOfLikes.innerText === '2') found.innerHTML += 's';
    } else {
    likes.insertAdjacentHTML("beforeend", `
      <li data-id=${counter.innerText}>${counter.innerText} has been liked <span>1</span> time</li>
    `);}
   
    //pause resume stuff
  } else if (e.target.innerText === 'pause') {
    //could nest the pause/resume button functionality in another if/else like the like button stuff
    clearInterval(timer);
    //might be useful to add an id='resume' to add css to style the resume button 
    pause.innerText = 'resume';
    //or you don't need pause as a variable and can use: e.target.innerText = "resume"
    paused_buttons.forEach(button => button.disabled = true)
  } else if (e.target.innerText === 'resume') {
    timer = setInterval(function(){ counter.innerText = parseInt(counter.innerText) +1 }, 1000);
    pause.innerText = 'pause';
    paused_buttons.forEach(button => button.disabled = false)
  }
});


//comments
form.addEventListener('submit', e => {
  e.preventDefault();
  comments_div.insertAdjacentHTML('beforeend', `
    <li>${comment_form.value}</li>
  `);
  comment_form.value = ""
});

// TO DO: if blank, don't let the user leave a comment

// button.disabled = true