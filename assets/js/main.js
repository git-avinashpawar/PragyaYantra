// Function triggered on page load

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    var a = document.getElementById("theme-toggle");
    if (a.style.left == "0px") {
      a.style.left = "40px";
    } else {
      a.style.left = "0px";
    }
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  document.addEventListener("submit", function (event) {
    event.preventDefault();
  });
})();

const themeToggle = document.querySelector("#theme-toggle");

function enableDarkMode() {
  document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
  localStorage.setItem("Theme", "dark");
  document.getElementById("ctheme").href =
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css";
}

function enableLightMode() {
  document.body.classList.remove("dark-theme");
  document.body.classList.add("light-theme");
  localStorage.setItem("Theme", "light");
  document.getElementById("ctheme").href =
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-light.min.css";
}

function setThemePreference() {
  var T = localStorage.getItem("Theme");
  if (T == "light") {
    enableLightMode();
    return;
  }
  enableDarkMode();
}

document.onload = setThemePreference();

themeToggle.addEventListener("click", () => {
  document.body.classList.contains("light-theme")
    ? enableDarkMode()
    : enableLightMode();
});

//show_hide_password
function show_hide_pass() {
  var pass = document.getElementById("pass-input");
  var cls = document.getElementById("pass-show");

  if (pass.type == "password") {
    pass.type = "text";
    cls.classList.remove("fa-eye-slash");
    cls.classList.add("fa-eye");
  } else {
    pass.type = "password";
    cls.classList.remove("fa-eye");
    cls.classList.add("fa-eye-slash");
  }
}

const pass_btn = document.getElementById("show_hide_pass");

if (pass_btn != null) {
  pass_btn.addEventListener("click", () => {
    show_hide_pass();
  });
}

// Open
function openModal(modal) {
  document.getElementById(modal).style.display = "block";
  document.getElementById(modal).classList.add("show");
}
// Close
function closeModal(modal) {
  document.getElementById(modal).style.display = "none";
  document.getElementById(modal).classList.remove("show");
}

// Dynamic Select
function showDiv(element) {
  if (element.value == "Library") {
    document.getElementById("library").style.display = "block";
    document.getElementById("exam").style.display = "none";
  } else if (element.value == "Exam") {
    document.getElementById("library").style.display = "none";
    document.getElementById("exam").style.display = "block";
  } else {
    document.getElementById("library").style.display = "none";
    document.getElementById("exam").style.display = "none";
  }
  // document.getElementById(divId).style.display =
  //   element.value == "Library" ? "block" : "none";
}

// First  get the viewport height and  multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then  set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

//  listen to the resize event
window.addEventListener("resize", () => {
  // execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
