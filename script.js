const content = {
  "rainy-day": { title: "What if it rains?", kind: "LETTER 01" },
  "our-webtoon": { title: "Our little webtoon", kind: "COMIC 01" },
  "miss-me": { title: "When you miss me", kind: "LETTER 02" },
  sketchbook: { title: "Tiny sketchbook", kind: "DRAWINGS 01" },
  "need-a-smile": { title: "When you need a smile", kind: "LETTER 03" },
  "gift-cards": { title: "Little treats", kind: "GIFTCARDS" },
};

const cards = document.querySelectorAll(".keepsake[data-page]");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("is-opening")) return;

    card.classList.add("is-opening");
    card.disabled = true;
    const page = card.dataset.page;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animationTime = reducedMotion ? 40 : 1050;

    window.setTimeout(() => {
      document.body.classList.add("is-leaving");
    }, Math.max(0, animationTime - 260));

    window.setTimeout(() => {
      window.location.href = `detail.html?page=${encodeURIComponent(page)}`;
    }, animationTime);
  });
});

const title = document.querySelector("#detail-title");
const kind = document.querySelector("#detail-kind");

if (title && kind) {
  const page = new URLSearchParams(window.location.search).get("page");
  const selected = content[page] || {
    title: "Dein Inhalt kommt hierhin",
    kind: "GEÖFFNET",
  };

  title.textContent = selected.title;
  kind.textContent = selected.kind;
  document.title = `${selected.title} · What if …`;
}
