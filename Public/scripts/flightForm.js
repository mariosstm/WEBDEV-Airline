const onClickIncrement = (event) => {
  const btnId = event.target.id 
  const textId = btnId.slice(-1);
  const text = document.querySelector("#num"+textId);
  const otherText = document.querySelector("#num"+(1-textId));
  
  if(btnId.length==4){
    text.value--;
    let totalPsngrs = parseInt(text.value)+parseInt(otherText.value);
    if(text.value == 0){
      event.target.removeEventListener("click", onClickIncrement);
      event.target.style.cssText = "color: black; background-color: lightgray; cursor: not-allowed;"
    } 
    else if(text.value == 7){
      const otherBtn = document.querySelector("#plus"+textId)
      otherBtn.addEventListener("click", onClickIncrement);
      otherBtn.style.cssText = "color: #0087ca; background-color: whitesmoke; cursor: pointer;"
    }
    if(totalPsngrs == 1){ //Δεν μπορυμε να εχουμε λιγοτερο απο 1 επιβατη
      const otherBtn = document.querySelector("#min"+(1-textId));
      event.target.removeEventListener("click", onClickIncrement);
      event.target.style.cssText = "color: black; background-color: lightgray; cursor: not-allowed;";
      otherBtn.removeEventListener("click", onClickIncrement);
      otherBtn.style.cssText = "color: black; background-color: lightgray; cursor: not-allowed;"
    }

  }else if(btnId.length==5){
    text.value++;
    let totalPsngrs = parseInt(text.value)+parseInt(otherText.value);
    if(text.value == 1 || text.value == 2){
      const otherBtn = document.querySelector("#min"+textId)
      otherBtn.addEventListener("click", onClickIncrement);
      otherBtn.style.cssText = "color: #0087ca; background-color: whitesmoke; cursor: pointer;"
    }
    else if(text.value == 8){
      event.target.removeEventListener("click", onClickIncrement);
      event.target.style.cssText = "color: black; background-color: lightgray; cursor: not-allowed;"
    }
    if(totalPsngrs == 2 && otherText.value != 0){ //τα κουμπια γινονται λειτουργικα στους 2 επιβατες (το κουμπι της ιδιας σειρας δισαφαλιζεται στο 1ο if)
      const otherBtn = document.querySelector("#min"+(1-textId));
      otherBtn.addEventListener("click", onClickIncrement);
      otherBtn.style.cssText = "color: #0087ca; background-color: whitesmoke; cursor: pointer;"

    }
  }
  let totalPsngrs = parseInt(text.value)+parseInt(otherText.value);
  const formField = document.querySelector(".passengers-btn");
  formField.value =  totalPsngrs == 1 ? "1 Επιβάτης" : totalPsngrs + " Επιβάτες";
}

const oneWayBtn = document.querySelector("#oneway");
const swapBtn = document.querySelector(".swapLocBtn");
const psngrBtn = document.querySelector(".passengers-btn");

const min0 = document.querySelector("#min0");
const plus0 = document.querySelector("#plus0");
const min1 = document.querySelector("#min1");
const plus1 = document.querySelector("#plus1");

const psngrOk = document.querySelector(".psngr-ok");

const dropDown = document.querySelector(".psngr-dropdown");

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

psngrBtn.addEventListener("click", function() {
  const dropDown = document.querySelector(".psngr-dropdown");
  dropDown.style.display="block";
})

plus0.addEventListener("click", onClickIncrement);
plus1.addEventListener("click", onClickIncrement);

psngrOk.addEventListener("click", function() {
  const dropDown = document.querySelector(".psngr-dropdown");
  dropDown.style.display="none";
})

dropDown.addEventListener("blur", function() {
  dropDown.style.display="none";
})