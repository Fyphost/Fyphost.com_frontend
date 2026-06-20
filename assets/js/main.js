/* =========================================================
   Fyphost — interactive behaviours (Hostinger-style)
   countdown · pricing toggle · domain checker · FAQ · forms
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. Deal countdown ---------- */
  function initCountdown() {
    var el = document.querySelector("[data-countdown]");
    if (!el) return;
    // 3-day rolling deal window stored in localStorage so it feels persistent
    var KEY = "fyp_deal_end";
    var end = parseInt(localStorage.getItem(KEY), 10);
    var now = Date.now();
    if (!end || end < now) {
      end = now + 3 * 24 * 60 * 60 * 1000; // 3 days
      localStorage.setItem(KEY, String(end));
    }
    var segs = el.querySelectorAll("[data-seg]");
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function tick() {
      var diff = Math.max(0, end - Date.now());
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      var vals = [d, h, m, s];
      segs.forEach(function (seg, i) {
        var node = seg.childNodes[0];
        if (node) node.nodeValue = pad(vals[i]);
      });
      if (diff === 0) { localStorage.removeItem(KEY); }
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- 2. Pricing billing toggle ---------- */
  function initPricing() {
    var toggle = document.querySelector("[data-billing]");
    if (!toggle) return;
    var buttons = toggle.querySelectorAll("button");
    function apply(term) {
      document.querySelectorAll("[data-price]").forEach(function (node) {
        var price = node.getAttribute("data-price-" + term);
        if (price != null) {
          var valEl = node.querySelector(".val");
          if (valEl) valEl.textContent = price;
        }
        var old = node.getAttribute("data-old-" + term);
        var oldEl = node.parentElement.querySelector("[data-old]");
        if (oldEl && old) oldEl.innerHTML = 'Was <s>₹' + old + "</s>/mo";
      });
      document.querySelectorAll("[data-renew]").forEach(function (n) {
        var r = n.getAttribute("data-renew-" + term);
        if (r) n.textContent = "Renews at ₹" + r + "/mo";
      });
    }
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        buttons.forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        apply(b.getAttribute("data-term"));
      });
    });
    var active = toggle.querySelector("button.active") || buttons[0];
    if (active) apply(active.getAttribute("data-term"));
  }

  /* ---------- 3. Domain availability checker (mock) ---------- */
  function initDomainSearch() {
    var form = document.querySelector("[data-domain-form]");
    if (!form) return;
    var input = form.querySelector("input");
    var result = document.querySelector("[data-domain-result]");
    var tlds = [
      { ext: ".com", price: "₹699/yr" },
      { ext: ".net", price: "₹899/yr" },
      { ext: ".org", price: "₹749/yr" },
      { ext: ".io", price: "₹3,499/yr" },
      { ext: ".in", price: "₹499/yr" },
      { ext: ".store", price: "₹299/yr" },
      { ext: ".online", price: "₹199/yr" }
    ];

    function pseudoTaken(name, ext) {
      // deterministic mock: hash of name+ext decides availability
      var s = (name + ext).toLowerCase();
      var hash = 0;
      for (var i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
      return hash % 3 === 0; // ~1/3 taken
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var raw = (input.value || "").trim().toLowerCase();
      raw = raw.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
      var name = raw.replace(/\.[a-z.]+$/, "").replace(/[^a-z0-9-]/g, "");
      if (!name) {
        result.innerHTML = '<div class="domain-card"><span class="muted">Please enter a domain name to search.</span></div>';
        return;
      }
      result.innerHTML = '<div class="domain-card"><span class="muted">Searching for <b>' + name + "</b>…</span></div>";
      setTimeout(function () {
        var html = "";
        // primary .com result first
        var order = tlds.slice();
        order.forEach(function (t) {
          var taken = pseudoTaken(name, t.ext);
          html +=
            '<div class="domain-card">' +
              '<span class="name">' + name + t.ext + "</span>" +
              '<span style="display:flex;align-items:center;gap:16px;">' +
                (taken
                  ? '<span class="status no">Taken</span>'
                  : '<span class="status ok">Available</span><span class="price">' + t.price + "</span>" +
                    '<a class="btn btn-primary" style="padding:9px 18px" href="' + LOGIN_REG() + '">Add</a>') +
              "</span>" +
            "</div>";
        });
        result.innerHTML = html;
      }, 550);
    });
  }
  function LOGIN_REG() { return "https://web.fyphost.com/cart.php?a=add&domain=register"; }

  /* ---------- 4. FAQ accordion ---------- */
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var open = item.classList.contains("open");
        // close siblings within same .faq
        var parent = item.closest(".faq");
        if (parent) {
          parent.querySelectorAll(".faq-item.open").forEach(function (other) {
            if (other !== item) {
              other.classList.remove("open");
              other.querySelector(".faq-a").style.maxHeight = null;
            }
          });
        }
        item.classList.toggle("open", !open);
        a.style.maxHeight = open ? null : a.scrollHeight + "px";
      });
    });
  }

  /* ---------- 5. Form validation (contact / help) ---------- */
  function initForms() {
    document.querySelectorAll("[data-validate]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true;
        form.querySelectorAll("[required]").forEach(function (field) {
          var wrap = field.closest(".field");
          var valid = field.value.trim() !== "";
          if (field.type === "email") {
            valid = valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
          }
          if (wrap) wrap.classList.toggle("invalid", !valid);
          if (!valid) ok = false;
        });
        if (ok) {
          var success = form.querySelector(".form-success");
          if (success) success.classList.add("show");
          form.reset();
          setTimeout(function () { if (success) success.classList.remove("show"); }, 6000);
        }
      });
      form.querySelectorAll("input, textarea, select").forEach(function (field) {
        field.addEventListener("input", function () {
          var wrap = field.closest(".field");
          if (wrap) wrap.classList.remove("invalid");
        });
      });
    });
  }

  /* ---------- 6. Reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  function init() {
    initCountdown();
    initPricing();
    initDomainSearch();
    initFaq();
    initForms();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


/* =========================================================
   v2 interactive modules — counters, tabs, testimonials, KB
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Animated stat counters ---------- */
  function initCounters() {
    var nodes = document.querySelectorAll("[data-count]");
    if (!nodes.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var dec = (el.getAttribute("data-decimals") || "0") | 0;
      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = 1600, start = performance.now();
      function frame(now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = (target * eased).toFixed(dec);
        el.textContent = prefix + Number(val).toLocaleString("en-IN") + suffix;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = prefix + target.toLocaleString("en-IN", { minimumFractionDigits: dec }) + suffix;
      }
      requestAnimationFrame(frame);
    }
    if (!("IntersectionObserver" in window)) { nodes.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (group) {
      var btns = group.querySelectorAll(".tabs button");
      var panels = group.querySelectorAll(".tab-panel");
      btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var name = btn.getAttribute("data-tab");
          btns.forEach(function (b) { b.classList.toggle("active", b === btn); });
          panels.forEach(function (p) { p.classList.toggle("active", p.getAttribute("data-panel") === name); });
        });
      });
    });
  }

  /* ---------- Testimonials slider ---------- */
  function initTestimonials() {
    document.querySelectorAll("[data-testi]").forEach(function (root) {
      var rail = root.querySelector(".testi-rail");
      var slides = root.querySelectorAll(".testi-slide");
      var prev = root.querySelector("[data-testi-prev]");
      var next = root.querySelector("[data-testi-next]");
      var dotsWrap = root.querySelector(".testi-dots");
      if (!rail || !slides.length) return;
      var i = 0, timer;
      if (dotsWrap) {
        slides.forEach(function (_, idx) {
          var d = document.createElement("i");
          if (idx === 0) d.className = "active";
          d.addEventListener("click", function () { go(idx); });
          dotsWrap.appendChild(d);
        });
      }
      function go(n) {
        i = (n + slides.length) % slides.length;
        rail.style.transform = "translateX(-" + i * 100 + "%)";
        if (dotsWrap) dotsWrap.querySelectorAll("i").forEach(function (d, idx) { d.classList.toggle("active", idx === i); });
      }
      if (prev) prev.addEventListener("click", function () { go(i - 1); reset(); });
      if (next) next.addEventListener("click", function () { go(i + 1); reset(); });
      function auto() { timer = setInterval(function () { go(i + 1); }, 5500); }
      function reset() { clearInterval(timer); auto(); }
      auto();
      root.addEventListener("mouseenter", function () { clearInterval(timer); });
      root.addEventListener("mouseleave", auto);
    });
  }

  /* ---------- Knowledge base search filter ---------- */
  function initKbSearch() {
    var input = document.querySelector("[data-kb-search]");
    if (!input) return;
    var links = Array.prototype.slice.call(document.querySelectorAll("[data-kb-item]"));
    var cats = Array.prototype.slice.call(document.querySelectorAll(".kb-cat"));
    var noResult = document.querySelector("[data-kb-noresult]");
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      var any = false;
      links.forEach(function (li) {
        var match = li.textContent.toLowerCase().indexOf(q) !== -1;
        li.style.display = match ? "" : "none";
        if (match) any = true;
      });
      cats.forEach(function (cat) {
        var visible = cat.querySelectorAll("[data-kb-item]:not([style*='none'])").length;
        cat.style.display = (q === "" || visible) ? "" : "none";
      });
      if (noResult) noResult.style.display = (q !== "" && !any) ? "block" : "none";
    });
  }

  function init() { initCounters(); initTabs(); initTestimonials(); initKbSearch(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
