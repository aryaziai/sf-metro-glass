var navString = '<header id="header" class="alt"><a href="index.html" style="border: none"><img src="assets/images/logo.png" width="300px" class="logo" /></a> <nav id="nav"> <ul> <li class="current"><a href="/">Home</a></li> <li class="submenu"> <a href="#">Services</a> <ul> <li><a href="commercial.html">Commercial Service</a></li> <li><a href="residential.html">Residential Service</a></li> <li><a href="shower-enclosures.html">Shower Enclosure</a></li> <li><a href="references-projects.html">References & Projects</a></li> </ul> </li> <li><a href="gallery.html">Gallery</a></li> <li><a href="contact.html">Contact</a></li> </ul> </nav> </header>';
var headerNav = document.querySelector("nav");
var navbar = document.createRange().createContextualFragment(navString);
headerNav.append(navbar);

var footerString = '27 Jordan Street, Suite D San Rafael, CA 94901<ul class="copyright"><li>&copy; Metropolitan Glass Corp</li> </ul>';
var footerNav = document.querySelector("#footer");
var footer = document.createRange().createContextualFragment(footerString);
footerNav.append(footer);

// Fade in elements on scroll
var onEnterViewPort = function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio !== 0) {
      entry.target.classList.add("in");
    } else {
      // entry.target.classList.remove('in');
    }
  });
};

var observer = new IntersectionObserver(onEnterViewPort, {});

var fadeMeIn = document.querySelectorAll(".fade-in-scroll");
for (var i = 0; i < fadeMeIn.length; ++i) {
  observer.observe(fadeMeIn[i]);
}

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $header = $("#header"),
    $banner = $("#banner");

  // Breakpoints.
  breakpoints({
    wide: ["1281px", "1680px"],
    normal: ["981px", "1280px"],
    narrow: ["841px", "980px"],
    narrower: ["737px", "840px"],
    mobile: [null, "736px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Scrolly.
  $(".scrolly").scrolly({
    speed: 1000,
    offset: function () {
      return $header.height() + 10;
    },
  });

  // Dropdowns.
  $("#nav > ul").dropotron({
    mode: "fade",
    noOpenerFade: true,
    expandMode: browser.mobile ? "click" : "hover",
  });

  // Nav Panel.

  // Button.
  $('<div id="navButton">' + '<a href="#navPanel" class="toggle"></a>' + "</div>").appendTo($body);

  // Panel.
  $('<div id="navPanel">' + "<nav>" + $("#nav").navList() + "</nav>" + "</div>")
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: "left",
      target: $body,
      visibleClass: "navPanel-visible",
    });

  // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
  if (browser.os == "wp" && browser.osVersion < 10) $("#navButton, #navPanel, #page-wrapper").css("transition", "none");

  // Header.
  if (!browser.mobile && $header.hasClass("alt") && $banner.length > 0) {
    $window.on("load", function () {
      $banner.scrollex({
        bottom: $header.outerHeight(),
        terminate: function () {
          $header.removeClass("alt");
        },
        enter: function () {
          $header.addClass("alt reveal");
        },
        leave: function () {
          $header.removeClass("alt");
        },
      });
    });
  }
})(jQuery);
