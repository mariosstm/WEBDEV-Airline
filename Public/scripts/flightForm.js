const oneWayBtn = document.querySelector("#oneway");
const returnDate = document.querySelector("#returnDate");
const swapBtn = document.querySelector(".swapLocBtn");

oneWayBtn.addEventListener("click", function() {
  if(oneWayBtn.checked == true) {
    returnDate.style.display = "none";
  }else {
    returnDate.style.display = "block";
  }
})

swapBtn.addEventListener("click", function() {
  console.log('helloo');
  //why
})