(function () {
  "use strict";

  var lb = document.getElementById("lightbox");
  if (!lb) return;

  var lbImg = lb.querySelector("img");
  var groups = {};
  var current = { group: null, index: 0 };

  document.querySelectorAll(".gallery a").forEach(function (link) {
    var group = link.closest("[data-gallery]");
    var key = group ? group.getAttribute("data-gallery") : "default";
    if (!groups[key]) groups[key] = [];
    var idx = groups[key].length;
    groups[key].push({ full: link.getAttribute("href"), alt: link.querySelector("img").alt });

    link.addEventListener("click", function (e) {
      e.preventDefault();
      current = { group: key, index: idx };
      show();
    });
  });

  function show() {
    var item = groups[current.group][current.index];
    lbImg.src = item.full;
    lbImg.alt = item.alt || "";
    lb.classList.add("open");
  }

  function close() {
    lb.classList.remove("open");
    lbImg.src = "";
  }

  function step(dir) {
    var list = groups[current.group];
    current.index = (current.index + dir + list.length) % list.length;
    show();
  }

  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });

  lb.addEventListener("click", function (e) {
    if (e.target === lb) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
