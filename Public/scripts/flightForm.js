const oneWayBtn = document.querySelector("#oneway");
const swapBtn = document.querySelector(".swapLocBtn");

oneWayBtn.addEventListener("click", function() {
  const returnDate = document.querySelector("#returnDate");
  
  if(oneWayBtn.checked == true) {
    returnDate.style.display = "none";
  }else {
    returnDate.style.display = "block";
  }
})

swapBtn.addEventListener("click", function() {
  const dptCity = document.querySelector("#departure").value;
  const arrCity = document.querySelector("#arrival").value;
  
  document.querySelector("#departure").value = arrCity;
  document.querySelector("#arrival").value = dptCity;
})