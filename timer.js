let counter = 0;
let timeout;
let timer_on = 0;

function timedCount() {
  document.getElementById("demo").value = counter;
   if (counter < 10) { counter++;}
  else{ stopCount();}
  timeout = setTimeout(timedCount, 1000);
}

window.startCount = function startCount() {

  if (!timer_on) {
    timer_on = 1;
    timedCount();
  }
}

function stopCount() {
  clearTimeout(timeout);
  timer_on = 0;
}



// var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();
    
//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;
    
//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//   // Output the result in an element with id="demo"
//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";
    
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);






// var timer; 
// var timeLeft = 60; // seconds

// // What to do when the timer runs out
// function gameOver() {
//   // This cancels the setInterval, so the updateTimer stops getting called
//   cancelInterval(timer);
  
//   // re-show the button, so they can start it again
//   //$('#playAgainButton').show();

//   btn = document.getElementById('playAgainButton');

// btn.show();
// }

// function updateTimer() {

//     timerr  = document.getElementById('playAgainButton');

//  if(timeLeft >= 0)
//     timerr.setTime(timer.getTime() - 1)

 
//   else {
//     gameOver();
//   }
// }

// // The button has an on-click event handler that calls this
// function start() {
//   // setInterval is a built-in function that will call the given function
//   // every N milliseconds (1 second = 1000 ms)
//   timer = setInterval(updateTimer, 1000);
  
//   // It will be a whole second before the time changes, so we'll call the update
//   // once ourselves
//   updateTimer();
  
//   // We don't want the to be able to restart the timer while it is running,
//   // so hide the button.
//  ///  $('#playAgainButton').hide();

//    btn = document.getElementById('playAgainButton');

// btn.hide();
// }