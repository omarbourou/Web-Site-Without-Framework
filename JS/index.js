//set color to localstorage

let maincolor = localStorage.getItem("color-option");
const colorli = document.querySelectorAll(".setting-content .color-list li");

if (maincolor !== null) {
  document.documentElement.style.setProperty("--main-color", maincolor);

  colorli.forEach((li) => {
    if (li.dataset.color === maincolor) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
}

//select landing page

let page = document.querySelector(".landing-page");

//get array of imgs

let imgArray = [
  "JPG 2.jpg",
  "JPG 3.jpg",
  "JPG 3.jpg",
  "JPG 4.jpg",
  "JPG 5.jpg",
  "JPG 6.jpg",
];

//variable to control Intervale

let backgroundInterval;

//background option

let backgroundOption = true;

//add randomsize function
function randomSize() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomnum = Math.floor(Math.random() * imgArray.length);

      page.style.backgroundImage = 'url("PHOTO/' + imgArray[randomnum] + '")';
    }, 3000);
  }
}

randomSize();

//add class open

let toogle = document.querySelector(".toggle-setting .fa-gear");
let open = document.querySelector(".setting-box");

toogle.onclick = function () {
  toogle.classList.toggle("fa-spin");
  open.classList.toggle("open");
};

//switch colors

colorli.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty("--main-color",e.target.dataset.color);

    localStorage.setItem("color-option", e.target.dataset.color);

    colorli.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

//start random background

let randomback = document.querySelectorAll(".random-list span");

randomback.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

if (localStorage.getItem("backgroundOption") === "true") {
  backgroundOption = true;
  randomSize();
} else {
  backgroundOption = false;
  clearInterval(backgroundInterval);
}


let randomYes = document.querySelector(".random-list .yes");
let randomNo = document.querySelector(".random-list .no");

randomYes.addEventListener("click", function () {
  backgroundOption = true;
  localStorage.setItem("backgroundOption", "true");
  randomSize();
});

randomNo.addEventListener("click", function () {
  backgroundOption = false;
  localStorage.setItem("backgroundOption", "false");
  clearInterval(backgroundInterval);
});

//add locale storage

//start skills

let ourskills = document.querySelector(".skills");

window.onscroll = function () {
  //Add the variable of hight
  let offsetskills = ourskills.getBoundingClientRect().top;

  //add window height
  let windowheight = window.innerHeight;

  //add window scrooltop
  let windowscrolTop = this.pageYOffset;

  //console.log(windowscrolTop > (offsetskills - windowheight))

  if (windowscrolTop > offsetskills - windowheight) {
    let allskils = document.querySelectorAll(".skill-box .progress span");

    allskils.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//add function to gallery

const images = document.querySelectorAll("img");
const fullscreenContainer = document.getElementById("fullscreen-container");
const fullscreenImage = document.getElementById("fullscreen-image");

fullscreenContainer.style.display = "none";

images.forEach((image) => {
  image.addEventListener("click", () => {
    fullscreenImage.src = image.src;
    fullscreenContainer.style.display = "flex";

    const excistingH3 = fullscreenContainer.querySelector("h3");

    if (excistingH3) {
      fullscreenContainer.removeChild(excistingH3);
    }

    if (image.alt !== null) {
      // create alternate text for image
      let imagecontainer = document.createElement("h3");

      //creat text node for alternate
      let imagetext = document.createTextNode(image.alt);

      //add text to h3
      imagecontainer.appendChild(imagetext);

      //add the h3 to body
      fullscreenContainer.appendChild(imagecontainer);
    }
    fullscreenContainer.addEventListener("click", () => {
      fullscreenContainer.style.display = "none";
    });
  });
});

//start bullet

let bullets = document.querySelectorAll(".bullet");

let links = document.querySelectorAll(".links");

function ScroolBehavior(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", function () {
      const targetSectionId = element.dataset.target;
      const targetSection = document.getElementById(targetSectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }

      elements.forEach((b) => b.classList.remove("active"));
      element.classList.add("active");
    });
  });
}

ScroolBehavior(bullets);
ScroolBehavior(links);
