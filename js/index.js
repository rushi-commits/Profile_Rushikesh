import {
  progressRing,
  toggleNav,
  toggleContacts,
  navTo,
  findElementOnScreen
} from "./modules/module.js";

window.addEventListener("resize", function () {
  progressRing.init(".progress-ring");
  findElementOnScreen();
});

window.addEventListener("orientationchange", function () {
  progressRing.init(".progress-ring");
});

//////////////////////////////////////////////
// Contacts
//////////////////////////////////////////////

$(document).on('click', 'a[href="#contacts"], #close-contacts', toggleContacts);

//////////////////////////////////////////////
// Toggle Nav
//////////////////////////////////////////////

// hamburger on click
$(".button-hamburger").on("click", toggleNav);

// menu items on click
$("a[data-target]").on("click", (e) => {
  e.preventDefault();
  // disable scroll event listener
  const el = e.target;
  const target = "#" + el.dataset.target;
  navTo(target);
});

// close on background/anchor tap

$("#main-menu").on("click", toggleNav);

//////////////////////////////////////////////
// Highlight Active Menu Item Based On Scroll
//////////////////////////////////////////////

window.addEventListener(
  "scroll",
  (e) => {
    findElementOnScreen();
  },
  {
    passive: true
  }
);

/////////////////////
// Page Loader Frame
/////////////////////

$(".loading-frame .ball")
  .addClass("expand")
  .parent()
  .delay(1000)
  .fadeOut(() => {
    // don't show scrollbar if contacts frame is open
    if (window.location.hash !== "#contacts")
      $("body").removeClass("no-scroll");
    else $("body").addClass("no-scroll");
  });

//open contacts frame if hash point on #contacts
if (window.location.hash === "#contacts") {
  toggleContacts();
}



//////////////////////////////////////////////
// Set input's labels class
//////////////////////////////////////////////

$('.form-group input:not([type=checkbox]), .form-group textarea').on('focus', (e) => {
  const $this = $(e.currentTarget);
  const $label = $this.siblings('label[for="' + $this[0].id + '"');

  $label.addClass('active');
});

$('.form-group input, .form-group textarea').on('blur', (e) => {
  const $this = $(e.currentTarget);
  const $label = $this.siblings('label[for="' + $this[0].id + '"');

  if ($this[0].value === '') {
    $label.removeClass('active');
  }
})


/////////////////////
// Load Tippy
/////////////////////

tippy('[data-tippy-template]', {
  content(reference) {
    const id = reference.getAttribute('data-tippy-template');
    const template = document.getElementById(id);
    return template.innerHTML;
  },
  interactive: true,
  interactiveBorder: 15,
  allowHTML: true,
});



//////////////////////////////////////////////
// Contact form submit
//////////////////////////////////////////////

$('#contact-form').on('submit', (e) => {
  e.preventDefault();
  const $form = $(e.currentTarget.querySelectorAll('fieldset input, fieldset textarea')).serializeArray();
  const url = e.currentTarget.action;
  const formStatesContainer = document.querySelector('#contacts .form-states');

  formStatesContainer.dataset.currentState = 'sending';
  // disable all input untill submit
  $('#contact-form input, #contact-form textarea').prop('disabled', true);

  setTimeout(
    () => {
      formStatesContainer.dataset.currentState = 'success';
    },
    2000);

})