// Landing Page
let landing = document.querySelector(".bg-slider");

const images = [
  "url('../img/1.jpg')",
  "url('../img/2.jpg')",
  "url('../img/3.jpg')",
  "url('../img/4.jpg')",
  "url('../img/5.jpg')",
];

let current = 0;

function changeBackground() {
  landing.style.opacity = 0.1;

  setTimeout(() => {
    current = (current + 1) % images.length;
    landing.style.backgroundImage = images[current];

    landing.style.opacity = 1;
  }, 1500);
}

landing.style.backgroundImage = images[current];

let randomBackground;
// Landing Page
// Setting Box
let gear = document.querySelector(".fa-gear");
let setting = document.querySelector(".setting-box");

gear.addEventListener("click", function () {
  setting.classList.toggle("active");
  gear.classList.toggle("fa-spin");
});
// Setting Box
// Color Choose
const img = document.querySelector(".img-us img");

function changeImage(color) {
  const colorName = color.replace("#", "");
  img.classList.add("fade-out");

  setTimeout(() => {
    img.src = `./img/about-${colorName}.png`;
    img.classList.remove("fade-out");
  }, 300);
}
let colorChoose = document.querySelectorAll(".box-color li");

let savedColor = localStorage.getItem("second-color");
if (savedColor !== null) {
  document.documentElement.style.setProperty("--second-color", savedColor);
  changeImage(savedColor);
  colorChoose.forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === savedColor) {
      li.classList.add("active");
    }
  });
}

colorChoose.forEach((li) => {
  li.addEventListener("click", (e) => {
    let chosenColor = e.target.dataset.color;
    let spans = document.querySelectorAll(
      ".skills .skill-box .skill-program span"
    );
    spans.forEach((el, index) => {
      el.style.width = 0;
    });
    document.documentElement.style.setProperty("--second-color", chosenColor);

    colorChoose.forEach((li) => li.classList.remove("active"));
    li.classList.add("active");
    changeImage(chosenColor);

    localStorage.setItem("second-color", chosenColor);
    setTimeout(() => {
      startProgramme();
    }, 500);
  });
});

// Color Choose
//Random Background
let buttonBackground = true;
let statusBack = JSON.parse(localStorage.getItem("randomBack"));
let statusButton = JSON.parse(localStorage.getItem("buttonStatus"));
let randomBack = document.querySelectorAll(".box-color .chooses button");
if (statusButton !== null) {
  randomBack.forEach((button) => {
    button.classList.remove("active");
  });
  if (statusButton) {
    document.querySelector("button.yes").classList.add("active");
  } else {
    document.querySelector("button.no").classList.add("active");
  }
}
if (statusBack !== null) {
  buttonBackground = statusBack;
  if (buttonBackground) {
    randomBackground = setInterval(changeBackground, 8000);
  } else {
    clearInterval(randomBackground);
  }
} else {
  randomBackground = setInterval(changeBackground, 8000);
}

randomBack.forEach((button) => {
  button.addEventListener("click", (el) => {
    randomBack.forEach((e) => e.classList.remove("active"));
    button.classList.add("active");
    if (
      document
        .querySelector(".box-color .chooses .no")
        .classList.contains("active")
    ) {
      buttonBackground = false;
      clearInterval(randomBackground);
      localStorage.setItem("randomBack", JSON.stringify(false));
      localStorage.setItem("buttonStatus", JSON.stringify(false));
    }
    if (
      document
        .querySelector(".box-color .chooses .yes")
        .classList.contains("active")
    ) {
      buttonBackground = true;
      randomBackground = setInterval(changeBackground, 8000);
      localStorage.setItem("randomBack", JSON.stringify(true));
      localStorage.setItem("buttonStatus", JSON.stringify(true));
    }
  });
});
//Random Background
// Skills Section
let skillSection = document.querySelector(".skills");

window.onscroll = function () {
  let skillOffsetTop = skillSection.offsetTop;
  let skillOffsetHeight = skillSection.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowTopScroll = this.pageYOffset;

  if (windowTopScroll > skillOffsetTop + skillOffsetHeight - windowHeight) {
    startProgramme();
  }
};
function startProgramme() {
  let spans = document.querySelectorAll(
    ".skills .skill-box .skill-program span"
  );
  spans.forEach((el, index) => {
    setTimeout(() => {
      el.style.width = el.dataset.progress;
    }, index * 500);
  });
}
// Skills Section
// Our Gallery
let imgClick = document.querySelectorAll(
  ".gallery .gallery-box .img-box .box img"
);
imgClick.forEach((img) => {
  img.addEventListener("click", (el) => {
    let popContainer = document.createElement("div");
    popContainer.className = "pop-container";
    let popBox = document.createElement("div");
    popBox.className = "pop-box";
    let imgEle = document.createElement("img");
    imgEle.src = img.src;
    let span = document.createElement("span");
    span.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    popBox.appendChild(span);
    popBox.appendChild(imgEle);
    popContainer.appendChild(popBox);
    document.body.appendChild(popContainer);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      document.querySelector(".pop-container").style.opacity = "1";
    }, 300);
    document
      .querySelector(".pop-container .pop-box span")
      .addEventListener("click", () => {
        document.querySelector(".pop-container").style.opacity = "0";
        setTimeout(() => {
          document.querySelector(".pop-container").remove();
          document.body.style.overflow = "auto";
        }, 300);
        console.log("1");
      });
  });
});

// Our Gallery
// Navigation Bullets
let allBullet = document.querySelectorAll(".nav .bullet");
let allLink = document.querySelectorAll(".links a");
function scrollIntoView(element) {
  element.forEach((e) => {
    e.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.name).scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    });
  });
}
scrollIntoView(allBullet);
scrollIntoView(allLink);
let showBullets = document.querySelectorAll(".box-bullet .chooses button");
let bullets = document.querySelector(".nav");
let bulletLocalStorage = localStorage.getItem("showBullets");

if (bulletLocalStorage !== null) {
  showBullets.forEach((e) => {
    e.classList.remove("active");
  });
  bullets.style.display = bulletLocalStorage;
  if (bulletLocalStorage === "none") {
    document.querySelector(".box-bullet .chooses .no").classList.add("active");
    console.log(document.querySelector(".box-bullet .chooses .no"));
  } else {
    document.querySelector(".box-bullet .chooses .yes").classList.add("active");
  }
}

showBullets.forEach((e) => {
  e.addEventListener("click", (el) => {
    bullets.style.display = el.target.dataset.display;
    localStorage.setItem("showBullets", el.target.dataset.display);
    showBullets.forEach((e) => {
      e.classList.remove("active");
    });
    el.target.classList.add("active");
  });
});
// Navigation Bullets
// Reset
document.querySelector(".reset").onclick = () => {
  localStorage.clear();
  window.location.reload();
};
// Reset
// Toggle-Menu
let toggle = document.querySelector(".toggle-menu");
let linksUl = document.querySelector(".header-area .links");
toggle.addEventListener("click", (el) => {
  toggle.classList.toggle("active");
  if (toggle.classList.contains("active")) {
    linksUl.style.display = "flex";
  } else {
    linksUl.style.display = "none";
  }
});
// Toggle-Menu
// header Button
let headerButton = document.querySelectorAll(".box-header .chooses button");
let header = document.querySelector(".header-area");
let headerLocalStorage = localStorage.getItem("headerButton");
if (headerLocalStorage === "active") {
  headerButton.forEach((e) => {
    e.classList.remove("active");
    if (e.classList.contains("yes")) {
      e.classList.add("active");
    }
    header.classList.add("active");
  });
}
headerButton.forEach((e) => {
  e.addEventListener("click", (el) => {
    headerButton.forEach((act) => {
      act.classList.remove("active");
    });
    if (el.target.classList.contains("yes")) {
      header.classList.add("active");
      el.target.classList.add("active");
      localStorage.setItem("headerButton", "active");
    } else {
      header.classList.remove("active");
      el.target.classList.add("active");
      localStorage.setItem("headerButton", "");
    }
  });
});
// header Button
const sections = document.querySelectorAll(
  "  .about-us, .skills, .gallery, .time-line, .feature, .testimonials, .contact"
);
const navLinks = document.querySelectorAll(".links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = "." + entry.target.classList[0];

        navLinks.forEach((link) => link.classList.remove("active"));

        const activeLink = document.querySelector(
          `.links a[data-name="${id}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((sec) => observer.observe(sec));
