window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");

  // At 5 seconds, fade out the loader
  setTimeout(() => {
    loader.style.opacity = "0";
  }, 5000);

  // At 6 seconds, remove loader and show main content
  setTimeout(() => {
    loader.style.display = "none";
    mainContent.style.display = "block";
  }, 6000);
});

let isPaused = false;

function switchWord(span) {
  const options = span.dataset.options.split(", ");
  const currentIndex = options.indexOf(span.textContent.trim());
  const nextIndex = (currentIndex + 1) % options.length;

  span.classList.add("fade");

  setTimeout(() => {
    span.textContent = options[nextIndex];
  }, 500);

  setTimeout(() => {
    span.classList.remove("fade");
  }, 1000);
}

function switchCombinedWords(container) {
  const options = container.dataset.combinedOptions.split(", ");
  const currentIndex = parseInt(container.dataset.currentIndex || 0);
  const nextIndex = (currentIndex + 1) % options.length;
  const parts = options[nextIndex].split("|").map((p) => p.trim());
  const spans = container.querySelectorAll(".changing");

  spans.forEach((span) => {
    const index = parseInt(span.dataset.index);
    span.classList.add("fade");

    setTimeout(() => {
      span.textContent = parts[index];
    }, 500);

    setTimeout(() => {
      span.classList.remove("fade");
    }, 1000);
  });

  container.dataset.currentIndex = nextIndex;
}

function startWordSwitching() {
  // Individual changing words
  document.querySelectorAll(".changing[data-options]").forEach((span, i) => {
    const initialDelay = 1000 + i * 800; // 1s + 0.8s * index

    setTimeout(() => {
      switchWord(span);

      setInterval(() => {
        if (!isPaused) switchWord(span);
      }, 5000 + Math.random() * 5000); // 5–10 sec range
    }, initialDelay);
  });

  // Combined groups with added delay between them
  document
    .querySelectorAll(".combined[data-combined-options]")
    .forEach((container, i) => {
      const initialDelay = 1000 + 2500 * i; // stagger more slowly with bigger delay

      setTimeout(() => {
        switchCombinedWords(container);

        // Larger gap between group transitions
        setInterval(() => {
          if (!isPaused) switchCombinedWords(container);
        }, 8000 + Math.random() * 4000); // 8–12 sec range between group switches
      }, initialDelay);
    });
}

// Pause on hover/touch
const poem = document.querySelector(".poem");
poem.addEventListener("mouseenter", () => (isPaused = true));
poem.addEventListener("mouseleave", () => (isPaused = false));
poem.addEventListener("touchstart", () => (isPaused = true));
poem.addEventListener("touchend", () => (isPaused = false));

window.addEventListener("DOMContentLoaded", startWordSwitching);

document.getElementById("year").textContent = new Date().getFullYear();
