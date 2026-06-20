/* =========================================================
   Fyphost — shared chrome: announcement bar, header (mega menu),
   footer, cookie bar, back-to-top, live chat widget.
   Injected on every page for a consistent experience.
   ========================================================= */
(function () {
  "use strict";

  var LOGIN = "https://web.fyphost.com/login";
  var SIGNUP = "https://web.fyphost.com/register.php";
  var AFFILIATE = "https://fyphost.com/whmcs/affiliates.php";

  function svg(p, vb) {
    return '<svg aria-hidden="true" viewBox="' + (vb || "0 0 24 24") + '" width="18" height="18" fill="currentColor">' + p + "</svg>";
  }

  /* ---------- ANNOUNCEMENT BAR ---------- */
  var announceHTML =
    '<div class="announce" id="announce">' +
      '<div class="container">' +
        "<span>🎉 <b>Mega Sale</b> — up to <b>88% OFF</b> all hosting plans + 3 months free. Use code</span>" +
        '<span class="ann-code">FYP88</span>' +
        '<a href="index.html#deal">Claim deal →</a>' +
        '<button class="ann-close" id="annClose" aria-label="Dismiss">×</button>' +
      "</div>" +
    "</div>";

  /* ---------- HEADER ---------- */
  var hostingMega =
    '<div class="mega"><div class="mega-grid">' +
      megaLink("web-hosting.html", "🌐", "Web Hosting", "Fast shared hosting for any site") +
      megaLink("wordpress-hosting.html", "📝", "WordPress Hosting", "Managed, optimised &amp; secure") +
      megaLink("cloud-hosting.html", "☁️", "Cloud Hosting", "Dedicated resources that scale") +
      megaLink("vps-hosting.html", "🖥️", "VPS Hosting", "Full root access &amp; control") +
      megaLink("reseller-hosting.html", "💼", "Reseller Hosting", "Start your own hosting brand") +
      megaLink("n8n.html", "🔗", "n8n Cloud", "Pre-installed automation VPS") +
    "</div></div>";

  function megaLink(href, ic, title, desc) {
    return '<a class="mega-link" href="' + href + '"><span class="mi">' + ic + "</span><span><b>" + title + "</b><span>" + desc + "</span></span></a>";
  }

  var headerHTML =
    '<header class="site-header" id="siteHeader">' +
      '<div class="container">' +
        '<nav class="nav">' +
          '<a class="brand" href="index.html"><span class="dot"></span>Fyp<b>host</b></a>' +
          '<ul class="nav-menu" id="navMenu">' +
            '<li class="has-mega has-sub"><a href="web-hosting.html">Hosting <svg class="caret" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></a>' + hostingMega + "</li>" +
            '<li><a href="domains.html">Domains</a></li>' +
            '<li class="has-sub"><a href="vps-hosting.html">VPS &amp; Cloud <svg class="caret" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></a>' +
              '<ul class="submenu">' +
                '<li><a href="vps-hosting.html">Linux VPS</a></li>' +
                '<li><a href="vps-hosting.html">Windows VPS</a></li>' +
                '<li><a href="cloud-hosting.html">Cloud Hosting</a></li>' +
                '<li><a href="n8n.html">n8n Cloud</a></li>' +
              "</ul></li>" +
            '<li class="has-sub"><a href="about.html">Company <svg class="caret" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></a>' +
              '<ul class="submenu">' +
                '<li><a href="about.html">About us</a></li>' +
                '<li><a href="why-us.html">Why Fyphost</a></li>' +
                '<li><a href="reviews.html">Reviews</a></li>' +
                '<li><a href="affiliate.html">Affiliate program</a></li>' +
              "</ul></li>" +
            '<li class="has-sub"><a href="knowledge-base.html">Resources <svg class="caret" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></a>' +
              '<ul class="submenu">' +
                '<li><a href="knowledge-base.html">Knowledge base</a></li>' +
                '<li><a href="blog.html">Blog</a></li>' +
                '<li><a href="contact-us.html">Contact us</a></li>' +
                '<li><a href="help-form.html">Help form</a></li>' +
              "</ul></li>" +
          "</ul>" +
          '<div class="nav-actions">' +
            '<a class="link" href="' + AFFILIATE + '">Affiliate</a>' +
            '<a class="link" href="' + LOGIN + '">Log in</a>' +
            '<a class="btn btn-primary" href="' + SIGNUP + '">Get started</a>' +
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
            '<div class="newsletter" style="max-width:none">' +
              '<input type="email" placeholder="Your email for offers" aria-label="Email">' +
              '<button class="btn btn-primary" type="button" id="nlBtn">Subscribe</button>' +
            "</div>" +
          "</div>" +
          '<div class="footer-col"><h4>Hosting</h4>' +
            '<a href="web-hosting.html">Web hosting</a>' +
            '<a href="wordpress-hosting.html">WordPress hosting</a>' +
            '<a href="cloud-hosting.html">Cloud hosting</a>' +
            '<a href="vps-hosting.html">VPS hosting</a>' +
            '<a href="reseller-hosting.html">Reseller hosting</a>' +
            '<a href="n8n.html">n8n cloud</a>' +
          "</div>" +
          '<div class="footer-col"><h4>Domains</h4>' +
            '<a href="domains.html">Domain search</a>' +
            '<a href="domains.html">Cheap domains</a>' +
            '<a href="domains.html">Domain transfer</a>' +
          "</div>" +
          '<div class="footer-col"><h4>Company</h4>' +
            '<a href="about.html">About Fyphost</a>' +
            '<a href="why-us.html">Why Fyphost</a>' +
            '<a href="reviews.html">Reviews</a>' +
            '<a href="affiliate.html">Affiliate</a>' +
            '<a href="blog.html">Blog</a>' +
          "</div>" +
          '<div class="footer-col"><h4>Support</h4>' +
            '<a href="knowledge-base.html">Knowledge base</a>' +
            '<a href="contact-us.html">Contact us</a>' +
            '<a href="help-form.html">Help form</a>' +
            '<a href="https://wa.me/919734706347">WhatsApp</a>' +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<div class="pay-icons">' +
            "<span>VISA</span><span>MC</span><span>AMEX</span><span>DINERS</span><span>RUPAY</span><span>PAYPAL</span><span>UPI</span><span>BTC</span>" +
          "</div>" +
          '<div class="social">' +
            social("https://www.youtube.com/@fyphost", "YouTube", '<path d="M23 12s0-3.8-.5-5.6a3 3 0 0 0-2.1-2.1C18.6 3.8 12 3.8 12 3.8s-6.6 0-8.4.5A3 3 0 0 0 1.5 6.4C1 8.2 1 12 1 12s0 3.8.5 5.6a3 3 0 0 0 2.1 2.1c1.8.5 8.4.5 8.4.5s6.6 0 8.4-.5a3 3 0 0 0 2.1-2.1C23 15.8 23 12 23 12zM9.8 15.5v-7l6 3.5-6 3.5z"/>') +
            social("https://x.com/fyphostdotcom", "X", '<path d="M18.9 2H22l-7.3 8.3L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.8-8.9L1 2h7l4.8 6.3L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z"/>') +
            social("https://instagram.com/fyphost", "Instagram", '<path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.1A6.7 6.7 0 1 0 18.7 12 6.7 6.7 0 0 0 12 5.3zm0 11A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.9-11.3a1.6 1.6 0 1 1-1.6-1.6 1.6 1.6 0 0 1 1.6 1.6z"/>') +
            social("https://www.linkedin.com/company/fyphost", "LinkedIn", '<path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z"/>') +
          "</div>" +
        "</div>" +
        '<div class="copyright">© ' + year + ", Fyphost Technologies. All rights reserved. · <a href=\"privacy-policy.html\" style=\"color:#9d95b8\">Privacy</a> · <a href=\"terms-conditions.html\" style=\"color:#9d95b8\">Terms</a> · <a href=\"refund-policy.html\" style=\"color:#9d95b8\">Refunds</a></div>" +
      "</div>" +
    "</footer>";

  function social(href, label, path) {
    return '<a href="' + href + '" aria-label="' + label + '" target="_blank" rel="noopener">' + svg(path) + "</a>";
  }

  /* ---------- COOKIE BAR ---------- */
  var cookieHTML =
    '<div class="cookie" id="cookieBar">' +
      "<p>We use cookies to improve your experience and analyse traffic. See our <a href=\"privacy-policy.html\">Privacy Policy</a>.</p>" +
      '<div class="c-actions">' +
        '<button class="btn btn-ghost" id="ckDecline" type="button" style="padding:9px 16px">Decline</button>' +
        '<button class="btn btn-primary" id="ckAccept" type="button" style="padding:9px 16px">Accept</button>' +
      "</div>" +
    "</div>";

  /* ---------- BACK TO TOP ---------- */
  var toTopHTML = '<button class="to-top" id="toTop" aria-label="Back to top">' + svg('<path d="M12 4l8 8-1.4 1.4L13 7.8V20h-2V7.8L5.4 13.4 4 12z"/>') + "</button>";

  /* ---------- LIVE CHAT ---------- */
  var chatHTML =
    '<button class="chat-launch" id="chatLaunch">' + svg('<path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.3 1.1 4.4 2.9 5.9L4 21l4-1.6c1.2.4 2.6.6 4 .6 5.5 0 10-3.8 10-8.5S17.5 3 12 3z"/>') + "Chat with us</button>" +
    '<div class="chat-box" id="chatBox">' +
      '<div class="chat-head"><span class="av">' + svg('<path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z"/>') + "</span>" +
        "<span><b>Fyphost Support</b><span><span class=\"on\"></span> Typically replies in minutes</span></span>" +
        '<button class="x" id="chatClose" aria-label="Close">×</button></div>' +
      '<div class="chat-body" id="chatBody"><div class="bubble bot">👋 Hi there! Welcome to Fyphost. How can we help you today?</div></div>' +
      '<form class="chat-input" id="chatForm"><input type="text" id="chatInput" placeholder="Type your message…" autocomplete="off"><button type="submit" aria-label="Send">' + svg('<path d="M2 21l21-9L2 3v7l15 2-15 2z"/>') + "</button></form>" +
    "</div>";

  function inject() {
    var a = document.getElementById("announce-bar");
    var h = document.getElementById("header");
    var f = document.getElementById("footer");
    if (a) a.innerHTML = announceHTML;
    if (h) h.innerHTML = headerHTML;
    if (f) f.innerHTML = footerHTML;
    document.body.insertAdjacentHTML("beforeend", cookieHTML + toTopHTML + chatHTML);
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
      menu.querySelectorAll(".has-sub > a, .has-mega > a").forEach(function (link) {
        link.addEventListener("click", function (e) {
          if (window.innerWidth <= 980) {
            e.preventDefault();
            link.parentElement.classList.toggle("expand");
          }
        });
      });
      menu.querySelectorAll("a").forEach(function (a) {
        if (a.parentElement.classList.contains("has-sub") || a.parentElement.classList.contains("has-mega")) return;
        a.addEventListener("click", function () {
          menu.classList.remove("open");
          toggle.classList.remove("open");
          document.body.style.overflow = "";
        });
      });
    }

    if (header) {
      var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // active nav highlight
    var path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("#navMenu a").forEach(function (a) {
      if (a.getAttribute("href") === path) a.style.color = "var(--purple)";
    });

    // announcement close
    var annClose = document.getElementById("annClose");
    if (annClose) {
      if (sessionStorage.getItem("fyp_ann_closed")) {
        var bar = document.getElementById("announce"); if (bar) bar.style.display = "none";
      }
      annClose.addEventListener("click", function () {
        var bar = document.getElementById("announce"); if (bar) bar.style.display = "none";
        sessionStorage.setItem("fyp_ann_closed", "1");
      });
    }

    // newsletter
    var nlBtn = document.getElementById("nlBtn");
    if (nlBtn) nlBtn.addEventListener("click", function () {
      var inp = nlBtn.previousElementSibling;
      if (inp && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) { nlBtn.textContent = "Subscribed ✓"; inp.value = ""; setTimeout(function(){ nlBtn.textContent = "Subscribe"; }, 3000); }
      else if (inp) { inp.focus(); inp.style.borderColor = "#ff8a8a"; }
    });

    // cookie bar
    var cookie = document.getElementById("cookieBar");
    if (cookie && !localStorage.getItem("fyp_cookie")) {
      setTimeout(function () { cookie.classList.add("show"); }, 1200);
      ["ckAccept", "ckDecline"].forEach(function (id) {
        var b = document.getElementById(id);
        if (b) b.addEventListener("click", function () { cookie.classList.remove("show"); localStorage.setItem("fyp_cookie", id === "ckAccept" ? "accepted" : "declined"); });
      });
    }

    // back to top
    var toTop = document.getElementById("toTop");
    if (toTop) {
      window.addEventListener("scroll", function () { toTop.classList.toggle("show", window.scrollY > 600); }, { passive: true });
      toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    }

    initChat();
  }

  /* ---------- Live chat (mock auto-responder) ---------- */
  function initChat() {
    var launch = document.getElementById("chatLaunch");
    var box = document.getElementById("chatBox");
    var close = document.getElementById("chatClose");
    var form = document.getElementById("chatForm");
    var input = document.getElementById("chatInput");
    var body = document.getElementById("chatBody");
    if (!launch || !box) return;

    function toggle(open) {
      box.classList.toggle("open", open);
      launch.style.display = open ? "none" : "";
      if (open && input) setTimeout(function () { input.focus(); }, 150);
    }
    launch.addEventListener("click", function () { toggle(true); });
    if (close) close.addEventListener("click", function () { toggle(false); });

    function add(text, who) {
      var b = document.createElement("div");
      b.className = "bubble " + who;
      b.textContent = text;
      body.appendChild(b);
      body.scrollTop = body.scrollHeight;
    }
    function reply(msg) {
      var m = msg.toLowerCase(), r;
      if (/price|cost|plan|how much/.test(m)) r = "Our hosting starts at just ₹79/mo with up to 88% off. Want me to share the plan that fits you best?";
      else if (/domain/.test(m)) r = "You can search and register a domain on our Domains page — and get one free for a year with annual plans!";
      else if (/migrat|transfer|move/.test(m)) r = "Migration is 100% free on all plans with zero downtime. Just pick a plan and submit the migration form.";
      else if (/refund|money.?back|cancel/.test(m)) r = "Every plan is backed by a 30-day money-back guarantee, so you can try us risk-free.";
      else if (/n8n|automat/.test(m)) r = "Our n8n Cloud comes pre-installed and ready to use, from ₹299/mo. Check the n8n page for plans!";
      else if (/hi|hello|hey/.test(m)) r = "Hello! 😊 Are you looking for web hosting, a domain, or something else?";
      else r = "Thanks for your message! A support specialist will reply shortly. Meanwhile, you can reach us on WhatsApp at +91 97347 06347.";
      setTimeout(function () { add(r, "bot"); }, 700);
    }
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = (input.value || "").trim();
      if (!v) return;
      add(v, "me");
      input.value = "";
      reply(v);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inject);
  else inject();
})();
