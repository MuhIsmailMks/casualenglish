// -----------------------------
// Theme (dark / light)
// -----------------------------
let dark = (localStorage.getItem('dark') === "true");
if (dark === undefined || dark === null) {
  localStorage.setItem('dark', 'false');
  dark = false;
}

const buttonImg = document.querySelector('.dark-mode img');
const style = document.documentElement.style;
const images = document.querySelectorAll('.container img');
const ham = document.querySelector('.ham');
const siteLogo = document.getElementById("siteLogo");

const menu = document.querySelector('.menu');
const overlay = document.querySelector('.menu-overlay'); // <-- NEW (add overlay div in HTML)
let show = false;

const help = document.querySelector('.help');
const languages = document.querySelector('.language-options');

const toggleDark = () => {
  dark = !dark;
  localStorage.setItem('dark', dark);
  changeTheme();
};

const toggleQues = () => {
  if (languages) languages.classList.remove('show');
  if (help) help.classList.toggle('show');
};

const toggleLanguages = () => {
  if (help) help.classList.remove('show');
  if (languages) languages.classList.toggle('show');
};

document.addEventListener('click', (e) => {
  const isClickInsideHelp = help && help.contains(e.target);
  const isClickInsideLang = languages && languages.contains(e.target);

  const isClickHelpBtn = e.target.closest('.ques');
  const isClickLangBtn = e.target.closest('.language');

  if (
    !isClickInsideHelp &&
    !isClickInsideLang &&
    !isClickHelpBtn &&
    !isClickLangBtn
  ) {
    if (help) help.classList.remove('show');
    if (languages) languages.classList.remove('show');
  }
});

const changeTheme = () => {
  if (dark === true) {
    buttonImg.src = './img/sun.svg';
    style.setProperty("--text-color-primary", "#FFFFFF");
    style.setProperty("--text-color-secondary", "#2A2727");
    style.setProperty("--bg-color-primary", "#4B4B4B");
    style.setProperty("--bg-color-secondary", "#AEAEAE");
    style.setProperty("--button-bg-primary", "#2A2727");
    style.setProperty("--prog-bar-color", "#2A2727");
    if (siteLogo) siteLogo.src = "./img/logodark.png";


    images.forEach((ele) => ele.classList.add('dark'));
    ham.style.filter = 'grayscale() brightness(5)';
  } else {
    buttonImg.src = './img/moon.svg';
    style.setProperty("--text-color-primary", "#0071BC");
    style.setProperty("--text-color-secondary", "#0071BC");
    style.setProperty("--bg-color-primary", "#DDE8FD");
    style.setProperty("--bg-color-secondary", "#FFFFFF88");
    style.setProperty("--button-bg-primary", "#3662C1");
    style.setProperty("--prog-bar-color", "#EE6D6B");
    if (siteLogo) siteLogo.src = "./img/logo.png";


    images.forEach((ele) => ele.classList.remove('dark'));

    if (show) {
      ham.style.filter = 'grayscale() brightness(5)';
    } else {
      ham.style.filter = '';
    }
  }
};

changeTheme();

// -----------------------------
// Menu (burger) + overlay close
// -----------------------------
const closeMenu = () => {
  show = false;
  menu.classList.remove('show');
  if (overlay) overlay.classList.remove('show');

  // restore burger icon filter depending on theme
  if (dark) {
    ham.style.filter = 'grayscale() brightness(5)';
  } else {
    ham.style.filter = '';
  }
};

const toggleMenu = () => {
  show = !show;

  if (show) {
    menu.classList.add('show');
    if (overlay) overlay.classList.add('show');
    ham.style.filter = 'grayscale() brightness(5)';
  } else {
    closeMenu();
  }
};

// Close menu when clicking outside (overlay)
// (If you use onclick="closeMenu()" in HTML overlay, this is optional but helpful as a fallback.)
if (overlay) {
  overlay.addEventListener('click', closeMenu);
}

// Optional: close menu when a menu link is clicked (nice UX on mobile)
document.querySelectorAll('.menu a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// -----------------------------
// Home selector navigation
// -----------------------------

const pages = [
  { name: "Learn", link: "./iregularverbsenglish.html" },
  { name: "Exercise", link: "./exercises.html" },
  { name: "Exam", link: "./exam.html" }
];

let currentIndex = 0;

const mainAction = document.getElementById("mainAction");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (mainAction && prevBtn && nextBtn) {

  function updateSelector() {
    mainAction.textContent = pages[currentIndex].name;
    mainAction.href = pages[currentIndex].link;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = pages.length - 1;
    updateSelector();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= pages.length) currentIndex = 0;
    updateSelector();
  });

  updateSelector();
}



