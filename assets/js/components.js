/* =========================================================
   Fyphost — shared header / footer components + global UI
   Injects a consistent header and footer on every page.
   ========================================================= */
(function () {
  "use strict";

  var LOGIN = "https://web.fyphost.com/login";
  var AFFILIATE = "https://fyphost.com/whmcs/affiliates.php";

  function svg(paths, vb) {
    return '<svg aria-hidden="true" viewBox="' + (vb || "0 0 24 24") + '" width="18" height="18" fill="currentColor">' + paths + "</svg>";
  }

  /* ---------- HEADER ---------- */
  var headerHTML =
    '<header class="site-header" id="siteHeader">' +
      '<div class="container">' +
        '<nav class="nav">' +
          '<a class="brand" href="index.html"><span class="dot"></span>Fyp<b>host</b></a>' +
          '<ul class="nav-menu" id="navMenu">' +
            '<li><a href="index.html">Hosting</a></li>' +
            '<li><a href="domains.html">Domains</a></li>' +
            '<li class="has-sub"><a href="#">WordPress <svg class="caret" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></a>' +
              '<ul class="submenu">' +
                '<li><a href="index.html#plans">WordPress Hosting</a></li>' +
                '<li><a href="index.html#plans">Managed WordPress</a></li>' +
              "</ul>" +
            "</li>" +
            '<li class="has-sub"><a href="#">VPS &amp; Dedicated <svg class="caret" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></a>' +
              '<ul class="submenu">' +
                '<li><a href="index.html#plans">Linux VPS</a></li>' +
                '<li><a href="index.html#plans">Windows VPS</a></li>' +
                '<li><a href="index.html#plans">Dedicated Servers</a></li>' +
              "</ul>" +
            "</li>" +
            '<li><a href="n8n.html">n8n Cloud</a></li>' +
            '<li><a href="contact-us.html">Contact</a></li>' +
          "</ul>" +
          '<div class="nav-actions">' +
            '<a class="link" href="' + AFFILIATE + '">Affiliate</a>' +
            '<a class="link" href="' + LOGIN + '">Log in</a>' +
            '<a class="btn btn-primary" href="index.html#deal">Get started</a>' +
            '<button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
          "</div>" +
        "</nav>" +
      "</div>" +
    "</header>";

  /* ---------- FOOTER ---------- */
  var year = new Date().getFullYear();
  var footerHTML =
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="brand" href="index.html"><span class="dot"></span>Fyp<b style="color:#b794ff">host</b></a>' +
            "<p>Ultra-fast, secure and reliable web hosting with SSD/NVMe storage, free SSL and 24/7 support for businesses, developers and creators.</p>" +
          "</div>" +
          '<div class="footer-col"><h4>Hosting</h4>' +
            '<a href="index.html">Web hosting</a>' +
            '<a href="index.html#plans">WordPress hosting</a>' +
            '<a href="index.html#plans">Linux VPS</a>' +
            '<a href="index.html#plans">Windows VPS</a>' +
            '<a href="index.html#plans">Cloud hosting</a>' +
            '<a href="n8n.html">n8n cloud</a>' +
          "</div>" +
          '<div class="footer-col"><h4>Domain</h4>' +
            '<a href="domains.html">Domain search</a>' +
            '<a href="domains.html">Cheap domains</a>' +
            '<a href="domains.html">Domain transfer</a>' +
          "</div>" +
          '<div class="footer-col"><h4>Company</h4>' +
            '<a href="index.html#about">About Fyphost</a>' +
            '<a href="privacy-policy.html">Privacy Policy</a>' +
            '<a href="terms-conditions.html">Terms &amp; Conditions</a>' +
            '<a href="refund-policy.html">Refund Policy</a>' +
          "</div>" +
          '<div class="footer-col"><h4>Support</h4>' +
            '<a href="contact-us.html">Contact us</a>' +
            '<a href="help-form.html">Help form</a>' +
            '<a href="https://wa.me/919734706347">WhatsApp</a>' +
            '<a href="help-form.html">Report abuse</a>' +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<div class="pay-icons">' +
            "<span>VISA</span><span>MC</span><span>AMEX</span><span>DINERS</span><span>RUPAY</span><span>PAYPAL</span><span>UPI</span><span>BTC</span>" +
          "</div>" +
          '<div class="social">' +
            '<a href="https://www.youtube.com/@fyphost" aria-label="YouTube" target="_blank" rel="noopener">' + svg('<path d="M23 12s0-3.8-.5-5.6a3 3 0 0 0-2.1-2.1C18.6 3.8 12 3.8 12 3.8s-6.6 0-8.4.5A3 3 0 0 0 1.5 6.4C1 8.2 1 12 1 12s0 3.8.5 5.6a3 3 0 0 0 2.1 2.1c1.8.5 8.4.5 8.4.5s6.6 0 8.4-.5a3 3 0 0 0 2.1-2.1C23 15.8 23 12 23 12zM9.8 15.5v-7l6 3.5-6 3.5z"/>') + "</a>" +
            '<a href="https://x.com/fyphostdotcom" aria-label="X" target="_blank" rel="noopener">' + svg('<path d="M18.9 2H22l-7.3 8.3L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.8-8.9L1 2h7l4.8 6.3L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z"/>') + "</a>" +
            '<a href="https://instagram.com/fyphost" aria-label="Instagram" target="_blank" rel="noopener">' + svg('<path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.1A6.7 6.7 0 1 0 18.7 12 6.7 6.7 0 0 0 12 5.3zm0 11A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.9-11.3a1.6 1.6 0 1 1-1.6-1.6 1.6 1.6 0 0 1 1.6 1.6z"/>') + "</a>" +
            '<a href="https://www.linkedin.com/company/fyphost" aria-label="LinkedIn" target="_blank" rel="noopener">' + svg('<path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z"/>') + "</a>" +
          "</div>" +
        "</div>" +
        '<div class="copyright">© ' + year + ", Fyphost Technologies. All rights reserved.</div>" +
      "</div>" +
    "</footer>" +
    '<a class="wa-float" href="https://wa.me/919734706347" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' +
      svg('<path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.5-1.2-2.9s.7-2 1-2.3c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.5.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.9.9c.2.1.4.2.4.3.1.1.1.6-.1 1.1z"/>') +
    "</a>";

  function inject() {
    var h = document.getElementById("header");
    var f = document.getElementById("footer");
    if (h) h.innerHTML = headerHTML;
    if (f) f.innerHTML = footerHTML;
    wireUp();
  }

  function wireUp() {
    var header = document.getElementById("siteHeader");
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
      });
      // mobile: expand submenus on tap
      menu.querySelectorAll(".has-sub > a").forEach(function (a) {
        a.addEventListener("click", function (e) {
          if (window.innerWidth <= 980) {
            e.preventDefault();
            a.parentElement.classList.toggle("expand");
          }
        });
      });
      menu.querySelectorAll("a:not(.has-sub > a)").forEach(function (a) {
        a.addEventListener("click", function () {
          menu.classList.remove("open");
          toggle.classList.remove("open");
          document.body.style.overflow = "";
        });
      });
    }

    if (header) {
      var onScroll = function () {
        header.classList.toggle("scrolled", window.scrollY > 8);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // Highlight current page in nav
    var path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("#navMenu a").forEach(function (a) {
      if (a.getAttribute("href") === path) a.style.color = "var(--purple)";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
