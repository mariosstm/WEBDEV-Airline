const hdrBtn = document.querySelector("header-button");

const newView = () => {
  hdrBtn.innerHTML = "Ο λογαριασμός μου";
  hdrBtn.href = "/my-account";
}