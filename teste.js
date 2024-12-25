// index.js

const COLOR_OPTION_KEY = 'color-option';
const BACKGROUND_OPTION_KEY = 'backgroundOption';
const TRUE_VALUE = 'true';
const FALSE_VALUE = 'false';

// Selectors
const settingBox = document.querySelector('.setting-box');
const toggleBtn = document.querySelector('.toggle-setting .fa-gear');
const colorLis = document.querySelectorAll('.setting-content .color-list li');
const randomBackSpans = document.querySelectorAll('.random-list span');
const randomYesBtn = document.querySelector('.random-list .yes');
const randomNoBtn = document.querySelector('.random-list .no');
const page = document.querySelector('.landing-page');
const skillsSection = document.querySelector('.skills');
const skillProgressSpans = document.querySelectorAll('.skill-box .progress span');
const images = document.querySelectorAll('img');
const fullscreenContainer = document.getElementById('fullscreen-container');
const fullscreenImage = document.getElementById('fullscreen-image');
const bullets = document.querySelectorAll('.bullet');

// Global Variables
let backgroundInterval;
let backgroundOption = localStorage.getItem(BACKGROUND_OPTION_KEY) === TRUE_VALUE;

// Function to Set Main Color
function setMainColor(color) {
    document.documentElement.style.setProperty('--main-color', color);
    localStorage.setItem(COLOR_OPTION_KEY, color);
}

// Function to Toggle Active Class
function toggleActiveClass(elements, target) {
  elements.forEach(el => {
      el.classList.remove('active');
    });
  target.classList.add('active');
}

// Set initial main color
const mainColor = localStorage.getItem(COLOR_OPTION_KEY);
if (mainColor) {
    setMainColor(mainColor);
    colorLis.forEach(li => {
        if (li.dataset.color === mainColor) {
            li.classList.add('active');
        }
        else{
          li.classList.remove('active');
        }
    });
}

// --- Settings Box ---
toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('fa-spin');
    settingBox.classList.toggle('open');
});

// --- Color Options ---
colorLis.forEach(li => {
    li.addEventListener('click', (e) => {
      setMainColor(e.target.dataset.color);
      toggleActiveClass(colorLis, e.target);
    });
});


// --- Background Options ---
function setRandomBackground() {
    if (backgroundOption) {
        backgroundInterval = setInterval(() => {
            const imgArray = ['JPG 2.jpg', 'JPG 3.jpg', 'JPG 3.jpg', 'JPG 4.jpg', 'JPG 5.jpg', 'JPG 6.jpg'];
            const randomNum = Math.floor(Math.random() * imgArray.length);
            page.style.backgroundImage = `url("PHOTO/${imgArray[randomNum]}")`;
        }, 3000);
    } else {
        clearInterval(backgroundInterval);
    }
}

randomBackSpans.forEach(span => {
    span.addEventListener('click', e => {
        toggleActiveClass(randomBackSpans, e.target);
    });
});

randomYesBtn.addEventListener('click', () => {
    backgroundOption = true;
    localStorage.setItem(BACKGROUND_OPTION_KEY, TRUE_VALUE);
    setRandomBackground();
});

randomNoBtn.addEventListener('click', () => {
    backgroundOption = false;
    localStorage.setItem(BACKGROUND_OPTION_KEY, FALSE_VALUE);
    setRandomBackground();
});

setRandomBackground();
if (localStorage.getItem(BACKGROUND_OPTION_KEY) === TRUE_VALUE) {
  randomYesBtn.classList.add('active');
}else{
  randomNoBtn.classList.add('active');
}
// --- Skills Animation ---
function handleSkillAnimation() {
  const offsetskills = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  const windowScrollTop = window.pageYOffset;

  if (windowScrollTop > (offsetskills - windowHeight)) {
      skillProgressSpans.forEach(span => {
          span.style.width = span.dataset.progress;
      });
    }
}

window.addEventListener('scroll', handleSkillAnimation);


// --- Image Fullscreen ---
fullscreenContainer.addEventListener('click', () => {
    fullscreenContainer.style.display = 'none';
});

images.forEach(image => {
  image.addEventListener('click', () => {
    fullscreenImage.src = image.src;
    fullscreenContainer.style.display='flex';

    const existingH3 = fullscreenContainer.querySelector('h3');
    if (existingH3) {
        fullscreenContainer.removeChild(existingH3);
    }

    if (image.alt) {
        const imageContainer = document.createElement('h3');
        const imageText = document.createTextNode(image.alt);
        imageContainer.appendChild(imageText);
        fullscreenContainer.appendChild(imageContainer);
    }
  });
});


// --- Bullets ---
bullets.forEach(bullet => {
  bullet.addEventListener('click', () => {
    const targetSectionId = bullet.dataset.target;
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
    }
    toggleActiveClass(bullets, bullet);
  });
});